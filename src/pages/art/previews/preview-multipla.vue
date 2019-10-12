<template>
  <q-page id="background-preview" class="layout-padding justify-center text-bold" style="font-size: 10px">
    <preview-cabecalho :art="art" />

    <div class="row gutter-y-sm justify-around q-mt-xs">
      <div class="col-4 q-mt-sm">Contrato nº {{art.contratoArt.id}}</div>
      <div class="col-4">
        <q-btn icon="keyboard_arrow_left" round size="sm" dense @click="contratoAnterior()" />
        {{contratoAtual}} de {{art.quantidadeContratos}}
        <q-btn icon="keyboard_arrow_right" round size="sm" dense @click="proximoContrato()" />
      </div>
    </div>

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
  },
  data () {
    return {
      contratoAtual: 1
    }
  },
  methods: {
    contratoAnterior () {
      if (this.contratoAtual > 1) {
        this.$axios
          .get('/art/contratos/detalhado/' + this.art.numero + '-' + (this.contratoAtual - 1))
          .then(response => {
            this.art.contratoArt = response.data.data
            this.contratoAtual--
          })
      }
    },
    proximoContrato () {
      if (this.contratoAtual < this.art.quantidadeContratos) {
        this.$axios
          .get('/art/contratos/detalhado/' + this.art.numero + '-' + (this.contratoAtual + 1))
          .then(response => {
            this.art.contratoArt = response.data.data
            this.contratoAtual++
          })
      }
    }
  }
}
</script>
