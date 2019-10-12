import Vue from 'vue'
import Vuex from 'vuex'

import art from './art'
import endereco from './endereco'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    art,
    endereco,
    user
  }
})

export default store
