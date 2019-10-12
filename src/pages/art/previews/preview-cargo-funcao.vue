<template>
  <q-page id="background-preview" class="layout-padding justify-center text-bold" style="font-size: 10px">

    <preview-cabecalho :art="art" />
    <preview-contrato-cargo-funcao :contrato="art.contratoArt" />
    <preview-rodape :art="art" />

  </q-page>
</template>
<script>
import PreviewCabecalho from '../../../components/preview/preview-cabecalho'
import PreviewContratoCargoFuncao from '../../../components/preview/preview-contrato-cargo-funcao'
import PreviewRodape from '../../../components/preview/preview-rodape'
export default {
  props: ['art'],
  components: {
    PreviewCabecalho,
    PreviewContratoCargoFuncao,
    PreviewRodape
  }
}
</script>
