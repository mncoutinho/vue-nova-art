<template>
  <div>
    <q-step name="dados-tecnicos" title="ATIVIDADE TÉCNICA">
      <mensagem-validacao ref="msgValida" />
      <div class="row gutter-x-sm gutter-y-sm" v-if="this.$store.getters['art/ehObraEServico'] || this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
        <div class="col-8">
          <select-ramo-art @ramoValido="ramoValido" />
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" v-if="!this.$store.getters['art/ehObraEServico'] && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']">
        <div class="col-4">
          <select-ramo-art @ramoValido="ramoValido" />
        </div>
        <div class="col-4">
          <select-finalidade />
        </div>
        <div class="col-4">
          <input-codigo-obra-servico />
        </div>
      </div>

      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px">
        <div class="col-4">
          <atividade tipo="atividade" />
        </div>
        <div class="col-4" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <atividade tipo="especificacao" />
        </div>
        <div class="col-4">
          <atividade tipo="complemento" />
        </div>
      </div>

      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px">
        <div class="col-4">
          <input-quantificacao v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']"></input-quantificacao>
        </div>
        <div class="col-4">
          <select-unidade-medida v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']"></select-unidade-medida>
        </div>
        <div class="col-4">
          <input-numero-pavimentos v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']"></input-numero-pavimentos>
        </div>
      </div>

      <q-stepper-navigation class="row justify-left">
        <botao :label="'Voltar'"
               :type="'secondary'"
               :icon="'reply'"
               class="q-mt-md q-mr-md"
               @emit="$emit('voltar')" />
        <botao :label="'Próximo'"
               :icon="'redo'"
               :loading="showLoadingBtn"
               class="q-mt-md"
               @emit="prosseguir()" />
      </q-stepper-navigation>
    </q-step>
  </div>
</template>

<script>
import Botao from '../../components/button/botao'
import MensagemValidacao from '../partials/mensagem-validacao'
import SelectRamoArt from '../selects/select-ramo-art'
import SelectFinalidade from '../selects/select-finalidade'
import Atividade from '../contrato/atividade'
import InputQuantificacao from '../input/input-quantificacao'
import SelectUnidadeMedida from '../selects/select-unidade-medida'
import InputNumeroPavimentos from '../input/input-numero-pavimentos'
import InputCodigoObraServico from '../input/input-codigo-obra-servico'
import _ from 'lodash'
export default {
  components: {
    Botao,
    SelectRamoArt,
    SelectFinalidade,
    Atividade,
    InputQuantificacao,
    SelectUnidadeMedida,
    InputNumeroPavimentos,
    InputCodigoObraServico,
    MensagemValidacao
  },
  data () {
    return {
      showLoadingBtn: false
    }
  },
  methods: {
    prosseguir: _.debounce(function (value) {
      this.showLoadingBtn = true
      this.validaPreenchimentoDadosTecnicosDoContrato()
    }, 1500),
    validaPreenchimentoDadosTecnicosDoContrato () {
      this.$axios
        .get('art/valida/contratos/preenchimento-dados-tecnicos/' + this.$store.getters['art/getId'])
        .then(response => {
          this.exibeMensagemValidacao = false
          this.mensagensValidacoes = []
          this.showLoadingBtn = false
          this.$emit('prosseguir')
        })
        .catch(erro => {
          this.showLoadingBtn = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    ramoValido (mensagem) {
      if (mensagem) {
        this.$refs.msgValida.toggle(mensagem)
      } else {
        this.$refs.msgValida.fechar()
      }
    }
  }
}
</script>
