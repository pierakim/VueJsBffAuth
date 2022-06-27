const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../wwwroot",

  configureWebpack: {
    output: {
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]",
    },
  },
});
