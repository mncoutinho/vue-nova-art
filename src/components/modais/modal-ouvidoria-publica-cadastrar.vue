<template>
    <q-modal v-model="opened" :content-css="{minWidth: '45vw', minHeight: '50vh'}">
        <q-modal-layout>
            <q-toolbar slot="header" text-color="white" color="primary">
                <q-toolbar-title align="center">Cadastar Ocorrência</q-toolbar-title>
                <q-btn flat round dense color="white" icon="clear" v-close-overlay/>
            </q-toolbar>
            <div class="q-pa-md">
                <q-stepper v-model="step" ref="stepper" contracted color="primary" animated>
                    <q-step :name="1" title="Pessoa" icon="person" :done="step > 1" disable>
                        <div class="col-6" style="padding: 35px">
                            <q-input
                              outline
                              float-label="CPF/CNPJ"
                              v-model="pessoa.cpfOuCnpj"
                              :error="$v.pessoa.cpfOuCnpj.$error" />
                            <q-input
                              outline
                              v-if="!ehPessoaComRegistro"
                              float-label="NOME"
                              v-model="pessoa.nome"
                              :error="$v.pessoa.nome.$error" />
                            <q-input
                              outline
                              v-if="!ehPessoaComRegistro"
                              float-label="E-MAIL"
                              v-model="pessoa.email"
                              :error="$v.pessoa.email.$error" />
                            <br>
                            <q-btn rounded color="primary" icon="search" size="sm" label="PESQUISAR" @click="verificaEhPessoaComRegistro" :loading="loading" />
                        </div>
                    </q-step>
                    <q-step :name="2" title="Ocorrência" icon="record_voice_over" :done="step > 2" disable>
                        <div class="row gutter-x-sm gutter-y-sm" style="padding: 35px">
                            <div class="col-12">
                                <q-card-title>
                                    Nome: {{this.pessoa.nome}}
                                    <br>
                                </q-card-title>
                                <q-card-title>
                                    E-mail: {{this.pessoa.email}}
                                </q-card-title>
                            </div>
                            <q-field style="margin-top: 20px" icon="fas fa-asterisk" icon-color="red-9" />
                            <q-datetime disable class="col-5" type="date" v-model="form.dataAtendimento" format="DD/MM/YYYY" style="margin-top: 15px" float-label="Data da Ocorrência:" :error="$v.form.dataAtendimento.$error" color="secondary" />
                            <div class="col-6">
                                <select-demanda :error="$v.form.tipoDemanda.$error" v-model="form.tipoDemanda" />
                            </div>
                        </div>
                        <div class="row gutter-x-sm gutter-y-sm" style="padding: 35px">
                            <div class="col-6">
                                <select-assunto :error="$v.form.assuntoGeral.$error" v-model="form.assuntoGeral" />
                            </div>
                            <div class="col-6">
                                <select-especifico :assuntosGerais="form.assuntoGeral.id" v-model="form.assuntoEspecifico" />
                            </div>
                        </div>
                        <div class="row gutter-x-sm gutter-y-sm" style="padding: 35px">
                            <div class="col-6">
                                <q-input float-label="Número do Protocolo:" v-model="form.protocolo.id" @blur="this.validaProtocolo" outline/>
                            </div>
                        </div>
                        <div class="row gutter-x-sm" style="padding: 35px">
                            <q-field style="margin-top: 20px;width: 7%;" icon="fas fa-asterisk" icon-color="red-9" />
                            <q-input
                              style="width: 90%"
                              float-label="Descrição:"
                              type="textarea"
                              rows="5"
                              maxlength="4000"
                              v-model="form.descricao"
                              :error="$v.form.descricao.$error" />
                        </div>
                        <div class="row justify-end" style=" padding: 35px">
                            <q-btn
                              rounded
                              color="primary"
                              icon="save"
                              size="sm"
                              label="CADASTRAR"
                              @click="submit"
                              :loading="loading" />
                        </div>
                    </q-step>
                    <q-step :name="3" title="Anexar Arquivo" icon="fas fa-file" disable>
                        <q-card-title>
                            Número da Ocorrência: {{this.form.id}}
                            <br>
                        </q-card-title>
                        <q-card-title>
                            Deseja anexar algum arquivo na ocorrência?
                        </q-card-title>

                        <div class="col-6">
                            <span class="text-bg-color-red">Arquivos PDF: tamanho máximo de 4MB</span>
                            <upload
                              :arquivo="this.form.arquivo"
                              :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 4000000 }"
                              color="yellow-4" @salvaArquivo="anexaArquivoOcorrencia"
                              @deletarArquivo="deletarArquivo" ref="upload" />
                        </div>
                        <div class="row justify-end q-mt-sm">
                            <q-btn @click="toggle()" color="primary" v-if="step === 3" :label="'Finalizar'" />
                        </div>
                    </q-step>
                </q-stepper>
            </div>
        </q-modal-layout>
    </q-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Upload from 'components/input/input-upload-ouvidoria-publica'
import Arquivo from '../../components/models/arquivo'
import SelectDemanda from 'components/selects/select-ouvidoria-demanda'
import SelectAssunto from 'components/selects/select-ouvidoria-assunto'
import SelectEspecifico from 'components/selects/select-ouvidoria-assunto-especifico'
import { notify } from '../../mixins/mixin-notify'
import { dialog } from '../../mixins/mixin-dialog'
export default {
  mixins: [notify, dialog],
  components: {
    SelectDemanda,
    SelectAssunto,
    SelectEspecifico,
    Upload
  },
  data () {
    return {
      step: 1,
      SelectDemanda,
      SelectAssunto,
      SelectEspecifico,
      loading: false,
      opened: false,
      protocoloExistOrIsNull: true,
      ehPessoaComRegistro: true,
      ehLeigoCadastrado: false,
      form: {
        id: '',
        dataAtendimento: new Date(),
        tipoDemanda: {},
        assuntoGeral: {},
        assuntoEspecifico: {},
        descricao: '',
        protocolo: { id: null },
        arquivo: { id: null, nomeOriginal: '', uri: '', modulo: 'ART', privado: false },
        pessoa: { id: null }
      },
      pessoa: {
        cpfOuCnpj: '',
        nome: '',
        email: ''
      }
    }
  },
  validations: {
    form: {
      dataAtendimento: {required},
      tipoDemanda: {required},
      assuntoGeral: {required},
      assuntoEspecifico: {required},
      descricao: {required}
    },
    pessoa: {
      cpfOuCnpj: {required},
      nome: {required},
      email: {required}
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.ehLeigoCadastrado && this.$v.pessoa.$error) {
        this.$q.notify('Por favor, preencha todos os dados da pessoa!')
      } else if (this.$v.form.$error) {
        this.$q.notify('Por favor, preencha todos os campos obrigatórios!')
      } else if (!this.protocoloExistOrIsNull) {
        this.$q.notify('Número de protocolo inserido não existe!')
      } else {
        if (!this.ehLeigoCadastrado) {
          this.cadastraLeigo()
        }
        this.cadastraOuvidoria()
      }
    },
    cadastraLeigo () {
      let pessoaDto = { tipoPessoa: '', cpfOuCnpj: this.pessoa.cpfOuCnpj, nome: this.pessoa.nome, email: this.pessoa.email }
      if (this.pessoa.cpfOuCnpj.length === 11) {
        pessoaDto.tipoPessoa = 'LEIGOPF'
      } else if (this.pessoa.cpfOuCnpj.length === 14) {
        pessoaDto.tipoPessoa = 'LEIGOPJ'
      }
      this.form.pessoa.id = this.pessoa.id
      if (!this.ehLeigoCadastrado) {
        this.$axios
          .post('pessoa/leigo', pessoaDto)
          .then(response => {
            this.$q.notify({ message: 'Pessoa cadastrada com sucesso!', type: 'positive' })
          })
      }
    },
    cadastraOuvidoria () {
      this.$axios
        .post('atendimento/ouvidoria', this.form)
        .then(response => {
          this.$q.notify({ message: response.data.messages[0], type: response.data.type === 'SUCCESS' ? 'positive' : 'negative' })
          if (response.data.type === 'SUCCESS') {
            this.$q.notify({ message: 'Número da ocorrência: ' + response.data.data.id, type: 'positive' })
            this.limpaCampos()
            this.form.id = response.data.data.id
            this.passaParaProximoStep()
          }
        })
    },
    async anexaArquivoOcorrencia (arquivo) {
      console.log('Salvou arquivo')
      this.form.arquivo.id = arquivo.data.id
      this.$axios
        .post('atendimento/ouvidoria/arquivo', this.form)
        .then(response => {
          this.$q.notify({ message: 'Arquivo anexado com sucesso!', type: 'positive' })
          this.toggle()
        })
    },
    async deletarArquivo (arquivo) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o arquivo ?')) {
        this.$refs.upload.deletarFisicamente(arquivo.id)
        this.form.arquivo = new Arquivo()
        arquivo = new Arquivo()
      }
    },
    validaIdProtocolo () {
      if (this.form.protocolo.id === '') {
        this.form.protocolo.id = null
      }
    },
    validaProtocolo () {
      this.validaIdProtocolo()
      if (this.form.protocolo.id !== null) {
        this.$v.form.protocolo.id.$touch()
        if (this.$v.form.protocolo.$error) {
          this.$q.notify('Número de protocolo inserido inválido!')
          this.form.protocolo.id = null
        } else {
          this.existProtocolo()
        }
      } else {
        this.protocoloExistOrIsNull = true
      }
    },
    existProtocolo () {
      this.$axios.get('protocolo/existe/' + this.form.protocolo.id).then(response => {
        if (response.data.type === 'SUCCESS') {
          this.protocoloExistOrIsNull = true
        } else {
          this.protocoloExistOrIsNull = false
        }
      })
    },
    toggle () {
      this.step = 1
      this.$v.$reset()
      this.loading = false
      this.opened = !this.opened
      this.limpaCampos()
    },
    limpaCampos () {
      this.protocoloExistOrIsNull = true
      this.pessoa = {
        cpfOuCnpj: '',
        nome: '',
        email: ''
      }
      this.ehPessoaComRegistro = true
      this.ehLeigoCadastrado = false
      this.form = {
        id: '',
        dataAtendimento: new Date(),
        tipoDemanda: {},
        assuntoGeral: {},
        assuntoEspecifico: {},
        descricao: '',
        protocolo: { id: null },
        arquivo: { id: null, nomeOriginal: '', uri: '', modulo: 'ART', privado: false },
        pessoa: { id: null }
      }
    },
    verificaEhPessoaComRegistro () {
      if (this.pessoa.cpfOuCnpj.length === 11) {
        this.$axios.get('cadastro/profissional/consulta-por-cpf/' + this.pessoa.cpfOuCnpj).then(response => {
          this.$router.push('/login')
          this.$q.notify({ message: 'Essa pessoa possui cadastro, acesse a ouvidoria interna', type: response.data.type === 'SUCCESS' ? 'positive' : 'negative' })
        }).catch(() => {
          this.ehPessoaComRegistro = false
          this.verificaLeigoCadastrado()
        })
      } else if (this.pessoa.cpfOuCnpj.length === 14) {
        this.$axios.get('cadastro/empresa/consulta-por-cnpj/' + this.pessoa.cpfOuCnpj).then(response => {
          this.$router.push('/login')
          this.$q.notify({ message: 'Essa empresa possui cadastro, acesse a ouvidoria interna', type: response.data.type === 'SUCCESS' ? 'positive' : 'negative' })
        }).catch(() => {
          this.ehPessoaComRegistro = false
          this.verificaLeigoCadastrado()
        })
      } else {
        this.$q.notify({ message: 'CPF/CNPJ inválido!', type: 'negative' })
      }
    },
    async verificaLeigoCadastrado () {
      console.log('verifica leigo')
      if (this.pessoa.cpfOuCnpj.length === 11) {
        await this.$axios.get('pessoa/leigopf/' + this.pessoa.cpfOuCnpj).then(response => {
          this.pessoa = response.data.data
          this.ehLeigoCadastrado = true
        })
      } else {
        await this.$axios.get('pessoa/leigopj/' + this.pessoa.cpfOuCnpj).then(response => {
          this.pessoa = response.data.data
          this.ehLeigoCadastrado = true
        })
      }
      if (this.pessoaTemTodosOsCampos) {
        this.passaParaProximoStep()
      }
    },
    pessoaTemTodosOsCampos () {
      if (this.$v.pessoa.$error) {
        return false
      }
      return true
    },
    passaParaProximoStep () {
      this.step++
    }
  }
}
</script>
