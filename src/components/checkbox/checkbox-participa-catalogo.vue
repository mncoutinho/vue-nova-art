<template>
  <div>
    <q-checkbox v-model="participaCatalogo"
                label="Participa do Catálogo do Crea-RJ. "
                @input="atualiza" />
    <span>&nbsp;<a href="https://portaldenegocios.com/crea/rj/sobre-o-site/o-catalogo-empresarial/" target="_blank">Clique aqui para obter informações.</a></span>
  </div>
</template>
<script>
export default {
  created () {
    this.getParticipaCatalogo()
  },
  data () {
    return {
      participaCatalogo: false
    }
  },
  methods: {
    getParticipaCatalogo () {
      this.$axios
        .get('cadastro/profissional/participa-catalogo/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          this.participaCatalogo = response.data.data
        })
    },
    atualiza (value) {
      this.$axios
        .post('cadastro/profissional/participa-catalogo', { checked: value, id: this.$store.getters['user/getUserRegistro'] })
        .then(response => {})
    }
  }
}
</script>
