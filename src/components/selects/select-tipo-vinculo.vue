<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-select float-label="Tipo Vínculo"
              v-model="id"
              :options="listOptions"
              @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="tipoVinculo" />
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
    let tipo = this.$store.getters['art/getTipoVinculo']
    if (tipo !== null && tipo !== undefined) {
      this.id = tipo.id
    }
  },
  mounted () {
    this.getTiposVinculos()
  },
  data () {
    return {
      listOptions: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getTiposVinculos () {
      let listTemp = []
      this.$axios
        .get('art/tipos-vinculos')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/tipo-vinculo', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setTipoVinculo', { id: value })
        })
    }
  }
}
</script>
