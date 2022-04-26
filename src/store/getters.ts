const getters = {
  sidebar: (state: { app: { sidebar: any } }) => state.app.sidebar.opened,
  keepAliveIncludes: (state: { app: { keepAliveIncludes: string[] } }) =>
    state.app.keepAliveIncludes,
};
export default getters;
