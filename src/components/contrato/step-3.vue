<template>
  <div>
    <q-step name="proprietario" :title="title">
      <mensagem-validacao ref="msgValida" />
      <q-checkbox
                  v-model="contratanteEhOProprietario"
                  label="CONTRATANTE É O PROPRIETÁRIO"
                  color="secondary" keep-color
                  @input="atualizaContratanteEhOProprietario" />
      <div class="row" v-if="!proprietario">
        <div class="col-11">
          <busca-pessoa titulo="Adicionar Proprietário"
                        tipoPessoa="proprietario"
                        class="q-mt-md"
                        @edita="recebePessoa" />
        </div>
        <div class="col-1">
          <info-help style="margin-top:15px" v-model="showing" tipo="proprietario" />
        </div>
      </div>
      <view-proprietario v-if="proprietario"
                         @excluiProprietario="excluiProprietario" />
      <div class="row" v-if="idEndereco === null">
        <div class="col-11">
          <endereco class="q-mt-md"
                    :idEndereco="idEndereco"
                    :tipoEndereco="'PROPRIETARIO'"
                    :titulo="'DO PROPRIETÁRIO'"
                    ehArt
                    @atualizaEndereco="atualizaEndereco" />
        </div>
        <div class="col-1">
          <info-help style="margin-top:15px" v-model="showingEndereco" tipo="enderecoProprietario" />
        </div>
      </div>
      <endereco v-if="idEndereco !== null"
                class="q-mt-md"
                :idEndereco="idEndereco"
                :tipoEndereco="'PROPRIETARIO'"
                :titulo="'DO PROPRIETÁRIO'"
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
import BuscaPessoa from '../pessoa/busca-pessoa'
import Endereco from '../endereco/endereco'
import EnderecoModel from '../models/Endereco.js'
import ViewProprietario from './view-proprietario'
import MensagemValidacao from '../partials/mensagem-validacao'
import InfoHelp from '../info/info-help'
import _ from 'lodash'
export default {
  components: {
    Botao,
    BuscaPessoa,
    ViewProprietario,
    Endereco,
    EnderecoModel,
    InfoHelp,
    MensagemValidacao
  },
  created () {
    this.proprietario = this.$store.getters['art/getIdPessoaProprietario']
    this.enderecoView = this.$store.getters['art/getEnderecoProprietario']
    if (this.enderecoView) {
      this.idEndereco = this.enderecoView.idString
    }
    if (this.$store.getters['art/ehObraEServico']) {
      this.title = 'PROPRIETÁRIO DA OBRA OU SERVIÇO'
    } else {
      this.title = 'PROPRIETÁRIO'
    }
  },
  data () {
    return {
      showLoadingBtn: false,
      proprietario: null,
      contratanteEhOProprietario: false,
      enderecoView: new EnderecoModel(),
      idEndereco: null,
      title: '',
      showing: false,
      showingEndereco: false
    }
  },
  methods: {
    recebePessoa (value) {
      this.proprietario = value
    },
    atualizaContratanteEhOProprietario (value) {
      // enviar idStringEndereco, criar novo endereco (recurso copia endereco), e com a nova fk atualizar o proprietario
      if (value) {
        let idProprietario = this.$store.getters['art/getIdPessoaContratante']
        this.$axios
          .put('art/contratos/proprietario', {checked: true, codigo: idProprietario, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setProprietario', { codigo: idProprietario, nome: this.$store.getters['art/getNomeContratante'], cpfOuCnpj: this.$store.getters['art/getCpfOuCnpjContratante'] })
            this.proprietario = response.data.data
            let enderecoContratante = this.$store.getters['art/getEnderecoContratante']
            this.copiaEnderecoDoContratante(enderecoContratante.idString)
          })
      }
    },
    atualizaEndereco (value) {
      if (value) {
        this.enderecoView = Object.assign({}, value)
        this.idEndereco = this.enderecoView.idString
        this.salvaEndereco(this.idEndereco)
      } else {
        this.enderecoView = new EnderecoModel()
        this.idEndereco = null
        this.excluiEndereco()
      }
    },
    async salvaEndereco (idEndereco) {
      this.idEndereco = idEndereco
      await this.$axios
        .put('art/contratos/endereco-proprietario', {idString: idEndereco, numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoProprietario', this.enderecoView)
        })
    },
    async copiaEnderecoDoContratante (idEndereco) {
      this.idEndereco = idEndereco
      await this.$axios
        .put('art/contratos/copia-endereco-contratante', {idString: idEndereco, numero: this.$store.getters['art/getId'], descricao: 'PROPRIETARIO'})
        .then(response => {
          this.$store.commit('art/setEnderecoProprietario', response.data.data)
          this.idEndereco = response.data.data.idString
        })
    },
    excluiProprietario () {
      this.proprietario = null
      this.contratanteEhOProprietario = false
    },
    async excluiEndereco () {
      await this.$axios
        .put('art/contratos/endereco-proprietario', {idString: '0', numero: this.$store.getters['art/getId']})
        .then(response => {
          this.$store.commit('art/setEnderecoProprietario', null)
        })
    },
    prosseguir: _.debounce(function (value) {
      this.showLoadingBtn = true
      this.validaPreenchimentoProprietario()
    }, 1000),
    validaPreenchimentoProprietario () {
      this.$axios
        .get('art/valida/contratos/preenchimento-proprietario/' + this.$store.getters['art/getId'])
        .then(response => {
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
