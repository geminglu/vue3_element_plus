// const Mock = require('mockjs');

module.exports = [
  // 路由拦截，返回指定格式数据
  // 以下格式为兼容after中间件拦截、返回要求
  {
    url: '/get_activity/',
    type: 'get',
    response: () => {
      return {
        code: 200,
        datas: [
          {
            name: 'activity(google)',
            cover: 'http://18.162.55.15/data/activity_cover/images.jpg',
            link: 'https://www.google.com/',
          },
          {
            name: 'activity(baidu)',
            cover: 'http://18.162.55.15/data/activity_cover/images_1.jpg',
            link: 'https://www.baidu.com/',
          },
          {
            name: 'activity(github)',
            cover: 'http://18.162.55.15/data/activity_cover/images_2.jpg',
            link: 'https://github.com/',
          },
        ],
      };
    },
  },
  {
    url: '/get_latest5_artwork/',
    type: 'get',
    response: () => {
      return {
        code: 200,
        datas: [
          {
            name: 'user1',
            artwork: 'http://127.0.0.1:8000/data/artwork_min/03_tOCgFd5.jpg',
            user_head_image:
              'http://127.0.0.1:8000/data/head_image_min/\u5fae\u4fe1\u56fe\u7247_20221017125102_LjxtauK.jpg',
            artwork_uuid: 'd12ff0c2-dd27-11ed-9ec5-f0d5bfd3218c',
          },
          {
            name: 'user1',
            artwork: 'http://127.0.0.1:8000/data/artwork_min/03_0pfg6Oq.jpg',
            user_head_image:
              'http://127.0.0.1:8000/data/head_image_min/\u5fae\u4fe1\u56fe\u7247_20221017125102_LjxtauK.jpg',
            artwork_uuid: 'c5127717-dd21-11ed-a8d6-f0d5bfd3218c',
          },
          {
            name: 'user1',
            artwork: 'http://127.0.0.1:8000/data/artwork_min/06_rCPyK2x.jpg',
            user_head_image:
              'http://127.0.0.1:8000/data/head_image_min/\u5fae\u4fe1\u56fe\u7247_20221017125102_LjxtauK.jpg',
            artwork_uuid: '4a9a3127-dce2-11ed-ba3e-f0d5bfd3218c',
          },
          {
            name: 'user1',
            artwork: 'http://127.0.0.1:8000/data/artwork_min/addimg_-_\u526f\u672c_JjL1ma7.jpg',
            user_head_image:
              'http://127.0.0.1:8000/data/head_image_min/\u5fae\u4fe1\u56fe\u7247_20221017125102_LjxtauK.jpg',
            artwork_uuid: '72f039c9-da92-11ed-a8e8-f0d5bfd3218c',
          },
          {
            name: 'user2',
            artwork: 'http://127.0.0.1:8000/data/artwork_min/addimg_-_\u526f\u672c_9tBJl4I.jpg',
            user_head_image: 'http://127.0.0.1:8000/data/head_image_min/03.jpg',
            artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c',
          },
        ],
      };
    },
  },
  {
    url: '/get_latest5_user/',
    type: 'get',
    response: () => {
      return {
        code: 200,
        datas: [
          {
            name: 'user2',
            user_head_image: 'http://18.162.55.15/data/head_image/\u5fae\u4fe1\u56fe\u7247_20221017125102.png',
            user_uuid: 'sdasd-erdfd-erqwr-sdfs',
          },
          {
            name: 'user1',
            user_head_image: 'http://18.162.55.15/data/head_image/5f44f0a9acda2c000402a6c1.png',
            user_uuid: '1322-44324-235235-2535',
          },
          { name: 'dbis', user_head_image: 'http://18.162.55.15/data/', user_uuid: null },
        ],
      };
    },
  },
  {
    url: '/get_latest5_user/',
    type: 'get',
    response: {
      code: 200,
      datas: [
        {
          name: 'user2',
          user_head_image: 'http://18.162.55.15/data/head_image/\u5fae\u4fe1\u56fe\u7247_20221017125102.png',
          user_uuid: 'sdasd-erdfd-erqwr-sdfs',
        },
        {
          name: 'user1',
          user_head_image: 'http://18.162.55.15/data/head_image/5f44f0a9acda2c000402a6c1.png',
          user_uuid: '1322-44324-235235-2535',
        },
        { name: 'dbis', user_head_image: 'http://18.162.55.15/data/', user_uuid: null },
      ],
    },
  },
  {
    url: '/get_user_info/',
    type: 'post',
    response: {
      code: 200,
      datas: {
        username: 'user2',
        email: 'wutianlin1224@163.com',
        user_head_image: 'http://127.0.0.1:8000/data/head_image_min/03.jpg',
        background_image: 'http://127.0.0.1:8000/data/background_image_min/03.jpg',
        about_me: 'xx',
        school: 'xx',
        website: 'xx',
        location: 'xx',
        collection_list: [],
        following: 0,
        follower: 0,
        is_follow: false,
        artwork_list: [
          { artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c', description: 'aa', collection: 'aaa' },
          { artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c', description: 'aa', collection: 'aaa' },
          { artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c', description: 'aa', collection: 'bbb' },
          { artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c', description: 'aa', collection: 'aaa' },
          { artwork_uuid: '8ed22846-da7d-11ed-b230-f0d5bfd3218c', description: 'aa', collection: 'bbb' },
        ],
      },
    },
  },
  {
    url: '/get_artwork_info/',
    type: 'post',
    response: {
      code: 200,
      datas: {
        artworkname: 'dddd',
        username: 'user2',
        user_uuid: '9bd01b19-c88d-11ed-8535-f0d5bfd3218c',
        user_head_image: 'http://127.0.0.1:8000/data/head_image_min/03.jpg',
        latitude: 'None',
        longitude: 'None',
        altitude: 'None',
        position_y: null,
        rotation_x: null,
        rotation_y: null,
        rotation_z: null,
        scale_x: null,
        scale_y: null,
        scale_z: null,
        is_3d: false,
        artwork: 'http://127.0.0.1:8000/data/artwork_min/addimg_-_\u526f\u672c_9tBJl4I.jpg',
        views: '1',
        like_count: 0,
        collect_count: 0,
        description: 'aa',
        collection: 'aaaa',
        creative_fields: 'aaa',
        collection_list: [
          {
            artwork: 'http://127.0.0.1:8000/data/artwork_min/5f44f0a9acda2c000402a6c1.jpg',
            artwork_uuid: 'a59caaa1-c3a0-11ed-8ed7-f0d5bfd3218c',
          },
          {
            artwork: 'http://127.0.0.1:8000/data/artwork_min/addimg_-_\u526f\u672c_JjL1ma7.jpg',
            artwork_uuid: '72f039c9-da92-11ed-a8e8-f0d5bfd3218c',
          },
        ],
      },
    },
  },
];
