<template>
  <div v-if="true">
       <q-field
          icon="fas fa-asterisk"
          icon-color="red-9">
          <div class="row">
            <div class="col-10">
              <q-input v-model.trim="numeroArtPrincipal" @input="edita" float-label="Número da ART Inicial:" />
            </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="numeroArtPrincipal" />
          </div>
        </div>
       </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
import _ from 'lodash'
export default {
  components: {
    InfoHelp
  },
  created () {
    this.numeroArtPrincipal = this.$store.getters['art/getNumeroArtPrincipal']
    if (this.numeroArtPrincipal) {
      this.$emit('numeroArtPrincipalJaExiste', this.numeroArtPrincipal)
    }
  },
  data () {
    return {
      showing: false,
      numeroArtPrincipal: null
    }
  },
  methods: {
    edita: _.debounce(function (value) {
      if (value.length > 6) {
        this.$axios
          .put('art/numero-art-principal', { id: this.$store.getters['art/getIdTipo'], nome: value, numero: this.$store.getters['art/getNumero'] })
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.$q.notify({message: response.data.data, type: 'negative', position: 'center'})
              this.$emit('limparNumeroArtPrincipal')
              this.$store.commit('art/setNumeroArtPrincipal', null)
            } else {
              this.$store.commit('art/setNumeroArtPrincipal', response.data.data.nome)
              if (this.$store.getters['art/getIdTipo'] === 1) {
                this.$store.commit('art/setPossuiContratoCadastrado', true)
                this.$store.commit('art/setContrato', response.data.data)
                this.$emit('dadosDoContratoDaComplementarCarregado')
              }
              this.$emit('input', value)
            }
          })
          .catch(() => {
            this.$q.notify({message: 'Favor digitar um número de ART válido', type: 'negative', position: 'center'})
          })
      }
    }, 1500)
  }
}
</script>
