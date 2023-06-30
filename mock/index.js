const Mock = require('mockjs');
const userMock = require('./data/user');

// 设置拦截ajax请求的相应时间

module.exports = [
  ...userMock,
  {
    url: '/table/list',
    type: 'get',
    response: () => {
      return {
        status: 200,
        data: '请求成功~',
      };
    },
  },
];
