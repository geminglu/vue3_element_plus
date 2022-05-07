const getters = {
  sidebar: (state: { app: { sidebar: any } }) => state.app.sidebar.opened,
  keepAliveIncludes: (state: { app: { keepAliveIncludes: any } }) =>
    state.app.keepAliveIncludes,
};
export default getters;
