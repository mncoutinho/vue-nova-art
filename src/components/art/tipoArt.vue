<template>
  <div>
    <div class="row gutter-x-sm">
      <div class="col-5">
        <select-tipos
              v-model="idTipo"
              class="q-mt-md"
              @limparNumeroArtPrincipal="limparNumeroArtPrincipal" />
      </div>
      <div class="col-5">
       <input-numero-art-principal
              v-if="heNecessarioNumeroArtPrincipal"
              v-model.trim="numeroArtPrincipal"
              @numeroArtPrincipalJaExiste = "numeroArtPrincipalJaExiste"
              @limparNumeroArtPrincipal="limparNumeroArtPrincipal"
              @dadosDoContratoDaComplementarCarregado="dadosDoContratoDaComplementarCarregado" />
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import SelectTipos from '../selects/select-tipos'
import InputNumeroArtPrincipal from '../input/input-numero-art-principal'
export default {
  props: ['tipoArt'],
  components: {
    SelectTipos,
    InputNumeroArtPrincipal
  },
  created () {
    if (this.tipoArt !== undefined && this.tipoArt !== null) {
      this.idTipo = this.tipoArt.id
    }
  },
  data () {
    return {
      tipo: false,
      idTipo: null,
      numeroArtPrincipal: null
    }
  },
  methods: {
    numeroArtPrincipalJaExiste (value) {
      this.numeroArtPrincipal = value
    },
    limparNumeroArtPrincipal () {
      this.numeroArtPrincipal = null
    },
    limparIdTipo () {
      this.idTipo = null
    },
    dadosDoContratoDaComplementarCarregado () {
      this.$emit('dadosDoContratoDaComplementarCarregado')
    }
  },
  computed: {
    naoFoiSelecionadoTipo () {
      return this.idTipo === '' || this.idTipo === null || this.idTipo === undefined
    },
    heNecessarioNumeroArtPrincipal () {
      return this.idTipo === 1 || this.idTipo === 2 || this.idTipo === 3
    }
  },
  watch: {
    tipoArt: function (value, oldValue) {
      if (value !== undefined && value !== null) {
        this.idTipo = value.id
      }
    }
  }
}
</script>
