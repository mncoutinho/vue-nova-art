module.exports = function (ctx) {
  var local = process.env.local
  let urlLocal = {
    API: JSON.stringify('http://localhost:8080'),
    SPRING: JSON.stringify('http://localhost:8090'),
    URL_LEGADO: JSON.stringify('http://192.168.1.21:8080'),
    AMBIENTE: JSON.stringify('LOCAL')
  }
  let urlDev = {
    API: JSON.stringify('https://dev-servicos.crea-rj.org.br'),
    SPRING: JSON.stringify('https://dev-servicos.crea-rj.org.br'),
    URL_LEGADO: JSON.stringify('http://192.168.1.21:8080'),
    AMBIENTE: JSON.stringify('DEV')
  }
  let urlProd = {
    API: JSON.stringify('https://portalservicos.crea-rj.org.br'),
    SPRING: JSON.stringify('https://portalservicos.crea-rj.org.br'),
    URL_LEGADO: JSON.stringify('https://creaonline.crea-rj.org.br'),
    AMBIENTE: JSON.stringify('PROD')
  }
  var prod = process.env.prod
  var urlApi = {}
  if (local) {
    urlApi = urlLocal
  } else {
    urlApi = prod ? urlProd : urlDev
  }
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      env: urlApi,
      scopeHoisting: true,
      distDir: 'dist/creaonline',
      // vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // proxy: {
      //   '/rest-api/crea': {
      //     target: 'http://localhost:8080'
      //     // changeOrigin: false,
      //     // pathRewrite: {
      //     //   '^/rest-api/crea': ''
      //     // }
      //   }
      // },
      // https: true,
      port: 8081,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      iconSet: 'fontawesome',
      components: [
        'QJumbotron',
        'QField',
        'QInput',
        'QLayout',
        'QBtnDropdown',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QLayoutFooter',
        'QPage',
        'QProgress',
        'QCardSeparator',
        'QSpinnerTail',
        'QItemSeparator',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QTable',
        'QTabs',
        'QTab',
        'QTabPane',
        'QTooltip',
        'QToggle',
        'QRadio',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QSelect',
        'QSearch',
        'QInnerLoading',
        'QModal',
        'QModalLayout',
        'QAutocomplete',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QDialog',
        'QDatetime',
        'QCollapsible',
        'QCheckbox',
        'QTree',
        'QChip',
        'QPopover',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QOptionGroup',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QUploader',
        'QBtnGroup',
        'QSpinnerFacebook'
      ],
      directives: [
        'Ripple', 'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify', 'Dialog', 'Loading'
      ]
    },
    animations: 'all',
    // animations: [
    //   'bounceInLeft',
    //   'bounceOutRight'
    // ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/clean-crea-rj.jpg',
            'sizes': '50x50',
            'type': 'image/jpg'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
