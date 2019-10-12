<template>
  <div>
    <q-select
      color="secondary"
      filter
      filter-placeholder="Filtro"
      separator
      :float-label="label"
      :value="value"
      :options="inspetorias"
      @input="seleciona"
    />
</div>
</template>
<script>
export default {
  props: ['value', 'label'],
  created () {
    this.$axios
      .get('cadastro/unidades-atendimento')
      .then(response => {
        response.data.data.forEach(el => {
          this.inspetorias.push({value: el.id, label: el.nome})
        })
      })
  },
  data () {
    return {
      inspetorias: []
    }
  },
  methods: {
    seleciona (value) {
      this.$emit('input', value)
    }
  }
}
</script>
