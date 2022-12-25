const getters = {
  sidebar: (state: { app: { sidebar: any } }) => state.app.sidebar,
  keepAliveIncludes: (state: { app: { keepAliveIncludes: any } }) =>
    state.app.keepAliveIncludes,
  routers: (state: { permission: { routers: any; }; }) => state.permission.routers,
  addRoutes: (state: { permission: { addRoutes: any; }; }) => state.permission.addRoutes
};

export default getters;
