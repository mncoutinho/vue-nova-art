<template>
  <div>
    <q-select
      color="secondary"
      separator
      float-label="Tipo de Certidão"
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
        {value: '1', label: 'REGISTRO'},
        {value: '2', label: 'ATRIBUIÇÕES  PROFISSIONAIS'},
        {value: '4', label: 'CURRÍCULO'},
        {value: '8', label: 'ACERVO TÉCNICO'}
      ]
    }
  },
  methods: {
    seleciona (value) {
      this.$emit('validacoes', value)
    }
  }
}
</script>
