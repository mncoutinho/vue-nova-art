<template>
  <div v-if="true">
       <q-field
          icon="fas"
          icon-color="red-9">
          <div class="row">
            <div class="col-11">
              <q-input
              v-model.trim="numeroArtVinculadaContrato"
              @input="edita"
              float-label="Número da ART Vinculada:"/>
            </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="numeroArtVinculadaContrato" />
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
    this.numeroArtVinculadaContrato = this.$store.getters['art/getNumeroArtVinculadaContrato']
  },
  data () {
    return {
      showing: false,
      numeroArtVinculadaContrato: null
    }
  },
  methods: {
    edita: _.debounce(function (value) {
      if (value.length > 6) {
        this.$axios
          .put('art/contratos/numero-art-vinculada-contrato', { nome: value, numero: this.$store.getters['art/getId'], registro: this.$store.getters['art/getNumero'] })
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.$q.notify({message: response.data.data, type: 'negative', position: 'center'})
              this.$store.commit('art/setNumeroArtVinculadaContrato', null)
              this.numeroArtVinculadaContrato = null
            } else {
              this.$store.commit('art/setNumeroArtVinculadaContrato', response.data.data.nome)
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
