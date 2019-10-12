<template>
  <q-page class="layout-padding justify-center ">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="ART" icon="library_books" />
        <q-breadcrumbs-el v-if="!this.$store.getters['art/ehModelo']" label="Cadastro" icon="save_alt" />
        <q-breadcrumbs-el v-if="this.$store.getters['art/ehModelo']" label="Modelo ART" icon="fas fa-copy" />
      </q-breadcrumbs>
      <div class="row gutter-y-sm">
        <div class="col-12">
          <spinner :showSpinner="showSpinner"></spinner>
          <br>
          <cabecalho-art v-if="this.$store.getters['art/getNatureza'] && !this.$store.getters['art/ehModelo']" />
          <cabecalho-art-modelo v-if="this.$store.getters['art/ehModelo']" />
          <div class="row justify-end" style="margin-top: 15px; margin-right: 15px;">
            <q-field icon="fas fa-asterisk"
                    icon-color="red-9">
              <span class="text-bg-color-red">campos obrigatórios</span>
            </q-field>
          </div>
          <q-card v-if="!showSpinner">
            <q-card-title class="bg-grey-3" text-color="white">
              <label id="label-view">TIPO DE REGISTRO</label>
            </q-card-title>
            <q-card-main>
              <natureza :natureza="art.natureza" :descricaoModelo="art.descricaoModelo" @atualizouNatureza="atualizouNatureza" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza'] && !this.$store.getters['art/ehReceituarioAgronomico']">
          <q-card>
              <q-card-title class="bg-grey-3" text-color="white">
                <label id="label-view">FORMA DE REGISTRO</label>
             </q-card-title>
              <q-card-main>
               <tipo-art ref="tipoArt" :tipoArt="this.art.tipo" @dadosDoContratoDaComplementarCarregado="dadosDoContratoDaComplementarCarregado" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza'] && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']">
          <q-card color="white" text-color="dark" >
            <q-card-title class="bg-grey-3" text-color="white">
              <label id="label-view">PARTICIPAÇÃO TÉCNICA</label>
            </q-card-title>
            <q-card-main>
              <participacao-tecnica ref="participacaoTecnica" :participacaoTecnica="this.art.participacaoTecnica" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza'] && !this.$store.getters['art/ehReceituarioAgronomico']">
          <q-card color="white" text-color="dark" >
            <q-card-title class="bg-grey-3" text-color="white">
              <label id="label-view">MOTIVO REGISTRO </label>
            </q-card-title>
            <q-card-main>
              <fato-gerador ref="fatorGerador" :fatoGerador="art.fatoGerador" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza']">
          <q-card>
            <q-card-title class="bg-grey-3" text-color="white">
                <label id="label-view">RESPONSÁVEL TÉCNICO</label>
             </q-card-title>
            <q-card-main>
                <contratado :empresa="art.empresa" :profissional="this.art.profissional" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza']">
          <q-card>
            <q-card-title class="bg-grey-3" text-color="white">
               <label  id="label-view" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">VÍNCULO CONTRATUAL</label>
               <label id="label-view" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">DADOS DO CONTRATO</label>
            </q-card-title>
              <q-card-main>
                <contrato ref="contrato" @voltar="voltar" @irParaNatureza="'irParaNatureza'" @atualizaArt="atualizaArt" />
            </q-card-main>
          </q-card>
        </div>
        <div class="col-12" v-if="this.$store.getters['art/getNatureza']">
          <q-card>
            <q-card-title class="bg-grey-3" text-color="white">
              <label id="label-view">ENTIDADE DE CLASSE</label>
            </q-card-title>
            <q-card-main>
              <entidade-classe />
            </q-card-main>
          </q-card>
        </div>
        <mensagem-validacao ref="msgValida" />
      </div>

      <div class="row justify-end" v-if="this.$store.getters['art/getNatureza']">
        <botao v-if="!this.$store.getters['art/ehModelo']"
               :label="'Finalizar Cadastro'"
               :icon="'thumb_up'"
               style="margin-top:40px;"
               @emit="abrirModalMsgFinalizaArt()" />
        <botao v-if="this.$store.getters['art/ehModelo']"
               :label="'Gravar Modelo'"
               :icon="'thumb_up'"
               style="margin-top:40px;"
               @emit="salvaModelo()" />
      </div>
      <br>
    <modal-preview-art ref="modalPreview" />
    <modal-msg-finaliza-art ref="modalMsgFinalizaArt" @validaCalculaFinaliza="validaCalculaFinaliza" />
  </q-page>
</template>

<script>
import Spinner from '../../components/partials/spinner'
import Botao from '../../components/button/botao'
import MensagemValidacao from '../../components/partials/mensagem-validacao'
import CabecalhoArt from '../../components/art/cabecalho-art'
import CabecalhoArtModelo from '../../components/art/cabecalho-art-modelo'
import Natureza from '../../components/art/natureza'
import Contratado from '../../components/art/contratado'
import EntidadeClasse from '../../components/art/entidade-classe'
import TipoArt from '../../components/art/tipoArt'
import ParticipacaoTecnica from '../../components/art/participacao-tecnica'
import FatoGerador from '../../components/art/fatoGerador'
import Contrato from '../../components/contrato/contrato'
import ModalPreviewArt from '../../components/modais/modal-preview-art'
import ModalMsgFinalizaArt from '../../components/modais/modal-msg-finaliza-art'
import _ from 'lodash'
export default {
  props: ['numero'],
  components: {
    Botao,
    CabecalhoArt,
    CabecalhoArtModelo,
    Natureza,
    Contratado,
    EntidadeClasse,
    TipoArt,
    ParticipacaoTecnica,
    FatoGerador,
    Contrato,
    ModalPreviewArt,
    MensagemValidacao,
    ModalMsgFinalizaArt,
    Spinner
  },
  mounted () {
    if (this.$route.path === '/art/novo') {
      this.novoCadastro()
      this.showSpinner = false
      this.$q.notify({icon: 'info',
        message: 'Conforme disposto no artigo 6º da resolução 1025/2009: A guarda da via assinada da ART será de responsabilidade do profissional e do contratante, com o objetivo de documentar o vínculo contratual. A impressão da Art será efetuada somente em duas vias a primeira do profissional e a segunda do contratante.  Nessa nova versão todas as ações de preenchimento do formulário serão salvas automaticamente.  Com essa nova funcionalidade seus dados estarão seguros caso sua internet fique indisponível.',
        color: 'black',
        position: 'bottom-left',
        actions: [{icon: 'clear', handler: () => {}}],
        timeout: 20000})
    }
    if (this.$route.path === '/art/modelo') {
      this.novoCadastro()
      this.$store.commit('art/setModelo', true)
    }
    if (this.$route.path === ('/art/editar/' + this.numero)) {
      this.showSpinner = true
      localStorage.setItem('ART', this.numero)
      this.$store.commit('art/setArt', {numero: this.numero})
      this.getArt(this.numero)
    }
    if (this.$route.path === ('/art/modelo/' + this.numero)) {
      this.showSpinner = true
      localStorage.setItem('ART', this.numero)
      this.$store.commit('art/setArt', {numero: this.numero})
      this.getArt(this.numero)
    }
  },
  data () {
    return {
      showSpinner: '',
      art: { natureza: {} },
      accordionContrato: false
    }
  },
  methods: {
    novoCadastro () {
      localStorage.removeItem('ART')
      this.$store.commit('art/deleteArt')
    },
    voltar () {
      this.accordionContrato = false
      this.$refs.stepperArt.goToStep('fato_gerador')
    },
    getArt (numero) {
      this.$axios
        .get('/art/formulario/' + numero)
        .then(response => {
          this.art = response.data.data
          this.showSpinner = false
          this.$store.commit('art/setArt', this.art)
        })
    },
    async validaCalculaFinaliza () {
      await this.$axios
        .get('art/valida/finalizar/' + this.$store.getters['art/getNumero'])
        .then(response => {
          if (response.data.type === 'INFORMATION') {
            this.$refs.modalMsgFinalizaArt.pararSpinnerBtn()
            this.$q.notify({message: response.data.data, type: 'negative', position: 'center'})
          } else {
            if (this.$store.getters['art/ehMultipla']) {
              if (this.$refs.contrato.getTotalContratos() >= 2) {
                this.calcular()
              } else {
                this.$q.notify({message: 'ART do Tipo Registro (Natureza) Múltipla é necessário ter no mínimo 2 contratos finalizados.', type: 'negative', position: 'center'})
              }
            } else {
              this.calcular()
            }
          }
        })
        .catch(erro => {
          this.$refs.modalMsgFinalizaArt.pararSpinnerBtn()
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    calcular: _.debounce(function (value) {
      let natureza = this.$store.getters['art/getPathFinaliza']
      this.$axios
        .put('art/contratos/finaliza/' + natureza, { numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$axios
            .get('art/valor/' + this.$store.getters['art/getNumero'])
            .then(response => {
              this.$store.commit('art/setValorArt', response.data.data)
              this.finalizar()
            })
        })
        .catch(() => {
          this.$refs.modalMsgFinalizaArt.pararSpinnerBtn()
          this.$q.notify({message: 'Erro finalizar contrato', type: 'negative', position: 'center'})
        })
    }, 1000),
    finalizar () {
      this.$axios
        .put('/art/finalizar/' + this.$store.getters['art/getArt'].numero)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            localStorage.removeItem('ART')
            this.$router.push('/art/finaliza/' + response.data.data.numero + '/' + response.data.data.codigoDivida + '/' + response.data.data.temTaxaDeIncorporacao)
            this.$q.notify({message: 'ART finalizada com sucesso!', timeout: 1500, type: 'positive', position: 'center'})
          }
        })
        .catch(() => {
          this.$q.notify({message: 'Erro finalizar contrato', type: 'negative', position: 'center'})
        })
        .finally(() => {
          this.$refs.modalMsgFinalizaArt.pararSpinnerBtn()
        })
    },
    ehArtEmEdicao () {
      return this.numero !== undefined
    },
    reset () {
      this.art = { natureza: {} }
      this.$store.commit('art/setArt', { contratoArt: { ramoART: {} } })
    },
    atualizaArt () {
      if (localStorage.getItem('ART') !== null) {
        this.getArt(localStorage.getItem('ART'))
      }
    },
    salvaModelo () {
      this.$router.push('/art/modelos/')
      this.$q.notify({message: 'Modelo gravado com sucesso!', timeout: 1500, type: 'positive', position: 'center'})
    },
    atualizouNatureza () {
      if (this.$refs.fatorGerador) {
        this.$store.commit('art/setFatoGerador', null)
        this.$store.commit('art/setDescricaoFatoGerador', null)
        this.$refs.fatorGerador.limparCampos()
        this.$refs.fatorGerador.atualizaSelectFatorGerador()
      }
      if (this.$refs.tipoArt) {
        this.$store.commit('art/setTipo', null)
        this.$store.commit('art/setNumeroArtPrincipal', null)
        this.$refs.tipoArt.limparNumeroArtPrincipal()
        this.$refs.tipoArt.limparIdTipo()
      }
      if (this.$refs.participacaoTecnica) {
        this.$store.commit('art/setParticipacaoTecnica', null)
        this.$store.commit('art/setNumeroArtParticipacaoTecnica', null)
        this.$refs.participacaoTecnica.limparNumeroArtParticipacaoTecnica()
        this.$refs.participacaoTecnica.limparIdTipo()
      }
    },
    abrirModalMsgFinalizaArt () {
      this.$refs.modalMsgFinalizaArt.toggle()
    },
    dadosDoContratoDaComplementarCarregado () {
      this.$refs.contrato.getContratos()
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === '/art/novo') {
        this.reset()
      }
    }
  }
}
</script>
