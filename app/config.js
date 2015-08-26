require.config({
  paths: {
    lodash: "../node_modules/lodash/index",
    template: "../node_modules/lodash-template-loader/loader",
    jquery: "../node_modules/jquery/dist/jquery",
    backbone: "../node_modules/backbone/backbone"
  },

  map: {
    "backbone": {
      underscore: "lodash"
    }
  },

  deps: ["main"]
});
