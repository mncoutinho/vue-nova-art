<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Serviços" icon="fas fa-toolbox" />
      <q-breadcrumbs-el label="Carteira" icon="far fa-id-card" />
      <q-breadcrumbs-el label="Solicitação de 2ª Via de Carteira" icon="far fa-id-card" />
    </q-breadcrumbs>
    <q-card class="q-mt-md">
      <q-card-main>
        <label id="label-view">Confirmação de Dados de Contato e PIS/PASEP</label> <br/><br/>
        <label id="internal-label">ENDEREÇO POSTAL:</label> <span id="span-view" v-if="dadosProfissional.pessoa && dadosProfissional.pessoa.enderecoPostal"> {{dadosProfissional.pessoa.enderecoPostal.enderecoCompleto}}</span><br/>
        <label id="internal-label">TELEFONE:</label>
        <span v-if="dadosProfissional.pessoa">
          <span id="span-view" v-for="tel in dadosProfissional.pessoa.telefones" :key="tel.codigo">
            ({{tel.ddd}}) - {{tel.numero}}
          </span>
        </span>
        <br/>
        <div class="row gutter-x-sm">
          <input-email v-if="dadosProfissional.pessoa" :idPessoa="dadosProfissional.pessoa.id" />
          <input-pis-pasep v-if="dadosProfissional" />
        </div>
        <span><b>Obs:</b></span>
        <span id="span-view"> Para atualizar o endereço e telefone, acesse o submenu &nbsp;
          <q-btn label="Dados Cadastrais"
                color="blue-9" rounded size="xs" outline dense
                @click="$router.push('/dados-gerais/dados-cadastrais')" />
          &nbsp; no Menu Dados Gerais.
        </span>
      </q-card-main>
    </q-card>
    <div class="row gutter-x-md justify-end q-mt-md">
      <div class="col-8">
        <q-select float-label="Local de Entrega"
                  filter filter-placeholder="Filtro"
                  color="secondary" class="q-mt-sm"
                  v-model="unidadeEscolhida"
                  :options="unidadesAtendimento" />
      </div>
     <div class="col-4 q-mt-sm">
        <botao v-if="unidadeEscolhida"
              v-bind="{label: 'Gerar Solicitação', icon: 'thumb_up'}"
              class="q-mt-lg"
              @emit="validaSolicitacaoSegundaVia(unidadeEscolhida)" />
      </div>
    </div>
     <mensagem-validacao ref="msgValida" />
    <modal-carteira-confirma-solicitacao ref="modalConfirmacao" />
  </q-page>
</template>
<script>
import Botao from '../../../components/button/botao'
import { notify } from '../../../mixins/mixin-notify'
import MensagemValidacao from '../../../components/partials/mensagem-validacao'
import InputEmail from '../../../components/input/input-email'
import InputPisPasep from '../../../components/input/input-pis-pasep'
import ModalCarteiraConfirmaSolicitacao from '../../../components/modais/modal-carteira-confirma-solicitacao'
export default {
  components: { Botao, ModalCarteiraConfirmaSolicitacao, MensagemValidacao, InputEmail, InputPisPasep },
  mixins: [notify],
  created () {
    this.getDadosDeContato()
    this.getUnidadesAtendimentoAtivas()
  },
  data () {
    return {
      dadosProfissional: {},
      pisPasep: null,
      unidadesAtendimento: [],
      unidadeEscolhida: null
    }
  },
  methods: {
    getDadosDeContato () {
      if (this.$store.getters['user/getUserRegistro'] !== undefined) {
        this.$axios
          .get('pessoa/fisica/detalhar/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.dadosProfissional = response.data.data[0]
          })
      }
    },
    getUnidadesAtendimentoAtivas () {
      let listTemp = []
      this.$axios
        .get('cadastro/adm-unidades-atendimento')
        .then(response => {
          response.data.data.forEach(function (el) {
            if (el.nome === 'SEDE CREA-RJ') {
              listTemp.unshift({value: { id: el.id, nome: el.nome }, label: el.nome})
            } else {
              listTemp.push({value: { id: el.id, nome: el.nome }, label: el.nome})
            }
          })
          this.unidadesAtendimento = listTemp
        })
    },
    validaSolicitacaoSegundaVia (unidadeEscolhida) {
      this.$axios
        .get('cadastro/profissional/carteira/valida-solicitacao/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          this.$refs.modalConfirmacao.toggle(unidadeEscolhida)
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
}
</script>
