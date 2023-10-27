const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.resolve.alias.set("vue", "@vue/compat");
  //   config.module
  //       .rule("vue")
  //       .use("vue-loader")
  //       .tap((options) => {
  //         return {
  //           ...options,
  //           compilerOptions: {
  //             compatConfig: {
  //               MODE: 3,
  //             },
  //           },
  //         };
  //       });
  // },
})
// module.exports = {
//   module: {
//     rules: [
//       // ... other rules omitted
//
//       // this will apply to both plain `.scss` files
//       // AND `<style lang="scss">` blocks in `.vue` files
//       {
//         test: /\.scss$/,
//         use: [
//           'vue-style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       }
//     ]
//   },
//   // plugin omitted
// }