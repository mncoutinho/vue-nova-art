<template>
  <div>
        <q-field
            icon="fas fa-asterisk"
            icon-color="red-9"
            style="margin-top:20px;">
          <div class="row">
            <div class="col-8">
              <q-select
                float-label="ENTIDADE"
                color="secondary"
                filter
                filter-placeholder="Filtro"
                v-model="id"
                :options="listEntidadeClasse"
                @input="atualiza"
              />
            </div>
          <div style="margin-top: 25px" class="col-2">
            <info-help v-model="showing" tipo="entidadeClasse" />
          </div>
        </div>
        </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    let entidade = this.$store.getters['art/getEntidadeClasse']
    if (entidade !== null && entidade !== undefined) {
      this.id = entidade.id
    }
    this.getEntidadesDeClasse()
  },
  data () {
    return {
      listEntidadeClasse: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getEntidadesDeClasse () {
      let listTemp = []
      this.$axios
        .get('art/entidades-classe')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.nome})
          })
          this.listEntidadeClasse = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/entidades-classe', {id: value, numero: this.$store.getters['art/getNumero']})
        .then(response => {
          this.$store.commit('art/setEntidadeClasse', {id: value})
        })
    }
  }
}
</script>
