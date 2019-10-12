<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '65vw', minHeight: '85vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">Cadastrar Ocorrência</q-toolbar-title>
          <q-btn
                flat
                round
                dense
                color="white"
                icon="clear"
                v-close-overlay/>
        </q-toolbar>
        <div class="row gutter-x-sm" style="padding: 35px">
           <q-field icon="fas fa-asterisk"
             icon-color="red-9">
             <div class="col-12">
               <div class="row">
                <q-datetime
                  type="date"
                  v-model="form.dataAtendimento"
                  format="DD/MM/YYYY"
                  stack-label="Data da Ocorrência:"
                  :error="$v.form.dataAtendimento.$error"
                  color="secondary"/>
               </div>
             </div>
           </q-field>
        </div>
        <div class="row gutter-x-sm" style="padding: 35px">
          <div class="col-6">
            <select-demanda
              :error="$v.form.tipoDemanda.$error"
              v-model="form.tipoDemanda"/>
          </div>
          <div class="col-6">
              <q-input
                float-label="Número do Protocolo:"
                v-model="form.protocolo.id"
                @blur="this.validaProtocolo"
                outline/>
            </div>
        </div>
        <div class="row gutter-x-sm gutter-y-sm" style="padding: 35px">
          <div class="col-6">
            <select-assunto
              :error="$v.form.assuntoGeral.$error"
              v-model="form.assuntoGeral"
              />
          </div>
          <div class="col-6">
            <select-especifico
              :assuntosGerais="form.assuntoGeral.id"
              v-model="form.assuntoEspecifico"
              />
          </div>
        </div>
        <div class="row gutter-x-sm" style="padding: 35px">
          <div class="col-8">
            <q-field icon="fas fa-asterisk"
          icon-color="red-9">
            <q-input
                float-label="Descrição:"
                type="textarea"
                rows="5"
                maxlength="4000"
                v-model="form.descricao"
                :error="$v.form.descricao.$error"/>
            </q-field>
          </div>
          <div class="col-4">
                 <span class="text-bg-color-red">Arquivos PDF: tamanho máximo de 2MB</span>
              <upload
              :arquivo="this.form.arquivo"
              :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 2111111}"
              color="yellow-4"
              @salvaArquivo="salvaArquivo"
              @deletarArquivo="deletarArquivo"
              ref="upload"/>
          </div>
        </div>
        <div class="row justify-end" style=" padding: 35px">
          <q-btn
              rounded
              color="primary"
              icon="save"
              size="sm"
              label="Salvar Ocorrência"
              @click="submit"
              :loading="loading"/>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Upload from 'components/input/input-upload'
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
      SelectDemanda,
      SelectAssunto,
      SelectEspecifico,
      loading: false,
      opened: false,
      protocoloExistOrIsNull: true,
      form: {
        tipoDemanda: {},
        assuntoGeral: {},
        assuntoEspecifico: {},
        protocolo: { id: Number },
        pessoa: { id: this.$store.getters['user/getUserRegistro'] },
        arquivo: { id: '', nomeOriginal: '', uri: '', modulo: 'INSTITUICAO', privado: true },
        descricao: String
      }
    }
  },
  validations: {
    form: {
      dataAtendimento: {required},
      tipoDemanda: {required},
      assuntoGeral: {required},
      descricao: {required}
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Por favor, preencha todos os campos obrigatórios!')
      } if (!this.protocoloExistOrIsNull) {
        this.$q.notify('Número de protocolo inserido não existe!')
      } else {
        this.$axios
          .post('atendimento/ouvidoria', this.form)
          .then(response => {
            this.$q.notify({ message: response.data.messages[0], type: response.data.type === 'SUCCESS' ? 'positive' : 'negative' })
            this.toggle()
          })
        this.$emit('atualizaListaGrid')
        this.limpaCampos()
      }
    },
    async salvaArquivo (arquivo) {
      this.form.arquivo = arquivo.data
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
      this.$v.$reset()
      this.loading = false
      this.opened = !this.opened
      this.limpaCampos()
    },
    limpaCampos () {
      this.protocoloExistOrIsNull = true
      this.form = {
        dataAtendimento: '',
        tipoDemanda: '',
        assuntoGeral: '',
        assuntoEspecifico: '',
        arquivo: { id: '', nomeOriginal: '', uri: '', modulo: 'INSTITUICAO', privado: true },
        protocolo: {
          id: null
        },
        descricao: '',
        pessoa: {
          id: this.$store.getters['user/getUserRegistro']
        }
      }
    }
  }
}
</script>
