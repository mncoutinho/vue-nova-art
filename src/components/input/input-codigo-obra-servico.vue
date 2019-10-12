<template>
  <div>
     <q-field  icon="fas fa-asterisk" icon-color="white">
       <div class="row">
          <div class="col-11">
            <q-input v-model="codigo"
                float-label="Código da Obra/Serviço:"
                @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="codigoObraServico" />
          </div>
        </div>
     </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    this.codigo = this.$store.getters['art/getCodigoObraServico']
  },
  data () {
    return {
      showing: false,
      codigo: null
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/codigo-obra-servico', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setCodigoObraServico', value)
        })
    }, 1000)
  }
}
</script>
