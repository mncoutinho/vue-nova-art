<template>
  <div>
    <q-select
      color="secondary"
      separator
      float-label="Natureza do Boleto"
      :value="value"
      :options="getNaturezas()"
      @input="seleciona"
    />
</div>
</template>
<script>
import listFinNatureza from '../../assets/listFinNatureza'
export default {
  props: ['value'],
  data () {
    return {
      listFinNatureza: listFinNatureza
    }
  },
  methods: {
    getNaturezas () {
      return this.listFinNatureza
    },
    seleciona (value) {
      this.$emit('input', value)
    }
  }
}
</script>
