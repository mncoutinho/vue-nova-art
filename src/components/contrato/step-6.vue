<template>
  <div>
    <q-step name="finaliza" title="OBSERVAÇÕES - DECLARAÇÃO" style="margin-top: 10px">
      <div class="row gutter-x-sm gutter-y-sm">
        <div class="col-4" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']">
          <select-tipo-acao-institucional />
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px">
        <div class="col-12" v-if="!this.$store.getters['art/ehReceituarioAgronomico']">
            <input-descricao-complementar />
        </div>
      </div>
       <mensagem-validacao ref="msgValida" />
      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px" v-if="!this.$store.getters['art/ehReceituarioAgronomico']">
        <div class="col-12">
          <acessibilidade />
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']">
        <div class="col-12" >
          <arbitragem />
        </div>
      </div>

      <q-stepper-navigation class="row justify-left">
        <botao :label="'Voltar'"
               :type="'secondary'"
               :icon="'reply'"
               class="q-mt-md q-mr-md"
               @emit="$emit('voltar')" />
        <botao v-if="!this.$store.getters['art/ehModelo']"
               :label="'Finalizar Contrato'"
               :icon="'thumb_up'"
               :loading="showLoadingBtn"
               class="q-mt-md"
               @emit="prosseguir()" />
        <botao v-if="this.$store.getters['art/ehModelo']"
               :label="'Gerar contrato no modelo da ART'"
               :icon="'thumb_up'"
               :loading="showLoadingBtn"
               class="q-mt-md"
               @emit="prosseguir()" />
      </q-stepper-navigation>
    </q-step>
  </div>
</template>

<script>
import _ from 'lodash'
import Botao from '../../components/button/botao'
import MensagemValidacao from '../partials/mensagem-validacao'
import SelectConvenioPublico from '../selects/select-convenio-publico'
import SelectTipoAcaoInstitucional from '../selects/select-tipo-acao-institucional'
import InputDescricaoComplementar from '../input/input-descricao-complementar'
import Acessibilidade from '../option-groups/acessibilidade'
import Arbitragem from '../option-groups/arbitragem'
export default {
  components: {
    Botao,
    SelectConvenioPublico,
    SelectTipoAcaoInstitucional,
    InputDescricaoComplementar,
    Acessibilidade,
    Arbitragem,
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
      this.validaPreenchimentoDadosAcessibilidadeArbitragem()
    }, 1000),
    validaPreenchimentoDadosAcessibilidadeArbitragem () {
      this.$axios
        .get('art/valida/contratos/preenchimento-acessibilidade-arbitragem/' + this.$store.getters['art/getId'])
        .then(response => {
          this.exibeMensagemValidacao = false
          this.mensagensValidacoes = []
          this.concluir()
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
    concluir: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/finaliza', { numero: this.$store.getters['art/getId'], checked: true })
        .then(response => {
          this.$store.commit('art/excluiContrato')
          this.showLoadingBtn = false
          this.$emit('concluir')
        })
    }, 2001)
  }
}
</script>
