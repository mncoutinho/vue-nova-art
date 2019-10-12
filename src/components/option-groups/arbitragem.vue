<template>
  <div>
      <q-card>
      <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">ARBITRAGEM</label>
          <info-help v-model="showing" tipo="arbitragem" />
      </q-card-title>
      <q-card-main>
        <q-option-group v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"
          :disable="sequencialDoContrato !== 1"
          color="secondary"
          type="radio"
          inline
          @input="atualiza"
          v-model="arbitragem"
          :options="[
            { label: 'SIM', value: true, color: 'green' },
            { label: 'NÃO', value: false, color: 'negative' }
          ]" />
      </q-card-main>
    </q-card>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    if (this.$store.getters['art/getArbitragem'] !== null) {
      this.arbitragem = this.$store.getters['art/getArbitragem']
    }
    if (this.$store.getters['art/getSequencialContrato']) {
      this.sequencialDoContrato = this.$store.getters['art/getSequencialContrato']
    }
  },
  data () {
    return {
      arbitragem: null,
      showing: false,
      sequencialDoContrato: 0
    }
  },
  methods: {
    atualiza (value) {
      this.$axios
        .put('art/contratos/arbitragem', { checked: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setArbitragem', value)
        })
    },
    showInfo () {
      this.showing = !this.showing
    }
  }
}
</script>
