<template>
  <div>
    <div class="row gutter-x-sm">
      <div class="col-5">
        <select-participacao-tecnica
              v-model="idTipo"
              class="q-mt-md"
              @limparNumeroArtParticipacaoTecnica="limparNumeroArtParticipacaoTecnica"
        />
      </div>
    </div>
    <div class="row gutter-x-sm">
      <div class="col-5">
        <primeira-participacao-tecnica ref="refPrimeiraParticipacaoTecnica" v-if="heNecessarioPerguntarSeEhPrimeiraParticipacaoTecnica" @exibeNumeroArtParticipacaoTecnica="exibeNumeroArtParticipacaoTecnica"></primeira-participacao-tecnica>
        <input-numero-art-participacao-tecnica
              v-if="heNecessarioNumeroArtParticipacaoTecnica"
              v-model.trim="numeroArtParticipacaoTecnica"
              :idParticipacaoTecnica="idTipo"
              @numeroArtParticipacaoTecnicaJaExiste = "numeroArtParticipacaoTecnicaJaExiste"
              @limparNumeroArtParticipacaoTecnica="limparNumeroArtParticipacaoTecnica"
        />
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import SelectParticipacaoTecnica from '../selects/select-participacao-tecnica'
import InputNumeroArtParticipacaoTecnica from '../input/input-numero-art-participacao-tecnica'
import primeiraParticipacaoTecnica from '../option-groups/primeira-participacao-tecnica'
export default {
  props: ['participacaoTecnica'],
  components: {
    SelectParticipacaoTecnica,
    InputNumeroArtParticipacaoTecnica,
    primeiraParticipacaoTecnica
  },
  created () {
    if (this.participacaoTecnica !== undefined && this.participacaoTecnica !== null) {
      this.idTipo = this.participacaoTecnica.id
    }
  },
  data () {
    return {
      idTipo: null,
      numeroArtParticipacaoTecnica: null,
      exibeCampoNumeroArt: false
    }
  },
  methods: {
    numeroArtParticipacaoTecnicaJaExiste (value) {
      this.numeroArtParticipacaoTecnica = value
    },
    limparNumeroArtParticipacaoTecnica () {
      this.numeroArtParticipacaoTecnica = null
    },
    limparIdTipo () {
      this.idTipo = null
    },
    exibeNumeroArtParticipacaoTecnica (value) {
      if (value) this.exibeCampoNumeroArt = false
      else this.exibeCampoNumeroArt = true
    }
  },
  computed: {
    naoFoiSelecionadoTipo () {
      return this.idTipo === '' || this.idTipo === null || this.idTipo === undefined
    },
    heNecessarioNumeroArtParticipacaoTecnica () {
      return (this.exibeCampoNumeroArt && (this.idTipo === 2 || this.idTipo === 3 || this.idTipo === 4))
    },
    heNecessarioPerguntarSeEhPrimeiraParticipacaoTecnica () {
      return this.idTipo === 2 || this.idTipo === 3 || this.idTipo === 4
    },
    statusBotaoContinua () {
      if (this.naoFoiSelecionadoTipo) {
        return true
      }
      if (this.heNecessarioNumeroArtParticipacaoTecnica) {
        return this.numeroArtParticipacaoTecnica === '' || this.numeroArtParticipacaoTecnica === null || this.numeroArtParticipacaoTecnica === undefined
      }
    }
  },
  watch: {
    participacaoTecnica: function (value, oldValue) {
      if (value !== undefined && value !== null) {
        this.idTipo = value.id
        this.exibeCampoNumeroArt = false
        if (this.$refs.refPrimeiraParticipacaoTecnica) {
          this.$refs.refPrimeiraParticipacaoTecnica.limparCampo()
        }
      }
    }
  }
}
</script>
