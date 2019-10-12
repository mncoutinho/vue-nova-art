<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Fale Conosco" icon="fas fa-headset" />
    </q-breadcrumbs>
    <br>
      <div>
      <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
        <q-card-main>
            Sugestões, opiniões ou dúvidas podem ser encaminhadas pelo formulário abaixo. Sua mensagem será recebida por e-mail e respondida pela equipe do Crea-RJ.
            Sua resposta será enviada para o e-mail: &nbsp;&nbsp;<strong>{{this.emailDestinatario}}</strong>
        </q-card-main>
      </q-card>
      <br>
      <div class="row gutter-x-sm gutter-y-sm">
        <div class="col-12">
           <select-motivo v-model="dto.issue.tracker_id" :error="dto.issue.tracker_id === 0"/>
        </div>
        <br>
        <div class="col-12">
            <q-input v-model="dto.issue.subject"
                float-label="Assunto"
                 color="dark"
                 :error="$v.dto.issue.subject.$error"
            />
        </div>
        <div class="col-12">
            <q-input v-model="dto.issue.description"
                float-label="Escreva aqui sua mensagem"
                type="textarea"
                 rows="5"
                :error="$v.dto.issue.description.$error"
                maxlength="1000"
            />
        </div>
        <div class="col-12 justify-end">
          <botao :label="'Enviar'"
                 :icon="'send'"
                 :size="'md'"
                 :loading="showLoadingBtn"
                 class="full-width q-mt-lg q-mb-sm"
                 @emit="enviar()" />
        </div>
       </div>
    </div>
  </q-page>
</template>
<script>
import Botao from '../components/button/botao'
import SelectMotivo from 'components/selects/select-fale-conosco'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    Botao,
    SelectMotivo
  },
  created () {
    this.emailDestinatario = this.getEmail()
  },
  data () {
    return {
      showLoadingBtn: false,
      emailDestinatario: '',
      dto: {
        issue: {
          project_id: 18,
          subject: '',
          description: '',
          tracker_id: 0
        }
      }
    }
  },
  validations: {
    dto: {
      issue: {
        tracker_id: { required },
        subject: { required },
        description: { required }
      }
    }
  },
  methods: {
    async getEmail () {
      await this.$axios
        .get('commons/email/pessoa/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          let dto = response.data.data[0]
          if (dto !== undefined) {
            this.emailDestinatario = dto.descricao
          }
        })
    },
    async enviar () {
      this.$v.$touch()
      this.showLoadingBtn = true
      if (this.$v.dto.$error || this.dto.issue.tracker_id === 0) {
        this.$q.notify({ message: 'Preencha os campos obrigatórios!', type: 'negative', position: 'center', timeout: 1000 })
        this.showLoadingBtn = false
      } else {
        this.dto.issue.subject = 'CREAONLINE - ' + this.dto.issue.subject
        await this.$axios
          .post('/commons/redmine', this.dto)
          .then(response => {
            this.showLoadingBtn = false
            this.$q.notify({ message: 'Mensagem enviada com sucesso!', type: 'positive', position: 'center', timeout: 1000 })
            this.dto.issue.subject = ''
            this.dto.issue.description = ''
            this.dto.issue.tracker_id = 0
            this.$v.$reset()
          })
      }
    }
  }
}
</script>
