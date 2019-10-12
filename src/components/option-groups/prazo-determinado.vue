<template>
  <div style="margin-left:80px;">
    <!-- <span>
      <q-popover style="border-radius: 2px; opacity: 0.9" anchor="top middle" self="bottom left" v-model="showing">
        <q-card>
          <q-card-main>
            <label>PRAZO DETERMINADO:</label> Marque sim quando o prazo for determinado.
          </q-card-main>
        </q-card>
      </q-popover>
    </span> -->
    <span class="caption">Prazo Determinado?</span>
    <!-- <q-btn icon="help" size="sm" round flat color="grey-6" @click="showing = !showing" /> -->
    <q-option-group
      color="secondary"
      type="radio"
      inline
      @input="atualizaPrazoDeterminado"
      v-model="prazoDeterminado"
      :options="[
        { label: 'Sim', value: true, color: 'secondary' },
        { label: 'Não', value: false, color: 'negative' }
      ]"
    />
  </div>
</template>
<script>
export default {
  created () {
    this.prazoDeterminado = this.$store.getters['art/getPrazoDeterminado']
  },
  data () {
    return {
      prazoDeterminado: false,
      showing: false
    }
  },
  methods: {
    atualizaPrazoDeterminado (value) {
      this.$axios
        .put('art/contratos/prazo-determinado', { checked: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setPrazoDeterminado', value)
          if (!value) {
            this.$store.commit('art/setPrazoDia', null)
            this.$store.commit('art/setPrazoMes', null)
            this.$store.commit('art/setDataFim', null)
            this.$store.commit('art/setDataFimFormatada', null)
          }
        })
    }
  }
}
</script>
