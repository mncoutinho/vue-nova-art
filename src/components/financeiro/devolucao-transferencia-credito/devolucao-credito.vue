<template>
  <div>
    <q-select float-label="Natureza"
              color="secondary"
              filter
              filter-placeholder="Filtro"
              v-model="dto.idNatureza"
              :options="listNatureza"
              @blur="$v.dto.idNatureza.$touch"
              :error="$v.dto.idNatureza.$error" />
    <q-input v-model="dto.nossoNumero"
              color="secondary"
              float-label="Boleto - Nosso Número"
              maxlength="25"
              @blur="$v.dto.nossoNumero.$touch"
              :error="$v.dto.nossoNumero.$error" />
    <q-input v-model="dto.motivo"
                color="secondary"
                float-label="Motivo"
                maxlength="50"
                @blur="$v.dto.motivo.$touch"
                :error="$v.dto.motivo.$error" />
    <q-input v-model="dto.email"
             color="secondary"
             float-label="Email"
             maxlength="50"
             @blur="$v.dto.email.$touch"
             :error="$v.dto.email.$error" />
    <q-input v-model="dto.valorRestituicao"
             color="secondary"
             float-label="Valor Restituição"
             maxlength="10"
             @blur="$v.dto.valorRestituicao.$touch"
             :error="$v.dto.valorRestituicao.$error" />
    <q-option-group class="q-mt-md"
                    color="secondary"
                    type="radio"
                    inline
                    v-model="dto.favorecidoEhOProprio"
                    :options="[
                      { label: 'FAVORECIDO É O PRÓPRIO', value: 1, color: 'green' },
                      { label: 'FAVORECIDO NÃO É O PRÓPRIO', value: 2, color: 'negative' }
                    ]" />
        <div class="row gutter-x-sm">
          <div class="col-5">
            <q-input v-model="dto.cpfCnpjFavorecido"
                     :disable="dto.favorecidoEhOProprio === 1"
                     color="secondary"
                     float-label="CPF/CNPJ Favorecido"
                     maxlength="50" />
          </div>
          <div class="col-7">
            <q-input v-model="dto.nomeFavorecido"
                    :disable="dto.favorecidoEhOProprio === 1"
                    color="secondary"
                    float-label="Nome do Favorecido"
                    maxlength="50" />
          </div>
        </div>
    <div class="row gutter-x-sm">
      <div class="col-5">
        <q-select float-label="Banco"
                  color="secondary"
                  filter
                  filter-placeholder="Filtro"
                  v-model="dto.idBanco"
                  :options="listBanco"
                  @blur="$v.dto.idBanco.$touch"
                  :error="$v.dto.idBanco.$error" />
      </div>
      <div class="col-3">
        <q-input v-model="dto.agencia"
                 color="secondary"
                 float-label="Agência"
                 maxlength="5"
                 @blur="$v.dto.agencia.$touch"
                :error="$v.dto.agencia.$error" />
      </div>
      <div class="col-4">
        <q-input v-model="dto.conta"
                 color="secondary"
                 float-label="Conta"
                 maxlength="12"
                 @blur="$v.dto.conta.$touch"
                 :error="$v.dto.conta.$error" />
      </div>
    </div>
    <botao class="full-width"
           :label="'Solicitar Devolução'"
           :icon="'thumb_up'"
           style="margin-top:40px;"
           @emit="validaSolicitacao()" />
    <mensagem-validacao class="q-mt-md" ref="msgValida" />
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../../mixins/mixin-notify'
import Botao from '../../button/botao'
import { openURL } from 'quasar'
import MensagemValidacao from '../../partials/mensagem-validacao'
export default {
  mixins: [notify],
  components: {
    Botao,
    MensagemValidacao
  },
  created () {
    this.getNaturezas()
    this.getBancos()
    this.$v.$reset()
  },
  data () {
    return {
      listNatureza: [],
      listBanco: [],
      dto: {
        idNatureza: null,
        nossoNumero: null,
        devolucaoTransferencia: 'dev',
        motivo: null,
        favorecidoEhOProprio: 1,
        idPessoa: this.$store.getters['user/getUserRegistro'],
        cpfCnpjFavorecido: this.$store.getters['user/getUserCpfOuCnpj'],
        nomeFavorecido: this.$store.getters['user/getUserNome'],
        idBanco: null,
        agencia: null,
        conta: null,
        email: null,
        valorRestituicao: null
      }
    }
  },
  validations: {
    dto: {
      idNatureza: { required },
      devolucaoTransferencia: { required },
      nossoNumero: { required },
      motivo: { required },
      idBanco: { required },
      agencia: { required },
      conta: { required },
      email: { required },
      valorRestituicao: { required }
    }
  },
  methods: {
    getNaturezas () {
      let listTemp = []
      this.$axios
        .get('financeiro/natureza-devolucao')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listNatureza = listTemp
        })
    },
    getBancos () {
      let listTemp = []
      this.$axios
        .get('financeiro/bancos')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.codigo + ' - ' + el.nome})
          })
          this.listBanco = listTemp
        })
    },
    validaSolicitacao () {
      if (this.dto.favorecidoEhOProprio === 1 && (this.dto.nomeFavorecido === null || this.dto.nomeFavorecido === '' || this.dto.cpfCnpjFavorecido === null || this.dto.cpfCnpjFavorecido === '')) {
        this.mostrarMensagem('Preencha os dados do favorecido.', 'negative')
      } else {
        this.$v.dto.$touch()
        if (this.$v.dto.$error) {
          this.mostrarMensagem('Preencha os campos obrigatórios.', 'negative')
        } else {
          this.$axios
            .post('financeiro/valida-devolucao', { idPessoa: this.$store.getters['user/getUserRegistro'], tipoPessoa: this.$store.getters['user/getTipoPessoa'], nossoNumero: this.dto.nossoNumero, cpfOuCnpj: this.$store.getters['user/getUserCpfOuCnpj'] })
            .then(response => {
              this.solicita()
            })
            .catch(erro => {
              if (erro.response.data) {
                this.$refs.msgValida.toggle(erro.response.data.messages)
              } else {
                this.$refs.msgValida.toggle(erro.response.messages)
              }
            })
        }
      }
    },
    solicita () {
      let parametros = '&favorecido=' + this.dto.favorecidoEhOProprio + '&nome=' + this.dto.nomeFavorecido + '&cpfcnpj=' + this.dto.cpfCnpjFavorecido + '&natureza=' + this.dto.idNatureza + '&idRegistro=' + this.dto.idPessoa + '&nossonumero=' + this.dto.nossoNumero + '&banco=' + this.dto.idBanco + '&agencia=' + this.dto.agencia + '&conta=' + this.dto.conta + '&motivo=' + this.dto.motivo + '&valor=' + this.dto.valorRestituicao + '&email=' + this.dto.email
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=devolucaoTransferencia' + parametros)
    }
  }
}
</script>
