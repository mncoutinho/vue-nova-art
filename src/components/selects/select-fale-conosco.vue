<template>
  <div>
    <q-select
          float-label="Motivo"
          color="secondary"
          :value="value"
         :options="[{value: 1, label: 'Erro no sistema'}, {value: 60, label: 'Elogios'}, {value: 61, label: 'Dúvidas'}, {value: 62, label: 'Sugestões'}, {value: 63, label: 'Outros'}]"
          @input="edita"
           :error="error"
          />
</div>
</template>
<script>
export default {
  props: ['value', 'error'],
  methods: {
    edita (value) {
      this.$emit('input', value)
    }
  }
}
</script>
