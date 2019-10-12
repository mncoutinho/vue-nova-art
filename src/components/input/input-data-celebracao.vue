<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-input type="date"
              v-model="dataCelebracao"
              stack-label="Data Celebração Contrato"
              color="secondary"
              @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="dataCelebracao" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import InfoHelp from '../info/info-help'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  components: {InfoHelp},
  created () {
    this.dataCelebracao = this.$store.getters['art/getDataCelebracaoFormatada']
  },
  data () {
    return {
      dataCelebracao: '',
      showing: false
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/data-celebracao', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setDataCelebracao', value)
          this.$store.commit('art/setDataCelebracaoFormatada', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar a Data Celebração Contrato, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
