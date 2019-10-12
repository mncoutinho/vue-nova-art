<template>
  <div>
    <q-input v-model.trim="descricao" @input="edita" float-label="Informe o Cargo/Função:" maxlength = "500" />
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  created () {
    this.descricao = this.$store.getters['art/getDescricaoCargoFuncao']
  },
  data () {
    return {
      showing: false,
      descricao: null
    }
  },
  methods: {
    edita: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/descricao-cargo-funcao', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setDescricaoCargoFuncao', response.data.data)
          this.$emit('input', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar a descrição do cargo e função, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
