<template>
  <div>
    <q-step name="contratante" :title="title">
      <mensagem-validacao ref="msgValida" />
      <div class="row" v-if="!contratante">
        <div class="col-11">
          <busca-pessoa :titulo="titlePessoa"
                        tipoPessoa="contratante"
                        @edita="recebePessoa" />
        </div>
        <div class="col-1">
          <info-help v-model="showing" tipo="contratante" />
        </div>
      </div>
      <view-contratante v-if="contratante"
                        @excluiContratante="excluiContratante" />
      <div class="row" v-if="idEndereco === null">
        <div class="col-11">
          <endereco class="q-mt-md"
                    :idEndereco = "idEndereco"
                    :tipoEndereco="'CONTRATANTE'"
                    :titulo="title"
                    ehArt
                    @atualizaEndereco="atualizaEndereco" />
        </div>
        <div style="margin-top: 15px" class="col-1">
          <info-help v-model="showingEndereco" tipo="enderecoContratante" />
        </div>
      </div>
      <endereco v-if="idEndereco !== null"
                class="q-mt-md"
                :idEndereco = "idEndereco"
                :tipoEndereco="'CONTRATANTE'"
                :titulo="title"
                ehArt
                @atualizaEndereco="atualizaEndereco" />
      <modal-endereco-confirmacao ref="modalConfirmacao"
                                  :enderecoView="enderecoView"
                                  @enderecoConfirmado="enderecoConfirmado" />
      <select-tipo-contratante v-if="contratante" />
      <q-stepper-navigation class="row justify-left">
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
import BuscaPessoa from '../pessoa/busca-pessoa'
import Endereco from '../endereco/endereco'
import ViewContratante from './view-contratante'
import ModalEnderecoConfirmacao from '../endereco/modal/modal-endereco-confirmacao'
import EnderecoModel from '../models/Endereco.js'
import MensagemValidacao from '../partials/mensagem-validacao'
import SelectTipoContratante from '../selects/select-tipo-contratante'
import InfoHelp from '../info/info-help'
import _ from 'lodash'
export default {
  components: {
    Botao,
    BuscaPessoa,
    Endereco,
    EnderecoModel,
    ModalEnderecoConfirmacao,
    ViewContratante,
    MensagemValidacao,
    SelectTipoContratante,
    InfoHelp
  },
  created () {
    this.title = 'CONTRATANTE'
    this.titlePessoa = 'CONTRATANTE'
    this.contratante = this.$store.getters['art/getIdPessoaContratante']
    this.enderecoView = this.$store.getters['art/getEnderecoContratante']
    if (this.enderecoView) {
      this.idEndereco = this.enderecoView.idString
    }
  },
  data () {
    return {
      showLoadingBtn: false,
      title: '',
      titlePessoa: '',
      contratante: null,
      enderecoView: new EnderecoModel(),
      idEndereco: null,
      showing: false,
      showingEndereco: false
    }
  },
  methods: {
    recebePessoa (pessoa) {
      this.contratante = pessoa
      this.buscarEnderecoPessoa()
    },
    async buscarEnderecoPessoa () {
      await this.$axios
        .get('endereco/pessoa/' + this.contratante.codigo)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.enderecoView = response.data.data
            this.$refs.modalConfirmacao.toggle()
          }
        })
    },
    enderecoConfirmado (value) {
      if (value) {
        this.enderecoView.id = value.idString
        this.idEndereco = value.idString
        this.salvaEndereco()
      } else {
        this.enderecoView = new EnderecoModel()
        this.idEndereco = null
      }
    },
    atualizaEndereco (value) {
      if (value) {
        this.enderecoView = Object.assign({}, value)
        this.idEndereco = this.enderecoView.idString
        this.salvaEndereco()
      } else {
        this.enderecoView = new EnderecoModel()
        this.idEndereco = null
        this.excluiEndereco()
      }
    },
    async salvaEndereco () {
      await this.$axios
        .put('art/contratos/endereco-contratante', {idString: this.enderecoView.idString, numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoContratante', this.enderecoView)
        })
    },
    excluiContratante () {
      this.contratante = null
    },
    async excluiEndereco () {
      await this.$axios
        .put('art/contratos/endereco-contratante', {idString: '0', numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoContratante', null)
        })
    },
    prosseguir: _.debounce(function (value) {
      this.showLoadingBtn = true
      this.validaPreenchimentoContratante()
    }, 1000),
    validaPreenchimentoContratante () {
      this.$axios
        .get('art/valida/contratos/preenchimento-contratante/' + this.$store.getters['art/getId'])
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
    }
  }
}
</script>
