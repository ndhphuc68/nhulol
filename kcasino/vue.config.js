const { defineConfig } = require("@vue/cli-service");
const path = require("path");

// let targetUrl = "https://cms.sunshine789.com";
// let targetUrl2 = "https://ops.sunshine789.com";
// let targetUrl = 'https://cms.cj8889.com';
// let targetUrl2 = 'https://ops.cj8889.com';
// let targetUrl2 = 'http://192.168.1.25';
// let targetUrl = "https://cms.ut788.com";
// let targetUrl2 = "https://ops.ut788.com";
/*let targetUrl = "https://cms.h-holdem88.com";
let targetUrl2 = "https://ops.h-holdem88.com";*/
// let targetUrl = "https://cms.duri777.com";
// let targetUrl2 = "https://ops.duri777.com";
// let targetUrl = "https://cms.gbell88.com";
// let targetUrl2 = "https://ops.gbell88.com";
let targetUrl = "https://cms.aat788.com";
let targetUrl2 = "https://ops.aat788.com";
// let targetUrl = "https://cms.bababa778.com";
// let targetUrl2 = "https://ops.bababa778.com";
const proxyEndPoints = [
  "api",
  "authentication",
  "goods",
  "question",
  "coupon",
  "notify_message",
  "member",
  "deposit",
  "withdraw",
  "game_history",
  "messenger",
  "sld",
  "sci",
  "kgn",
  "memo",
  "game",
  "real_message",
  "xxxx_config",
  "play_star_games",
  "ajax",
  "gge",
  "member_new",
];

const getProxySettings = () => {
  let obj = {};
  for (let i = 0; i < proxyEndPoints.length; i++) {
    let v = proxyEndPoints[i];
    obj[`^/${v}`] = {
      target: !["sld", "sci", "kgn", "gge"].includes(v)
        ? targetUrl
        : targetUrl2,
    };
  }
  // obj[`^/cdnImage`] = {
  //   target: 'http://app-b.insvr.com',
  //   changeOrigin: true,
  //   pathRewrite: {'^/cdnImage' : ''}
  // }
  return obj;
};

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: path.resolve(__dirname, `./dist`),
  publicPath: "/",
  assetsDir: "",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  devServer: {
    https: true,
    hot: true,
    proxy: getProxySettings(),
  },
});
