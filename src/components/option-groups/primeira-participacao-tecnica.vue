<template>
  <div>
    <q-field
        icon="fas"
        icon-color=""
        style="margin-top:8px;">
      <span><label>Primeira ART por participação técnica?</label></span>
      <q-option-group
        color="secondary"
        type="radio"
        inline
        @input="atualiza"
        v-model="primeiraParticipacaoTecnica"
        :options="[
          { label: 'Sim', value: true, color: 'green' },
          { label: 'Não', value: false, color: 'negative' }
        ]" />
    </q-field>
  </div>
</template>
<script>
export default {
  created () {
    if (this.$store.getters['art/getPrimeiraParticipacaoTecnica'] !== null) {
      this.primeiraParticipacaoTecnica = this.$store.getters['art/getPrimeiraParticipacaoTecnica']
      this.$emit('exibeNumeroArtParticipacaoTecnica', this.primeiraParticipacaoTecnica)
    }
  },
  data () {
    return {
      primeiraParticipacaoTecnica: null
    }
  },
  methods: {
    atualiza (value) {
      this.$axios
        .put('art/primeira-participacao-tecnica', { checked: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setPrimeiraParticipacaoTecnica', value)
          this.$store.commit('art/setNumeroArtParticipacaoTecnica', null)
          this.$emit('exibeNumeroArtParticipacaoTecnica', value)
        })
    },
    limparCampo () {
      this.primeiraParticipacaoTecnica = null
    }
  }
}
</script>
