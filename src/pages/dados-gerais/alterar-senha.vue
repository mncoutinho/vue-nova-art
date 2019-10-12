<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Dados Gerais" icon="account_box" />
      <q-breadcrumbs-el  label="Alteração de senha" icon="fas fa-unlock-alt" />
    </q-breadcrumbs>
    <br>
    <q-card class="q-mt-md">
      <q-card-main>
        <br/>
        <div class="row gutter-x-lg">
          <div class="col-6">
            <q-field
                :error="$v.form.senha.$error"
                error-label="">
              <q-input
                type="password"
                float-label="Sua senha atual"
                color="white"
                inverted-light
                @blur="$v.form.senha.$touch()"
                :error="$v.form.senha.$error"
                v-model.trim="form.senha"/>
            </q-field>
            <br/>
            <q-field
                :error="$v.form.novaSenha.$error"
                error-label="">
              <q-input
                float-label="Nova Senha"
                color="white"
                inverted-light
                type="password"
                v-model.trim="form.novaSenha"
                @input="alterarBarraDeProgresso"
                @blur="$v.form.novaSenha.$touch()"
                :error="$v.form.novaSenha.$error" />
            </q-field>
            <br/>
            <q-progress :percentage="barraProgresso.progress" stripe animate :color="barraProgresso.color" />
            <br/>
              <q-field
                :error="$v.form.repetirSenha.$error"
                error-label="">
                <q-input
                float-label="Repetir Senha"
                color="white"
                inverted-light
                type="password"
                @blur="$v.form.repetirSenha.$touch()"
                :error="$v.form.repetirSenha.$error"
                v-model.trim="form.repetirSenha"/>
              </q-field>
            <br/>
            <q-btn
                icon="fas fa-unlock-alt"
                class="full-width"
                size="sm"
                rounded
                :loading="showLoadingBtn"
                @click="validaFormAlterarSenha()"
                color="primary"
                label="Alterar Senha" />
          </div>
          <div class="col-6">
            <q-card class="q-ma" color="grey-2" text-color="grey-9" >
              <q-card-title>
                Alterar Senha
              </q-card-title>
              <q-card-main>
                    <div class="row col-12">
                        <div style="padding:2px 7px;">
                            <q-icon name="done" v-if="validacoesSenha[0].foiValidado" color="positive" size="13px" />&nbsp;<span >{{validacoesSenha[0].mensagemErro}}</span><br/>
                            <q-icon name="done" v-if="validacoesSenha[1].foiValidado" color="positive" size="13px" />&nbsp;<span >{{validacoesSenha[1].mensagemErro}}</span><br/>
                            <q-icon name="done" v-if="validacoesSenha[2].foiValidado" color="positive" size="13px" />&nbsp;<span >{{validacoesSenha[2].mensagemErro}}</span><br/>
                            <q-icon name="done" v-if="validacoesSenha[3].foiValidado" color="positive" size="13px" />&nbsp;<span >{{validacoesSenha[3].mensagemErro}}</span>
                        </div>
                    </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      showLoadingBtn: false,
      barraProgresso: {
        progress: 0,
        color: 'positive'
      },
      form: {
        novaSenha: '', senha: '', repetirSenha: '' },
      validacoesSenha: [ { foiValidado: false, mensagemErro: 'A senha digitada deve ter no minímo oito caracteres' },
        { foiValidado: false, mensagemErro: 'Uma letra minúscula' },
        { foiValidado: false, mensagemErro: 'Um número' },
        { foiValidado: false, mensagemErro: 'Uma letra maiúscula' } ]
    }
  },
  validations: {
    form: {
      repetirSenha: {
        required,
        sameAsPassword: sameAs('novaSenha')
      },
      senha: { required },
      novaSenha: {
        required,
        goodPassword: (password) => {
          return password.length >= 8 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[0-9]/.test(password)
        }
      }
    }
  },
  methods: {
    validaFormAlterarSenha () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify({ message: 'Preencher todos os campos obrigatórios.', icon: 'warning', color: 'red-7', position: 'center', timeout: 2000 })
      } else {
        this.alterarSenha()
      }
    },
    alterarSenha () {
      this.showLoadingBtn = true
      this.form.login = this.$store.getters['user/getUserRegistro']
      delete this.form.repetirSenha
      this.$axios
        .post('corporativo/auth/alterar-senha', this.form)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.limparCampos()
            this.$v.form.$reset()
            this.showLoadingBtn = false
            this.$q.notify({ message: 'A senha foi alterada com sucesso.', color: 'positive', position: 'center', timeout: 2000 })
          } else {
            this.showLoadingBtn = false
            this.$q.notify({ message: response.data.messages[0], icon: 'warning', color: 'red-7', position: 'center', timeout: 2000 })
          }
        })
    },
    limparCampos () {
      this.form.senha = ''
      this.form.repetirSenha = ''
      this.form.novaSenha = ''
    },
    alterarBarraDeProgresso () {
      this.barraProgresso.progress = 0
      this.validacoesSenha[0].foiValidado = false
      this.validacoesSenha[1].foiValidado = false
      this.validacoesSenha[2].foiValidado = false
      this.validacoesSenha[3].foiValidado = false
      this.barraProgresso.color = 'negative'
      if (this.form.novaSenha.length >= 8) {
        this.barraProgresso.progress = this.barraProgresso.progress + 25
        this.barraProgresso.color = 'negative'
        this.validacoesSenha[0].foiValidado = true
      }
      if (this.temUmaLetraMaiscula()) {
        this.barraProgresso.progress = this.barraProgresso.progress + 25
        this.barraProgresso.color = 'warning'
        this.validacoesSenha[3].foiValidado = true
      }
      if (this.temUmaLetraMinuscula()) {
        this.barraProgresso.progress = this.barraProgresso.progress + 25
        this.barraProgresso.color = 'warning'
        this.validacoesSenha[1].foiValidado = true
      }
      if (this.temAlgumNumero()) {
        this.barraProgresso.progress = this.barraProgresso.progress + 25
        this.barraProgresso.color = 'warning'
        this.validacoesSenha[2].foiValidado = true
      }
      if (this.cumpreTodasRegras(this.form.novaSenha)) {
        this.barraProgresso.progress = 100
        this.barraProgresso.color = 'positive'
      }
    },
    temUmaLetraMaiscula () {
      return /[A-Z]/.test(this.form.novaSenha)
    },
    temUmaLetraMinuscula () {
      return /[a-z]/.test(this.form.novaSenha)
    },
    temAlgumNumero () {
      return /[0-9]/.test(this.form.novaSenha)
    },
    cumpreTodasRegras (senha) {
      return senha.length >= 8 &&
          /[a-z]/.test(senha) &&
          /[A-Z]/.test(senha) &&
          /[0-9]/.test(senha)
    }
  }
}
</script>

<style>
.q-if-error .q-if-label {
  color:#EF5250;
}
.q-field-with-error .row .q-input{
 border-color: #EF5250;
}
.q-if-inverted .q-input-target{
  color:#424242;
}
.q-if-focused:not(.q-if-readonly) .q-if-label{
  color:#424242;
}
.q-if-focused:not(.q-if-readonly) .q-if-control{
  color:#424242;
}

.q-if-inverted-light .q-if-label, .q-if-inverted-light .q-if-addon, .q-if-inverted-light .q-if-control{
  color: black;
}

.q-if-inverted .q-input-target {
    color: black;
}
</style>
<style scoped>
.bg-negative{
  background: var(--q-color-white) !important;
}
.q-if-inverted .q-input-target {
    color: black;
}

.q-if-inverted-light .q-if-label, .q-if-inverted-light .q-if-addon, .q-if-inverted-light .q-if-control{
  color: black;
}
.q-input{
  border-style: solid;
  border-width: 0.5px;
  border-color: #b8babc;
  border-width: 0.5px;
  border-radius: 5px;
  box-shadow: none;
  height: 50px;
}

</style>
