<template>
  <q-page id="background-preview" class="layout-padding justify-center text-bold" style="font-size: 10px">
    <preview-cabecalho :art="art" />

    <preview-contrato-obra-servico :contrato="art.contratoArt" />

    <preview-rodape :art="art" />

  </q-page>
</template>
<script>
import PreviewCabecalho from '../../../components/preview/preview-cabecalho'
import PreviewContratoObraServico from '../../../components/preview/preview-contrato-obra-servico'
import PreviewRodape from '../../../components/preview/preview-rodape'
export default {
  props: ['art'],
  components: {
    PreviewCabecalho,
    PreviewContratoObraServico,
    PreviewRodape
  }
}
</script>
