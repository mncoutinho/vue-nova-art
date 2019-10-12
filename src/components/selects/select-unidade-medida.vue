<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
                  <q-select filter
                filter-placeholder="Filtro"
                float-label="Unidade"
                v-model="id"
                :options="listUnidades"
                color="secondary"
                @input="atualiza"/>

          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="unidadeMedida" />
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
    this.getUnidades()
    let quantificacaoStore = this.$store.getters['art/getQuantificacao']
    if (quantificacaoStore !== null && quantificacaoStore !== undefined) {
      this.id = quantificacaoStore.codigo
    }
  },
  data () {
    return {
      listUnidades: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getUnidades () {
      let listTempUnidades = []
      this.$axios
        .get('art/unidade-medida')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempUnidades.push({value: el.id, label: el.sigla + ' - ' + el.nome})
          })
          this.listUnidades = listTempUnidades
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/unidade-medida', { codigo: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setUnidadeMedida', value)
        })
    }
  }
}
</script>
