<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-input type="date"
              v-model="dataFim"
              stack-label="Previsão de Término"
              color="secondary"
              @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" :tipo="this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] ? 'dataFimCargoOuFuncao' : 'dataFim'" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import { notify } from '../../mixins/mixin-notify'
import _ from 'lodash'
import InfoHelp from '../info/info-help'
export default {
  mixins: [notify],
  components: {InfoHelp},
  created () {
    this.dataFim = this.$store.getters['art/getDataFimFormatadaYYYYMMDD']
  },
  data () {
    return {
      dataFim: null,
      showing: false
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/data-fim', { descricao: value === '' ? null : value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setDataFim', value)
          this.$store.commit('art/setDataFimFormatada', value)
          this.$store.commit('art/setDataFimFormatadaYYYYMMDD', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar a Data Início, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
