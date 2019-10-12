<template>
  <div>
    <q-modal v-if="opened" v-model="opened" :content-css="{minWidth: '40vw', minHeight: '95vh'}">
      <q-modal-layout >
        <div class="row justify-end"><q-btn icon="clear" flat size="sm" color="dark" v-close-overlay /></div>
        <preview-obra-servico v-if="art.natureza ? art.natureza.id === 1 : false" :art="art" />
        <preview-cargo-funcao v-if="art.natureza ? art.natureza.id === 2 : false" :art="art" />
        <preview-multipla v-if="art.natureza ? art.natureza.id === 5 : false" :art="art" />
        <spinner :showSpinner="showSpinner"></spinner>
      </q-modal-layout>
    </q-modal>
    <modal-preview-contrato ref="modalContrato"/>
  </div>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import ModalPreviewContrato from './modal-preview-contrato'
import PreviewObraServico from '../../pages/art/previews/preview-obra-servico'
import PreviewCargoFuncao from '../../pages/art/previews/preview-cargo-funcao'
import PreviewMultipla from '../../pages/art/previews/preview-multipla'
export default {
  components: {
    Spinner,
    ModalPreviewContrato,
    PreviewObraServico,
    PreviewCargoFuncao,
    PreviewMultipla
  },
  data () {
    return {
      showSpinner: '',
      modelo: false,
      pesquisa: {},
      preview: '',
      art: {},
      opened: false
    }
  },
  methods: {
    async toggle (art) {
      this.showSpinner = true
      this.getArt(art.numero)
      this.opened = !this.opened
    },
    getArt (numero) {
      this.$axios
        .get('/art/' + numero)
        .then(response => {
          this.art = response.data.data
          this.showSpinner = false
        })
    }
  }
}
</script>
