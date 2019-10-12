<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-select filter
                filter-placeholder="Filtro"
                float-label="Ramos"
                color="secondary"
                v-model="id"
                :options="listRamos"
                @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="ramos" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    let ramo = this.$store.getters['art/getRamo']
    if (ramo !== null && ramo !== undefined) {
      this.id = ramo.id
    }
  },
  mounted () {
    this.getRamos()
  },
  data () {
    return {
      listRamos: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getRamos () {
      let listTempRamos = []
      this.$axios
        .get('art/ramos/' + this.$store.getters['art/getIdProfissional'])
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempRamos.push({value: el.id, label: el.nome})
          })
        })
      this.listRamos = listTempRamos
    },
    atualiza (value) {
      let dto = {}
      dto.codigo = value
      dto.id = this.$store.getters['art/getIdParticipacaoTecnica']
      dto.nome = this.$store.getters['art/getNumeroArtParticipacaoTecnica']
      dto.numero = this.$store.getters['art/getNumero']
      if (this.$store.getters['art/ehDesempenhoDeCargoEFuncao']) {
        this.salvarRamo(value)
        this.$emit('ramoValido')
      } else {
        if (dto.id === null || dto.id === undefined) {
          this.id = null
          this.$q.notify({message: 'Preencha o campo Participação Técnica primeiro', type: 'negative', position: 'center'})
        } else {
          this.salvarRamo(value)
          this.$emit('ramoValido')
        }
      }
    },
    salvarRamo (value) {
      this.$axios
        .put('art/contratos/ramo', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setRamo', { id: value })
        })
    }
  }
}
</script>
