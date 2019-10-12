<template>
  <div>
    <div class="row">
      <div class="col-11">
        <q-select
          float-label="Tipo Contratante"
          v-if="!ehPessoaFisica"
          v-model="id"
          :options="listOptions"
          color="secondary"
          @input="atualiza"/>
        </div>
        <div style="margin-top: 25px" class="col-1">
          <info-help v-model="showing" tipo="tipoContratante" v-if="!ehPessoaFisica"/>
        </div>
    </div>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    let tipoContratante = this.$store.getters['art/getTipoContratante']
    if (tipoContratante !== null && tipoContratante !== undefined) {
      this.id = tipoContratante.id
    }
    let tipo = this.$store.getters['art/getTipoPessoaContratante']
    if (tipo === 'LEIGOPF') {
      this.ehPessoaFisica = true
      this.id = 1
      this.ehPessoaFisica = true
      this.atualiza(this.id)
    } else if (tipo === 'LEIGOPJ') {
      this.ehPessoaFisica = false
    } else {
      let cpfOuCnpjCOntratante = this.$store.getters['art/getCpfOuCnpjContratante']
      if (cpfOuCnpjCOntratante) {
        if (cpfOuCnpjCOntratante.length === 11) {
          this.id = 1
          this.ehPessoaFisica = true
          this.atualiza(this.id)
        }
      }
    }
  },
  mounted () {
    this.getTiposContratantes()
  },
  data () {
    return {
      listOptions: [],
      showing: false,
      id: null,
      ehPessoaFisica: false
    }
  },
  methods: {
    getTiposContratantes () {
      let listTemp = []
      this.$axios
        .get('art/tipos-contratantes')
        .then(response => {
          response.data.data.forEach(function (el) {
            if (!this.ehPessoaFisica) {
              if (el.id !== 1) {
                listTemp.push({value: el.id, label: el.descricao})
              }
            } else {
              listTemp.push({value: el.id, label: el.descricao})
            }
          }.bind(this))
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/tipo-contratante', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setTipoContratante', { id: value })
        })
    }
  }
}
</script>
