<template>
  <div v-if="true">
    <q-field
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:8px;">
        <div class="row">
          <div class="col-10">
            <q-input v-model.trim="numeroArtParticipacaoTecnica" @input="edita" float-label="Número da ART participação técnica:" style="margin-top: -7px" />
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="numeroArtParticipacaoTecnica" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
import _ from 'lodash'
export default {
  props: ['idParticipacaoTecnica'],
  components: {
    InfoHelp
  },
  created () {
    this.numeroArtParticipacaoTecnica = this.$store.getters['art/getNumeroArtParticipacaoTecnica']
    if (this.numeroArtParticipacaoTecnica) {
      this.$emit('numeroArtParticipacaoTecnicaJaExiste', this.numeroArtParticipacaoTecnica)
    }
  },
  data () {
    return {
      showing: false,
      numeroArtParticipacaoTecnica: null
    }
  },
  methods: {
    edita: _.debounce(function (value) {
      if (value.length > 6) {
        this.$axios
          .put('art/numero-art-participacao-tecnica', { id: this.idParticipacaoTecnica, nome: value, numero: this.$store.getters['art/getNumero'] })
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.$q.notify({message: response.data.data, type: 'negative', position: 'center'})
              this.$emit('limparNumeroArtParticipacaoTecnica')
              this.$store.commit('art/setNumeroArtParticipacaoTecnica', null)
            } else {
              this.$store.commit('art/setNumeroArtParticipacaoTecnica', response.data.data.nome)
              this.$emit('input', value)
            }
          })
          .catch(() => {
            this.$q.notify({message: 'Favor digitar um número de ART válido', type: 'negative', position: 'center'})
          })
      }
    }, 1500)
  },
  watch: {
    opcaoFiltro: function (value, oldValue) {
      this.limparFiltros()
    }
  }
}
</script>
