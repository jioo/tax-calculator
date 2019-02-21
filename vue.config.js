const path = require('path')
const webpack = require('webpack')
const currentVersion = require('./package.json').version
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  // https://cli.vuejs.org/guide/deployment.html#github-pages
  publicPath: process.env.NODE_ENV === 'production'
    ? '/salary-calculator/'
    : '/',

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Get the current version in package.json file
        'process.env': {
          VERSION: `"${currentVersion}"`
        }
      }),
    ]
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production
      config
      .plugin('pre-render-spa')
      .use(PrerenderSPAPlugin, [{
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/' ]
      }])
    }
  },

  pwa: {
    // fixes theme-color in @vue/cli pwa
    themeColor: '#FF9800',

    // Set current version
    assetsVersion: currentVersion,

    // configure workbox plugin
    workboxOptions: {
      skipWaiting: true,

      // To match cross-origin requests, use a RegExp that matches
      // the start of the origin:
      runtimeCaching: [{
        urlPattern: new RegExp('^https://jioo\.github\.io/salary-calculator/'),
        handler: 'staleWhileRevalidate',
        options: {
          // Use a custom cache name for this route.
          cacheName: 'salary-calculator',
          // Configure custom cache expiration.
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: /* 30 Days */ 30 * 24 * 60 * 60,
          },
        },
      }]
    },

  },
}