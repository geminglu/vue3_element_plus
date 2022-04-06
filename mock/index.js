const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间

const routers = [
  {
    url: '/table/list1',
    method: 'get',
    response: () => {
      return {
        status: 200,
        data: '请求成功~',
      };
    },
  },
  {
    url: '/table/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        status: 200,
        data: '请求接口/url/path',
      });
    },
  },
];

module.exports = {
  routers,
};
