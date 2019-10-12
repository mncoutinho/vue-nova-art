<template>
  <div>
    <q-field
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:20px;">
      <div class="row">
          <div class="col-10">
            <q-select placeholder="PARTICIPAÇÃO TÉCNICA"
                color="secondary"
                :value="value"
                :options="listOptions"
                @input="edita" />
          </div>
          <div style="margin-top: 10px" class="col-2">
            <info-help v-model="showing" tipo="participacaoTecnica" />
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
    this.getParticipacaoTecnica()
  },
  data () {
    return {
      showing: false,
      listOptions: []
    }
  },
  methods: {
    getParticipacaoTecnica () {
      let listTemp = []
      this.$axios
        .get('art/participacao-tecnica')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listOptions = listTemp
        })
    },
    edita (value) {
      this.$axios
        .put('art/participacao-tecnica', { id: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setParticipacaoTecnica', response.data.data)
          this.$store.commit('art/setNumeroArtParticipacaoTecnica', null)
          this.$store.commit('art/setPrimeiraParticipacaoTecnica', null)
          this.$emit('limparNumeroArtParticipacaoTecnica')
          this.$emit('input', value)
        })
    },
    getParticipacaoTecnicaByValue () {
      let idParticipacao = this.$store.getters['art/getIdParticipacaoTecnica']
      let participacaoTecnica = this.listOptions.filter(function (el) { return el.value === idParticipacao })
      if (participacaoTecnica[0] !== undefined && participacaoTecnica[0] !== null) {
        return participacaoTecnica[0].label
      }
    }
  }
}
</script>
