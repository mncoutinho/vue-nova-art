<template>
<div>
  <q-field v-if="this.assuntosGerais" icon="fas fa-asterisk"
          icon-color="red-9">
   <q-select
        v-if="this.assuntosGerais"
        color="secondary"
        float-label="Assunto Específico"
        v-model="assuntoEspecifico.label"
        :value="value"
        :options="assuntoEspecifico"
        @input="$emit('input', $event)"
      />
  </q-field>
</div>
</template>
<script>
export default {
  props: ['v', 'value', 'assuntosGerais'],
  created () {
    this.getAssuntoGeral()
  },
  data () {
    return {
      assuntoEspecifico: [],
      id: ''
    }
  },
  watch: {
    assuntosGerais: function () {
      return this.getAssuntoGeral()
    }
  },
  methods: {
    getAssuntoGeral () {
      if (this.id !== this.assuntosGerais) {
        this.getAssuntosEspecificos()
        if (this.assuntoEspecifico === []) {
          this.assuntosGerais = null
        }
        this.id = this.assuntosGerais
      }
    },
    async getAssuntosEspecificos () {
      let listTempAssuntos = []
      if (this.assuntosGerais) {
        await this.$axios
          .get('atendimento/ouvidoria/assuntosEspecifico/' + this.assuntosGerais)
          .then(response => {
            response.data.data.forEach(function (el) {
              listTempAssuntos.push({value: {id: el.id, descricao: el.descricao, assuntosGerais: el.assuntosGerais}, label: el.descricao})
            })
          })
        this.assuntoEspecifico = listTempAssuntos
        return this.assuntoEspecifico
      }
    }
  }
}

</script>
