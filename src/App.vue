<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from './plugins/axios'
import Vuelidate from 'vuelidate'
export default {
  name: 'App',
  components: {
    axios,
    Vuelidate
  },
  created () {
    let token = localStorage.getItem('TOKEN')
    if (token) {
      this.getUsuarioSessao()
    } else if (this.$route.fullPath === '/ouvidoria/publica') {
      this.$router.push(this.$route.fullPath)
    }
  },
  methods: {
    getUsuarioSessao () {
      this.$axios
        .get('corporativo/usuario-sessao')
        .then(response => {
          this.$store.commit('user/setUser', response.data.data)
        })
        .catch(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
