const state = {
  /** 导航栏状态 */
  sidebar: {
    /** 是否水平折叠收起菜单 */
    opened: JSON.parse(localStorage.getItem('sidebarStatus') || false),
  },
  /** 路由缓存报名单 */
  keepAliveIncludes: [],
};
const mutations = {
  /**
   * 设置是否水平折叠收起菜单
   * @param {*} state
   * @param {*} sidebarStatus
   */
  TOGGLE_SIDEBAR: (state, sidebarStatus) => {
    if (sidebarStatus !== undefined) {
      state.sidebar.opened = !!sidebarStatus;
    } else {
      state.sidebar.opened = !state.sidebar.opened;
    }
    localStorage.setItem('sidebarStatus', state.sidebar.opened);
  },

  /**
   * 设置路由缓存
   * @param {*} state
   * @param {*} data
   */
  SET_KEEPALIVE: (state, data) => {
    const has = state.keepAliveIncludes.includes(data);
    if (!has) {
      state.keepAliveIncludes.push(data);
    }
  },

  /**
   * 删除路由缓存
   * @param {*} state
   * @param {*} data
   */
  DELETE_KEEPALIVE: (state, data) => {
    state.keepAliveIncludes = state.keepAliveIncludes.filter(
      (item) => item !== data
    );
  },
};

const actions = {
  /**
   * 设置路由缓存
   * @param {*} param0
   * @param {*} data
   * @returns
   */
  async addKeepAlive({ commit, state }, data) {
    commit('SET_KEEPALIVE', data);
    return state.keepAliveIncludes;
  },

  /**
   * 删除路由缓存
   * @param {*} param0
   * @param {*} data
   * @returns
   */
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
