<template>
  <div>
    <span style="color: #979797; font-size: 0.75rem">Valor do Contrato</span>
    <info-help v-model="showing" tipo="valorContrato" />
    <q-field icon="fas fa-asterisk"
             icon-color="red-9" >
          <money
             v-model.lazy="valorContrato"
             v-bind="money"
             maxlength="25"
             class="col q-input-target q-no-input-spinner ellipsis"
             align="left"
             @input="atualiza"
             >
             <q-btn icon="fas fa-question-circle" style="margin-left=5px;" color="grey" outline flat size="11px" rounded @click="showInfo()"/>
             </money>

    </q-field>

  </div>
</template>
<script>
import _ from 'lodash'
import {Money} from 'v-money'
import { notify } from '../../mixins/mixin-notify'
import InfoHelp from '../info/info-help'
export default {
  mixins: [notify],
  components: {Money, InfoHelp},
  created () {
    if (this.$store.getters['art/getValorContrato']) {
      this.valorContrato = this.$store.getters['art/getValorContrato']
    } else {
      this.valorContrato = 0
    }
  },
  data () {
    return {
      valorContrato: '',
      showing: false,
      money: {
        min: 1,
        decimal: ',',
        thousands: '.',
        precision: 2,
        prefix: 'R$',
        masked: false /* doesn't work with directive */
      }
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/valor-contrato', { valor: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setValorContrato', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar o valor do contrato, favor tentar novamente', 'negative', 1500)
        })
    }, 1000),
    showInfo () {
      this.showing = !this.showing
    }
  },
  watch: {
    valorContrato (value) {
      let valor = value.toString()
      if (valor.indexOf('-') >= 0) {
        this.valorContrato = valor.replace('-', '')
      }
    }
  }

}
</script>
