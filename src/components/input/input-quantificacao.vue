<template>
  <div>
    <span style="color: #979797; font-size: 0.75rem">Quantidade
      <info-help v-model="showing" tipo="quantificacao" />
    </span>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9" helper=" ">
      <money v-model.lazy="quantificacao"
             v-bind="money"
             @input="atualiza"
             class="col q-input-target text-left"
             align="left"/>
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import {Money} from 'v-money'
import InfoHelp from '../info/info-help'
export default {
  components: {Money, InfoHelp},
  created () {
    this.quantificacao = 0
    let quantificacaoStore = this.$store.getters['art/getQuantificacao']
    if (quantificacaoStore !== null && quantificacaoStore !== undefined) {
      if (quantificacaoStore.valor !== null) {
        this.quantificacao = quantificacaoStore.valor
      }
    }
  },
  data () {
    return {
      quantificacao: 0,
      showing: false,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/quantificacao', { valor: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setQuantificacao', value)
        })
    }, 1000)
  },
  watch: {
    quantificacao (value) {
      let valor = value.toString()
      if (valor.indexOf('-') >= 0) {
        this.quantificacao = valor.replace('-', '')
      }
    }
  }
}
</script>
