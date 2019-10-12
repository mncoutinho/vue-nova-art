<template>
<div>
  <q-field icon="fas fa-asterisk"
          icon-color="red-9">
    <q-select
          color="secondary"
          float-label="Tipo Demanda"
          v-model="tipoDemanda.label"
          :value="tipoDemanda"
          :options="tipoDemanda"
          @input="seleciona"
        />
  </q-field>
</div>
</template>
<script>
export default {
  created () {
    this.getTipoDemanda()
  },
  data () {
    return {
      tipoDemanda: []
    }
  },
  methods: {
    seleciona (value) {
      this.$emit('input', value)
    },
    getTipoDemanda () {
      let listTempTipoDemanda = []
      this.$axios
        .get('atendimento/ouvidoria/tipoDemanda')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempTipoDemanda.push({value: {id: el.id, descricao: el.descricao}, label: el.descricao})
          })
        })
      this.tipoDemanda = listTempTipoDemanda
    }
  }
}

</script>
