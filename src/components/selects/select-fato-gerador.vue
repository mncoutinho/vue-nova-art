<template>
  <div>
    <q-field
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:20px;">
        <div class="row">
          <div class="col-10">
            <q-select
              placeholder="MOTIVO DE REGISTRO"
              color="secondary"
              v-model="id"
              :options="listOptions"
              @input="atualiza"/>
          </div>
          <div style="margin-top: 10px" class="col-2">
            <info-help v-model="showing" tipo="fatoGerador" />
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
    let fatoGerador = this.$store.getters['art/getFatoGerador']
    if (fatoGerador) {
      this.id = fatoGerador.id
      this.$emit('atualizaFatoGerador', this.id)
    }
    this.getFatoGerador()
  },
  data () {
    return {
      id: null,
      listOptions: [],
      showing: false
    }
  },
  methods: {
    getFatoGerador () {
      let listTemp = []
      this.$axios
        .get('art/fato-gerador')
        .then(response => {
          response.data.data.forEach(el => {
            if (!(this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && (el.id === 2 || el.id === 4 || el.id === 5 || el.id === 6))) {
              listTemp.push({value: el.id, label: el.nome})
            }
          })
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/fato-gerador', { id: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setFatoGerador', response.data.data)
          this.$store.commit('art/setDescricaoFatoGerador', null)
          this.$emit('atualizaDescricaoFatoGerador', null)
          this.$emit('atualizaFatoGerador', value)
        })
    },
    limparCampos () {
      this.id = null
    }
  }
}
</script>
