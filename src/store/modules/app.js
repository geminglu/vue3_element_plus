const state = {
  sidebar: {
    opened: JSON.parse(localStorage.getItem('sidebarStatus') || false),
  },
  keepAliveIncludes: [],
};
const mutations = {
  TOGGLE_SIDEBAR: (state, sidebarStatus) => {
    if (sidebarStatus !== undefined) {
      state.sidebar.opened = !!sidebarStatus;
    } else {
      state.sidebar.opened = !state.sidebar.opened;
    }
    localStorage.setItem('sidebarStatus', state.sidebar.opened);
  },

  // 设置缓存
  SET_KEEPALIVE: (state, data) => {
    const has = state.keepAliveIncludes.includes(data);
    if (!has) {
      state.keepAliveIncludes.push(data);
    }
  },

  // 删除缓存
  DELETE_KEEPALIVE: (state, data) => {
    state.keepAliveIncludes = state.keepAliveIncludes.filter(
      (item) => item !== data
    );
  },
};

const actions = {
  toggleSideBar({ commit }, { sidebarStatus }) {
    commit('TOGGLE_SIDEBAR', sidebarStatus);
  },

  async addKeepAlive({ commit, state }, data) {
    commit('SET_KEEPALIVE', data);
    return state.keepAliveIncludes;
  },

  async deleteKeepAlive({ commit, state }, data) {
    commit('DELETE_KEEPALIVE', data);
    return state.keepAliveIncludes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
