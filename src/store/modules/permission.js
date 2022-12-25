import { constantRoutes, asyncRoutes } from '@/router';
import { getMenu } from '@/serivce/user';

const state = {
  routers: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routers = constantRoutes.concat(routes);
  },
};

const actions = {
  async generateRoutes({ commit }) {
    const results = await getMenu();

    const r = filterAsyncRoutes(asyncRoutes, results.data.list);
    commit('SET_ROUTES', r);
    return r;
  },
};

function filterAsyncRoutes(router, roles) {
  let res = [];
  res = router.filter((item) => {
    if (hasPermission(item, roles)) {
      if (item.children && item.children.length) {
        item.children = filterAsyncRoutes(item.children, roles);
      }
      res.push({ ...item });
      return true;
    } else {
      return false;
    }
  });
  return res;
}

function hasPermission(route, roles) {
  if (!route.name) return false;
  return roles.some((item) => item.name === route.name);
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
