// const Mock = require('mockjs');

module.exports = [
  // 路由拦截，返回指定格式数据
  // 以下格式为兼容after中间件拦截、返回要求
  {
    url: '/api/v1/system/menu',
    type: 'get',
    response: () => {
      return {
        status: 200,
        data: '请求成功~',
      };
    },
  },
];
