<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red">
      <div class="row">
          <div class="col-11">
            <q-select float-label="Função Técnica"
                v-model="id"
                :options="listOptions"
                @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="tipoFuncao" />
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
    let tipo = this.$store.getters['art/getTipoFuncao']
    if (tipo !== null && tipo !== undefined) {
      this.id = tipo.id
    }
    this.getTiposFuncoes()
  },
  data () {
    return {
      listOptions: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getTiposFuncoes () {
      let listTemp = []
      this.$axios
        .get('art/tipos-funcoes')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/tipo-funcao', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setTipoFuncao', { id: value })
        })
    }
  },
  watch: {
    id: function (value, oldValue) {
      if (oldValue === 1 && value !== 1) {
        this.$axios
          .put('art/contratos/descricao-cargo-funcao', { descricao: '', numero: this.$store.getters['art/getId'] })
          .then(response => {
            this.$store.commit('art/setDescricaoCargoFuncao', null)
            this.$emit('input', value)
          })
      }
    }
  }
}
</script>
