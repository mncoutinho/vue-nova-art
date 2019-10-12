<template>
  <div>
    <div v-if="listOptions.length !== 0" class="row">
      <div class="col-11">
        <q-select
          float-label="Tipo de Ação Institucional"
          v-model="id"
          color="secondary"
          :options="listOptions"
          @input="atualiza"/>
      </div>
      <div style="margin-top: 25px" class="col-1">
        <info-help v-model="showing" tipo="tipoAcaoInstitucional" />
      </div>
    </div>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    let tipo = this.$store.getters['art/getTipoAcaoInstitucional']
    if (tipo !== null && tipo !== undefined) {
      this.id = tipo.id
    }
  },
  mounted () {
    this.getTiposDeAcoesInstitucionais()
  },
  data () {
    return {
      listOptions: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getTiposDeAcoesInstitucionais () {
      let listTemp = []
      this.$axios
        .get('art/tipos-acoes-institucionais')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/tipo-acao-institucional', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setTipoAcaoInstitucional', { id: value })
        })
    }
  },
  computed: {
    temAcaoInstitucionalAtiva: {
      get () {
        return this.listOptions !== null && this.listOptions.length > 0
      }
    }
  }
}
</script>
