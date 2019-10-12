<template>
  <div>
    <q-field icon="fas fa-asterisk" icon-color="white">
      <div class="row">
          <div class="col-11">
            <q-input v-model="numeroContrato"
               color="secondary"
               float-label="Número Contrato:"
               maxlength="50"
               @input="atualiza"
               />
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="numeroContrato" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import { notify } from '../../mixins/mixin-notify'
import InfoHelp from '../info/info-help'
export default {
  mixins: [notify],
  components: {
    InfoHelp
  },
  created () {
    this.numeroContrato = this.$store.getters['art/getNumeroContrato']
  },
  data () {
    return {
      numeroContrato: null,
      showing: false
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/numero-contrato', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setNumeroContrato', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar o número do contrato, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
