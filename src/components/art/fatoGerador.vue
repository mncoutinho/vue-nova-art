<template>
  <div>
    <div class="row gutter-x-sm">
      <div class="col-5">
        <select-fato-gerador
              ref="selectFatorGerador"
              class="q-mt-md"
              @atualizaFatoGerador="atualizaFatoGerador"
              @atualizaDescricaoFatoGerador="atualizaDescricaoFatoGerador" />
      </div>
      <div class="col-5">
        <input-descricao-fato-gerador
              v-if="heNecessarioDescricaoFatoGerador"
              v-model.trim="descricaoFatoGerador"
              @atualizaDescricaoFatoGerador="atualizaDescricaoFatoGerador" />
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import SelectFatoGerador from '../selects/select-fato-gerador'
import InputDescricaoFatoGerador from '../input/input-descricao-fato-gerador'
export default {
  props: ['fatoGerador'],
  components: {
    SelectFatoGerador,
    InputDescricaoFatoGerador
  },
  created () {
    if (this.fatoGerador !== undefined && this.fatoGerador !== null) {
      this.idFatoGerador = this.fatoGerador.id
    }
  },
  data () {
    return {
      idFatoGerador: null,
      descricaoFatoGerador: null
    }
  },
  methods: {
    atualizaFatoGerador (value) {
      this.idFatoGerador = value
    },
    atualizaDescricaoFatoGerador (value) {
      this.descricaoFatoGerador = value
    },
    atualizaSelectFatorGerador () {
      this.$refs.selectFatorGerador.getFatoGerador()
    },
    limparCampos () {
      this.idFatoGerador = null
      this.descricaoFatoGerador = null
      this.$refs.selectFatorGerador.limparCampos()
    }
  },
  computed: {
    naoPreencheuFatoGerador () {
      return this.idFatoGerador === '' || this.idFatoGerador === null || this.idFatoGerador === undefined
    },
    heNecessarioDescricaoFatoGerador () {
      return this.idFatoGerador === 1 || this.idFatoGerador === 2 || this.idFatoGerador === 3
    },
    statusBotaoContinua () {
      if (this.naoPreencheuFatoGerador) {
        return true
      }
      if (this.heNecessarioDescricaoFatoGerador) {
        return this.descricaoFatoGerador === '' || this.descricaoFatoGerador === null || this.descricaoFatoGerador === undefined
      }
    }
  }
}
</script>
