<template>
  <div>
    <q-input type="number"
             v-model="prazoMes"
             float-label="Prazo em Meses"
             color="secondary"
             max="99999"
             min="0"
              />
  </div>
</template>
<script>
import { notify } from '../../mixins/mixin-notify'
import _ from 'lodash'
export default {
  mixins: [notify],
  mounted () {
    this.prazoMes = this.$store.getters['art/getPrazoMes']
  },
  data () {
    return {
      prazoMes: null,
      showing: false
    }
  },
  methods: {
    atualizaPrazoMes (value) {
      this.$axios
        .put('art/contratos/prazo-mes', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setPrazoMes', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar Prazo em meses, favor tentar novamente', 'negative', 1500)
        })
    }
  },
  watch: {
    prazoMes: _.debounce(function (value, oldValue) {
      this.atualizaPrazoMes(value)
    }, 1000)
  }
}
</script>
