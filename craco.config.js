const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#C67D30",
              "@heading-color": "#C67D30",
              "@text-color": "#C67D30",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
