const request: __WebpackModuleApi.RequireContext = require.context(
  '/src/assets/svg',
  false,
  /\.svg$/
);

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
requireAll(request);
