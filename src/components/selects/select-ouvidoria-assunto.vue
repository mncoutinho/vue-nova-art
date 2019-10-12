<template>
<div>
  <q-field icon="fas fa-asterisk"
          icon-color="red-9">
   <q-select
        color="secondary"
        float-label="Assunto"
        v-model="assunto.label"
        :value="value"
        :options="assunto"
        @input="$emit('input', $event)"
        @change="$emit('input', $event)"
      />
  </q-field>
</div>
</template>
<script>
export default {
  props: ['v', 'value'],
  created () {
    this.getAssuntos()
  },
  data () {
    return {
      assunto: []
    }
  },
  methods: {
    getAssuntos () {
      let listTempAssuntos = []
      this.$axios
        .get('atendimento/ouvidoria/assuntosGerais')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempAssuntos.push({value: {id: el.id, descricao: el.descricao}, label: el.descricao})
          })
        })
      this.assunto = listTempAssuntos
    }
  }
}

</script>
