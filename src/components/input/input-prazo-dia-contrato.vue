<template>
  <div>
    <span>
    </span>
    <q-input type="number"
             v-model="prazoDia"
             float-label="Prazo em dias"
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
    this.prazoDia = this.$store.getters['art/getPrazoDia']
  },
  data () {
    return {
      prazoDia: null,
      showing: false
    }
  },
  methods: {
    atualizaPrazoDia (value) {
      this.$axios
        .put('art/contratos/prazo-dia', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setPrazoDia', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar Prazo em dias, favor tentar novamente', 'negative', 1500)
        })
    }
  },
  watch: {
    prazoDia: _.debounce(function (value, oldValue) {
      this.atualizaPrazoDia(value)
    }, 1000)
  }
}
</script>
