<template>
  <div style="margin-left:80px;">
    <span class="caption">Pró-Labore?</span>
    <q-option-group
      color="secondary"
      type="radio"
      inline
      @input="atualizaProLabore"
      v-model="prolabore"
      :options="[
        { label: 'Sim', value: true, color: 'green' },
        { label: 'Não', value: false, color: 'negative' }
      ]"
    />
  </div>
</template>
<script>
export default {
  mounted () {
    this.prolabore = this.$store.getters['art/getProLabore']
  },
  data () {
    return {
      prolabore: false,
      showing: false
    }
  },
  methods: {
    atualizaProLabore (value) {
      this.$axios
        .put('art/contratos/pro-labore', { checked: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setProLabore', value)
          this.$emit('validaProlabore', value)
        })
    }
  }
}
</script>
