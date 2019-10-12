<template>
  <div>
    <q-step name="endereco" :title="title">
      <mensagem-validacao ref="msgValida"></mensagem-validacao>
      <q-checkbox v-if="!idEndereco"
                v-model="enderecoContratoIgualDoContratante"
                color="secondary" keep-color
                class="q-mb-sm"
                @input="atualizaEnderecoContratoComDoContratante"
                label="ESTE ENDEREÇO É O MESMO DO CONTRATANTE?" />
      <endereco :idEndereco="idEndereco"
                :tipoEndereco="'CONTRATO'"
                :titulo="'DO CONTRATO'"
                ehArt
                @atualizaEndereco="atualizaEndereco" />
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
import Endereco from '../endereco/endereco'
import EnderecoModel from '../models/Endereco.js'
import MensagemValidacao from '../partials/mensagem-validacao'
import _ from 'lodash'
export default {
  components: {
    Botao,
    Endereco,
    showLoadingBtn: false,
    EnderecoModel,
    MensagemValidacao
  },
  created () {
    this.enderecoView = this.$store.getters['art/getEnderecoContrato']
    if (this.enderecoView) {
      this.idEndereco = this.enderecoView.idString
    }
    if (this.$store.getters['art/ehObraEServico']) {
      this.title = 'ENDEREÇO DA OBRA OU SERVIÇO'
    } else {
      this.title = 'ENDEREÇO'
    }
  },
  data () {
    return {
      showLoadingBtn: false,
      enderecoView: new EnderecoModel(),
      idEndereco: null,
      enderecoContratoIgualDoContratante: false,
      title: ''
    }
  },
  methods: {
    async salvaEndereco () {
      await this.$axios
        .put('art/contratos/endereco-contrato', {idString: this.enderecoView.idString, numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoContrato', this.enderecoView)
        })
    },
    async excluiEndereco () {
      await this.$axios
        .put('art/contratos/endereco-contrato', {idString: '0', numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoContrato', null)
        })
    },
    atualizaEndereco (value) {
      if (value) {
        this.enderecoView = Object.assign({}, value)
        this.idEndereco = this.enderecoView.idString
        this.salvaEndereco()
      } else {
        this.enderecoView = new EnderecoModel()
        this.idEndereco = null
        this.enderecoContratoIgualDoContratante = false
        this.excluiEndereco()
      }
    },
    atualizaEnderecoContratoComDoContratante (value) {
      if (value) {
        this.enderecoView = this.$store.getters['art/getEnderecoContratante']
        this.$axios
          .put('art/contratos/copia-endereco-contratante', {idString: this.enderecoView.idString, numero: this.$store.getters['art/getId'], descricao: 'CONTRATO'})
          .then(response => {
            this.$store.commit('art/setEnderecoContrato', response.data.data)
            this.idEndereco = response.data.data.idString
          })
      }
    },
    prosseguir: _.debounce(function (value) {
      this.showLoadingBtn = true
      this.validaPreenchimentoEnderecoDoContrato()
    }, 1000),
    validaPreenchimentoEnderecoDoContrato () {
      this.$axios
        .get('art/valida/contratos/preenchimento-endereco-contrato/' + this.$store.getters['art/getId'])
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
    mostraEndereco () {
      this.enderecoView = this.$store.getters['art/getEnderecoContrato']
      if (this.enderecoView) {
        this.idEndereco = this.enderecoView.idString
      } else {
        this.idEndereco = null
      }
    }
  }
}
</script>
