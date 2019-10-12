import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import routes from './routes'

Vue.use(VueRouter)

const restApi =
axios.create({baseURL: process.env.API + '/rest-api/crea'})

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
Router.afterEach((to, from) => {
  if (Router.history.current.fullPath === '/ouvidoria-publica') {
    Router.push('/ouvidoria-publica')
  } else {
    restApi
      .get('corporativo/usuario-sessao', {
        headers: {
          'Authorization': localStorage.getItem('TOKEN')
        }
      })
      .catch(() => {
        Router.push('/login')
      })
  }
})
export default Router
