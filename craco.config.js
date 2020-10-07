const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ffcc00",
              "@heading-color": "#ffcc00",
              "@text-color": "#ffcc00",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
