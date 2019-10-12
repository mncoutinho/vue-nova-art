<template>
  <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '75vh'}">
    <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center" >
            Atividades - {{tipo === 'EDICAO' ? 'Editar' : 'Incluir'}}
        </q-toolbar-title>
        <q-btn flat
              round
              dense
              color="white"
              icon="clear"
              v-close-overlay />
      </q-toolbar>
      <div class="layout-padding overflow-hidden">
        <mensagem-validacao ref="msgValida" />
        <div class="row gutter-x-sm gutter-y-sm">
          <div class="col-xs-12 col-sm-6">
            <label>Data início do contrato:</label>
            <br>
            <span v-if="contrato">{{contrato.dataInicioFormatada}}</span>
          </div>
          <div class="col-xs-12 col-sm-6">
            <label>Data previsão de término do contrato:</label>
            <br>
            <span v-if="contrato">{{contrato.dataFimFormatada}}</span>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input type="date"
              v-model="livro.dataInicioDaEtapa"
              stack-label="Data Início"
              color="secondary"
              @blur="$v.livro.dataInicioDaEtapa.$touch"
              :error="$v.livro.dataInicioDaEtapa.$error" />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input type="date"
              v-model="livro.dataConclusao"
              stack-label="Data Conclusão"
              color="secondary" />
          </div>
          <div class="col-xs-6 col-sm-6">
            <q-field :count="500">
              <q-input v-model="livro.relatoVisitaResponsavelTecnico"
                  rows="2"
                  float-label="Relato Visita"
                  type="textarea"
                  maxlength="500"
                  @blur="$v.livro.relatoVisitaResponsavelTecnico.$touch"
                  :error="$v.livro.relatoVisitaResponsavelTecnico.$error" />
            </q-field>
          </div>
          <div class="col-xs-6 col-sm-6">
            <q-field :count="500">
              <q-input v-model="livro.orientacao"
                  float-label="Orientação"
                  rows="2"
                  type="textarea"
                  maxlength="500" />
            </q-field>
          </div>
          <div class="col-xs-6 col-sm-6">
            <q-field :count="500">
              <q-input v-model="livro.acidentesDanosMateriais"
                  float-label="Acidentes / Dano Materiais"
                  rows="2"
                  type="textarea"
                  maxlength="500" />
            </q-field>
          </div>
          <div class="col-xs-6 col-sm-6">
             <q-field>
              <q-input :disable="true"
                  v-model="livro.periodosInterrupcaoEMotivos"
                  float-label="Interrupções e Motivos"
                  title="Só é possível registrar interrupções após o registro de baixa da ART"
                  type="textarea"
                  maxlength="500"
                  rows="2"
                  />
            </q-field>
          </div>
          <div class="col-xs-6 col-sm-6">
            <q-field :count="500">
                <q-input v-model="livro.outrosFatosEObservacoes"
                    float-label="Observações e Outros Fatos"
                    rows="2"
                    type="textarea"
                    maxlength="500" />
              </q-field>
          </div>
          <div class="col-xs-6 col-sm-6">
            <upload ref="uploadArquivo"
                  class="q-mt-md"
                  tamanho="M"
                  :arquivo="livro.arquivo"
                  :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 10111111 }"
                  label="Faça o upload aqui!"
                  color="yellow-2"
                  @salvaArquivo="salvaArquivo"
                  @deletarArquivo="deletarArquivo" />
          </div>
          <div class="col-xs-12 col-sm-12">
         <busca-pessoa v-if="livro.nomeContratado === null" @edita="recebePessoa" titulo="Adicionar Contratado ou Subcontratado"/>
              <div v-show="true">
                <q-input v-if="livro.nomeContratado !== null" v-model="livro.nomeContratado" readonly float-label="" :after="[{ icon: 'fas fa-eraser', handler () { apagarPessoa() } }]"/>
              </div>
          </div>
        </div>
        <br>
        <br>
        <div class="row justify-end" >
            <q-btn style="margin-top:40px;"
                  size="md" :loading="showLoandingBtn"
                  rounded flat color="dark" icon="save"
                  :label="tipo === 'EDICAO' ? 'Atualizar atividade' : 'Salvar Atividade no Livro de ordem'"
                  @click="atualiza" />
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import BuscaPessoa from '../pessoa/busca-pessoa'
import Upload from '../input/input-upload'
import LivroOrdem from '../models/LivroOrdem'
import { dialog } from '../../mixins/mixin-dialog'
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../mixins/mixin-notify'
import MensagemValidacao from '../partials/mensagem-validacao'
export default {
  mixins: [dialog, notify],
  props: ['numeroArt'],
  components: {
    BuscaPessoa,
    Upload,
    MensagemValidacao
  },
  data () {
    return {
      showLoandingBtn: false,
      opened: false,
      tipo: null,
      livro: new LivroOrdem(this.numeroArt),
      contrato: null
    }
  },
  validations: {
    livro: {
      dataInicioDaEtapa: { required },
      relatoVisitaResponsavelTecnico: { required }
    }
  },
  methods: {
    toggle (livro, tipo) {
      this.opened = !this.opened
      if (!this.opened) {
        this.$emit('atualizaGrid')
      } else {
        this.tipo = tipo
        this.numeroArt = livro.numeroArt
        this.livro.numeroArt = livro.numeroArt
        if (livro.numeroArt) {
          this.getContrato()
          this.$refs.msgValida.fechar()
        }
        if (tipo === 'EDICAO') {
          this.livro = livro
          this.livro.dataInicioDaEtapa = livro.dataInicioDaEtapaFormatadaInput
          this.livro.dataConclusao = livro.dataConclusaoFormatadaInput
          delete livro.__index
          if (livro.arquivo === null) {
            this.livro.arquivo = { id: null, uri: '', nomeOriginal: '', modulo: 'ART', privado: true }
          }
        } else {
          this.limpaCampos()
        }
      }
    },
    atualiza () {
      this.showLoandingBtn = true
      this.$v.livro.$touch()
      if (this.$v.livro.$error) {
        this.showLoandingBtn = false
        this.mostrarMensagem('Preencha os campos obrigatórios.', 'negative')
      } else {
        if (this.tipo === 'EDICAO') {
          this.editaLivro()
        } else {
          this.incluiLivro()
        }
      }
    },
    async incluiLivro () {
      await this.$axios
        .post('art/livro-ordem', this.livro)
        .then(response => {
          this.showLoandingBtn = false
          this.$refs.msgValida.fechar()
          this.toggle()
        })
        .catch(erro => {
          this.showLoandingBtn = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    async editaLivro () {
      await this.$axios
        .put('art/livro-ordem', this.livro)
        .then(response => {
          this.showLoandingBtn = false
          this.$refs.msgValida.fechar()
          this.toggle()
        })
        .catch(erro => {
          this.showLoandingBtn = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    recebePessoa (pessoa) {
      if (pessoa.nome === undefined) {
        this.livro.nomeContratado = pessoa.value
        this.livro.idPessoa = pessoa.id
      } else {
        this.livro.nomeContratado = pessoa.nome
        this.livro.idPessoa = pessoa.id
      }
    },
    apagarPessoa () {
      this.livro.idPessoa = null
      this.livro.nomeContratado = null
    },
    limpaCampos () {
      this.livro = new LivroOrdem(this.numeroArt)
      this.$v.$reset()
    },
    salvaArquivo (value) {
      this.livro.arquivo.id = value.data.id
    },
    async deletarArquivo () {
      if (this.tipo === 'EDICAO') {
        if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o arquivo ?')) {
          this.$axios
            .delete('art/livro-ordem/arquivo/' + this.livro.arquivo.id)
            .then(response => {
              this.$refs.uploadArquivo.deletarFisicamente(this.livro.arquivo.id)
              this.arquivo = { id: '', uri: '', nomeOriginal: '', modulo: 'ART', privado: true }
            })
        }
      } else {
        this.$refs.uploadArquivo.deletarFisicamente(this.livro.arquivo.id)
      }
    },
    async getContrato () {
      await this.$axios
        .get('art/contratos/detalhado/' + this.numeroArt + '-1')
        .then(response => {
          this.contrato = response.data.data
        })
    }
  }
}
</script>
