import request from '@/utils/request';

export function test(params) {
  return request('/table/list?a=1&b=2', {
    metgod: 'get',
    params,
  });
}
