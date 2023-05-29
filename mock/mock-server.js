const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const Mock = require('mockjs');

const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  let mockLastIndex;
  const routers = require('./index.js');
  const mocksForServer = routers.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

/**
 * for mock server
 * @method responseFake
 * @param {string} url
 * @param {string} type
 * @param {Function} respond
 * @returns
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
    },
  };
};

module.exports = ({ app }) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  const mockRoutes = registerRoutes(app);
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          // eslint-disable-next-line no-console
          console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(chalk.redBright(error));
        }
      }
    });
};
