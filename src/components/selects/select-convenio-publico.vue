<template>
  <div>
    <q-select
      float-label="Convênio"
      v-model="id"
      color="secondary"
       hide-underline
      :options="listConvenios"
      @input="atualiza"
    />
  </div>
</template>
<script>
export default {
  created () {
    this.getConvenios()
    let convenioStore = this.$store.getters['art/getConvenioPublico']
    if (convenioStore !== null && convenioStore !== undefined) {
      this.id = convenioStore.id
    }
  },
  data () {
    return {
      listConvenios: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getConvenios () {
      let listTemp = []
      listTemp.unshift({value: 0, label: 'NÃO INFORMADO'})
      this.$axios
        .get('art/convenio-publico')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.nome})
          })
          this.listConvenios = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/convenio-publico', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setConvenioPublico', {id: value})
        })
    }
  }
}
</script>
