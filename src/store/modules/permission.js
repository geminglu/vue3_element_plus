import { routes } from '@/router';

const state = {
  routers: [],
};

const mutations = {
  SET_ROUTES: (state) => {
    state.routers = routes;
  },
};

const actions = {
  generateRoutes({ commit }) {
    commit('SET_ROUTES');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
