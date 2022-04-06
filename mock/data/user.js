import Mock from 'mockjs';

const data = Mock.mock({
  // 模拟数据生成，遵循Mock语法规范
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)',
    },
  ],
});

export default [
  // 路由拦截，返回指定格式数据
  // 以下格式为兼容after中间件拦截、返回要求
  {
    url: '/table/list',
    type: 'get',
    response: (config) => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      };
    },
  },
];
