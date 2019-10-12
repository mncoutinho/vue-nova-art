<template>
  <div>
    <q-select
        float-label="Natureza"
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
    <botao class="full-width"
            :label="'Solicitar Transferência'"
            :icon="'thumb_up'"
            style="margin-top:40px;"
            @emit="validaSolicitacao()" />
    <mensagem-validacao class="q-mt-md" ref="msgValida" />
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../../mixins/mixin-notify'
import { openURL } from 'quasar'
import Botao from '../../button/botao'
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
        idBanco: null,
        nossoNumero: null,
        devolucaoTransferencia: 'tranf',
        favorecidoEhOProprio: 3,
        idPessoa: this.$store.getters['user/getUserRegistro'],
        cpfCnpjFavorecido: this.$store.getters['user/getUserCpfOuCnpj'],
        nomeFavorecido: this.$store.getters['user/getUserNome'],
        agencia: null,
        conta: null,
        valorRestituicao: null,
        email: null,
        motivo: null
      }
    }
  },
  validations: {
    dto: {
      idNatureza: { required },
      devolucaoTransferencia: { required },
      nossoNumero: { required },
      motivo: { required },
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
    },
    solicita () {
      let parametros = '&favorecido=' + this.dto.favorecidoEhOProprio + '&natureza=' + this.dto.idNatureza + '&idRegistro=' + this.dto.idPessoa + '&nossonumero=' + this.dto.nossoNumero + '&motivo=' + this.dto.motivo + '&valor=' + this.dto.valorRestituicao + '&email=' + this.dto.email
      openURL(process.env.URL_LEGADO + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=devolucaoTransferencia' + parametros)
    }
  }
}
</script>
