<template>
  <div>
    <q-field
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:20px;">
        <div class="row">
          <div class="col-10">
            <q-select
              placeholder="FORMA DE REGISTRO"
              v-if="true"
              color="secondary"
              :value="value"
              :options="listOptions"
              @input="edita"
            />
          </div>
          <div style="margin-top: 10px" class="col-2">
            <info-help v-model="showing" tipo="tipo" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  props: ['value'],
  components: {
    InfoHelp
  },
  created () {
    this.getTipoArt()
  },
  data () {
    return {
      showing: false,
      listOptions: []
    }
  },
  methods: {
    getTipoArt () {
      let listTemp = []
      this.$axios
        .get('art/tipo')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.nome})
          })
          this.listOptions = listTemp
        })
    },
    edita (value) {
      this.$axios
        .put('art/tipo/' + this.$store.getters['art/getNumero'], { id: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setTipo', response.data.data)
          this.$store.commit('art/setNumeroArtPrincipal', null)
          this.$emit('limparNumeroArtPrincipal')
          this.$emit('input', value)
        })
    },
    getTipoByValue () {
      let idTipo = this.$store.getters['art/getIdTipo']
      let tipo = this.listOptions.filter(function (el) { return el.value === idTipo })
      if (tipo[0] !== undefined && tipo[0] !== null) {
        return tipo[0].label
      }
    }
  }
}
</script>
