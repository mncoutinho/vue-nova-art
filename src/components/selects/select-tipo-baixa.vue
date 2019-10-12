<template>
  <div>
    <q-select
          float-label="Tipo Baixa"
          color="secondary"
          :value="value"
          :options="listBaixa"
          @input="edita"
          />
</div>
</template>
<script>
export default {
  props: ['value'],
  created () {
    this.getTipos()
  },
  data () {
    return {
      listBaixa: []
    }
  },
  methods: {
    edita (value) {
      this.$emit('input', value)
    },
    getTipos () {
      let listBaixa = []
      this.$axios
        .get('art/tipos-baixa')
        .then(response => {
          response.data.data.forEach(function (el) {
            listBaixa.push({value: el.id, label: el.descricao})
          })
        })
      this.listBaixa = listBaixa
    }
  }
}
</script>
