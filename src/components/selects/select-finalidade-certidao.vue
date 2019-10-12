
<template>
  <div>
    <q-select
      color="secondary"
      separator
      float-label="Finalidade"
      :value="value"
      :options="tipos"
      @input="seleciona"
    />
</div>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      tipos: [
        {value: '1', label: 'ARQUIVO'},
        {value: '2', label: 'PARA FINS DE LICITAÇÃO'},
        {value: '3', label: 'PROVA JUNTO A ORGÃO PÚBLICO'},
        {value: '4', label: 'PARA FINS DE DIREITO'},
        {value: '6', label: 'VISTO EM OUTRO CREA'},
        {value: '5', label: 'CADASTRAMENTO'}
      ]
    }
  },
  methods: {
    seleciona (value) {
      this.$emit('input', value)
    }
  }
}
</script>
