<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
        <div class="col-11">
          <q-input type="date"
              v-model="dataInicio"
              stack-label="Data Início"
              color="secondary"
              @input="atualiza"/>
        </div>
        <div style="margin-top: 25px" class="col-1">
         <info-help v-model="showing" :tipo="this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] ? 'dataInicioCargoOuFuncao' : 'dataInicio'" />
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
    this.dataInicio = this.$store.getters['art/getDataInicioFormatadaYYYYMMDD']
  },
  data () {
    return {
      dataInicio: null,
      showing: false
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/data-inicio', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setDataInicio', value)
          this.$store.commit('art/setDataInicioFormatada', value)
          this.$store.commit('art/setDataInicioFormatadaYYYYMMDD', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar a Data Início, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
