const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        // ... rest of your injected vars here
        // get rid of vue-i18n warning
        __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
        __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      })

      return definitions
    });
  },
})
