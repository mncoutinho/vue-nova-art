<template>
  <div class="index-page  bg-primary window-height window-width column items-center no-wrap">
    <!-- <div class="banner bg-primary flex-center">
    </div> -->
    <div class="card bg-white column no-wrap group"
     style="border-radius: 6px; -webkit-box-sizing: border-box;">
      <div>
        <img src="~assets/logo2.png" style="max-width: 80%; margin-left:35px; height: auto;">
        <span class="row justify-center" style="color: #cc0000; font-size: 18px; font-weight: bold;">{{homologacao}}</span>
        <div v-if="navegadorEhCompativel" class="q-mt-md">
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-radio v-model="tipo" val="PESSOA_FISICA" color="secondary" label="PESSOA FÍSICA" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-radio v-model="tipo" val="PESSOA_JURIDICA" color="amber" label="PESSOA JURÍDICA" style="margin-left: 10px" />
          <q-select v-show="false"
                    float-label="TIPO DE ACESSO"
                    color="primary"
                    class="full-width q-mt-lg"
                    v-model="tipo"
                    :options="[{ value: 'PESSOA_JURIDICA', label: 'PESSOA JURÍDICA' }, { value: 'PESSOA_FISICA', label: 'PESSOA FÍSICA' }]" />

          <q-input  v-if="tipo === 'PESSOA_FISICA'"
                    placeholder="Digite seu CPF"
                    class="full-width q-mt-md"
                    :error="$v.auth.login.$error"
                    v-model="auth.login"
                    v-mask="['###.###.###-##']"
                    float-label="CPF"
                     />
          <q-input  v-if="tipo === 'PESSOA_JURIDICA'"
                    placeholder="Digite seu REGISTRO"
                    class="full-width q-mt-md"
                    :error="$v.auth.login.$error"
                    v-model="auth.login"
                    v-mask="['##########']"
                    float-label="REGISTRO"
                     />

          <q-input  v-show="tipo"
                    float-label="Senha"
                    class="full-width q-mt-md"
                    :error="$v.auth.senha.$error"
                    type="password"
                    v-model="auth.senha"
                    placeholder="Digite sua senha"
                    @keydown="verificaCapsLock"
                    @keyup.enter="autenticar()"
                    />

          <q-chip v-if="capsLockAtivado" class="q-mt-sm" color="amber-9" dense>
            <q-icon name="warning" />
            CAPS LOCK ATIVADO
          </q-chip>
          <q-btn    v-show="tipo"
                    wait-for-ripple label="Acessar"
                    color="primary"
                     size="md"
                    rounded
                    :loading="showLoadingBtn"
                    @click="autenticar()"
                    class="full-width q-mt-lg q-mb-sm"
                    icon="send">
                    <span slot="loading">
                    <q-spinner-facebook class="on-left" />
                    Carregando...
                   </span>
                    </q-btn>
          <vue-recaptcha
                    ref="recaptcha"
                    size="invisible"
                    sitekey="6LfLB3MUAAAAAFfzx1MIAWyayJxuuObGTqSgmQIW"
                    @verify="onCaptchaVerified"
                    @expired="onCaptchaExpired"
          />
          <br>
          <div class="row justify-center q-mt-sm  text-piped">
            <span class="q-mt-sm"><a href="#" @click="esqueciMinhaSenha">Esqueci minha senha</a></span>
            <span v-if="tipo === 'PESSOA_JURIDICA'" class="q-mt-sm"><a href="#" @click="novaEmpresa">Cadastre-se</a></span>
            <!-- <span class="q-mt-sm"><a href="#" @click="novoProfissional">Novo Profissional</a></span> -->
            <span v-if="tipo === 'PESSOA_FISICA'" class="q-mt-sm"><a href="#" @click="primeiroAcessoComRegistro">Cadastre-se</a></span>
          </div>
          <div class="row justify-center gutter-y-sm q-mt-xs text-piped">
            <span class="q-mt-sm"><a href="#" @click="ouvidoria">Ouvidoria</a></span>
            <span class="q-mt-sm"><a href="mailto: atendimento@crea-rj.org.br">Dúvidas</a></span>
          </div>
          <div class="text-center" v-if="false">
            <q-btn color="orange-10" label="Política de Privacidade" @click="$refs.privacy.show()" flat rounded no-caps class="q-mt-sm" />
            <privacy-policy ref="privacy" />
          </div>
        </div>
        <div v-if="!navegadorEhCompativel" class="q-mt-md">
          <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
            <q-card-title class="bg-grey-3" text-color="white">
              <b>ALERTA! Navegador descontinuado pelo fabricante!</b>
            </q-card-title>
            <q-card-main>
              <br/>
              &nbsp;Para sua maior segurança, esta plataforma funciona nos navegadores atualizados, favor atualizar seu navegador. <br/>
              Navegadores compatíveis: <br/> <br/>
              <a href="https://www.google.com/intl/pt-BR/chrome/" target="_blank">Google Chrome </a><br/>
              <a href="https://www.mozilla.org/pt-BR/firefox/new/" target="_blank"> Mozilla Firefox</a> <br/>
              <a href="https://www.microsoft.com/pt-br/windows/microsoft-edge" target="_blank">Microsoft Edge</a> <br/>
              <a href="https://www.opera.com/pt-br/download" target="_blank">Opera</a> <br/>
              <a href="https://support.apple.com/pt_BR/downloads/safari" target="_blank">Safari</a> <br/>
            </q-card-main>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrivacyPolicy from 'components/privacy-policy'
import { required } from 'vuelidate/lib/validators'
import { notify } from '../mixins/mixin-notify'
import { debounce, openURL } from 'quasar'
import VueRecaptcha from 'vue-recaptcha'
import {mask} from 'vue-the-mask'
export default {
  mixins: [notify],
  components: {
    PrivacyPolicy,
    VueRecaptcha
  },
  created () {
    this.tipo = 'PESSOA_FISICA'
  },
  data () {
    return {
      auth: {},
      tipo: null,
      showLoadingBtn: false,
      capsLockAtivado: false,
      homologacao: process.env.AMBIENTE !== 'PROD' ? 'AMBIENTE DE TESTES' : ''
    }
  },
  directives: {mask},
  validations: {
    auth: { senha: { required }, login: { required } }
  },
  methods: {
    autenticar: debounce(function (value) {
      this.$v.auth.$touch()
      if (!this.$v.auth.$error) {
        this.showLoadingBtn = true
        this.$refs.recaptcha.execute()
      } else {
        this.mostrarMensagem('Preencher todos os campos obrigatorios.', 'negative', 1500)
      }
    }, 3000, true),
    esqueciMinhaSenha () {
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/alterarSenha.do?funcao=inicio&esqueci=true')
    },
    novaEmpresa () {
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/cadastrarLoginEmpresa.do?funcao=inicio')
    },
    novoProfissional () {
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/cadastrarLoginProfissional.do?funcao=inicio')
    },
    primeiroAcessoComRegistro () {
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/cadastrarLoginProfissional.do?funcao=inicio')
    },
    primeiroAcessoSemRegistro () {
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/cadastrarLoginLeigo.do?funcao=inicio')
    },
    ouvidoria () {
      openURL('https://novoportal.crea-rj.org.br/ouvi/')
    },
    onCaptchaVerified: function (recaptchaToken) {
      this.$refs.recaptcha.reset()
      let credentials = {
        tipo: this.tipo,
        login: this.auth.login.replace(/\./g, '').replace(/-/g, '').replace(/\//g, ''),
        senha: this.auth.senha,
        recaptchaToken: recaptchaToken
      }
      this.$axios
        .post('corporativo/login/cpf-registro-security', credentials)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            localStorage.setItem('TOKEN', response.data.data.token)
            this.$store.commit('user/setUser', response.data.data)
            localStorage.removeItem('ART')
            this.$store.commit('art/deleteArt')
            this.$router.push('/')
          } else
          if (response.data.type === 'INFORMATION') {
            response.data.messages.forEach(mensagem => {
              this.mostrarMensagem(mensagem, 'negative', 3000)
            })
          }
        }).catch(erro => {
          if (erro.response !== undefined) {
            erro.response.data.messages.forEach(mensagem => {
              this.mostrarMensagem(mensagem, 'negative', 1500)
            })
          }
        })
        .finally(() => {
          this.showLoadingBtn = false
        })
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset()
    },
    verificaCapsLock (value) {
      if (value.keyCode >= 65 && value.keyCode <= 90) {
        if (value.shiftKey) {
          if (!(value.key.toUpperCase() === value.key && value.key.toLowerCase() !== value.key)) {
            this.capsLockAtivado = true
            return true
          }
        } else {
          if (!(value.key.toUpperCase() !== value.key && value.key.toLowerCase() === value.key)) {
            this.capsLockAtivado = true
            return true
          }
        }
      }
      this.capsLockAtivado = false
      return false
    }
  },
  computed: {
    navegadorEhCompativel: {
      get () {
        return !this.$q.platform.is.ie
      }
    }
  }
}
</script>

<style lang="stylus">
.index-page
  .banner
    height 25vh
    width 100%
    font-size 15vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .card
    max-width 450px
    padding 20px 40px
    margin-top 80px
    border-radius 2px

</style>
