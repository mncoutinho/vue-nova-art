<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '45vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">
          Gerar Certidão Empresa
          </q-toolbar-title>
          <q-btn
              flat
              round
              dense
              color="white"
              icon="clear"
              v-close-overlay/>
        </q-toolbar>
            <div class="col-12 layout-padding">
              <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
                <q-card-main>
                  <div class="row justify-center full-height full-width text-center">
                      <div class="col-6" >
                        <q-radio
                          color="secondary"
                          v-model="online"
                          val="1"
                          label="ONLINE" />
                          <info-help tipo="certidaoOnline" />
                      </div>
                      <div class="col-6">
                        <q-radio
                          color="secondary"
                          v-model="online"
                          val="0"
                          label="PRESENCIAL" />
                          <info-help tipo="certidaoPresencial" />
                      </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
      <div class="layout-padding " >
        <div class="row gutter-y-md">
          <mensagem-validacao-certidao ref="msgValida" />
            <div class="col-12">
              <q-select disable class="form-control" v-model="tipo" float-label="Tipo Certidão" :options="selectTipoCertidaoEmpresa"></q-select>
            </div>
            <div v-if="empresaPodeGerarCertidao && online === '1'" class="col-12">
              <select-finalidade-certidao v-if="true" v-model="finalidadeOnline" />
            </div>
            <div v-if="empresaPodeGerarCertidao && online === '1'" class="col-12">
              <q-select :disable="desabilitarListarQuadroTecnico" class="form-control" @input="validaQuadroTecnico()" v-model="listarQuadroTecnico" float-label="Listar Quadro Tecnico" :options="selectOptionsListar"></q-select>
            </div>
            <div v-if="empresaPodeGerarCertidao && online === '1'" class="col-12">
              <q-select :disable="desabilitarListarObjetoSocial" class="form-control" @input="validaObjetoSocial()" v-model="listarObjetoSocial" float-label="Listar Objeto Social" :options="selectOptionsListar"></q-select>
            </div>
            <div class="col-12">
              <q-input
                v-if="online !== '1'"
                float-label="Finalidade"
                style="margin-top: 15px"
                type="textarea"
                rows="3"
                maxlength="4000"
                v-model="finalidadePresencial"
                outline/>
            </div>
            <div class="col-12" v-if="(finalidadePresencial || finalidadeOnline) && empresaPodeGerarCertidao">
              <div class="row justify-center text-center">
                <q-btn @click="getCertidaoRegistro()" rounded class="full-width full-height " color="green" size="sm" icon="fas fa-file-alt" label="Gerar Certidão" />
              </div>
            </div>
          </div>
        </div>
    </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
import { openURL } from 'quasar'
import MensagemValidacaoCertidao from '../../components/partials/mensagem-validacao-certidao'
import InfoHelp from '../info/info-help'
import SelectTipoCertidao from '../../components/selects/select-tipo-certidao'
import SelectFinalidadeCertidao from '../../components/selects/select-finalidade-certidao'
export default {
  components: {
    MensagemValidacaoCertidao,
    SelectTipoCertidao,
    SelectFinalidadeCertidao,
    InfoHelp
  },
  data () {
    return {
      online: '1',
      tipo: '1',
      finalidadeOnline: '',
      finalidadePresencial: '',
      opened: false,
      listarQuadroTecnico: '0',
      listarObjetoSocial: '0',
      desabilitarListarQuadroTecnico: false,
      desabilitarListarObjetoSocial: false,
      empresaPodeGerarCertidao: false,
      idPessoa: this.$store.getters['user/getUserRegistro'],
      selectOptionsListar: [ { label: 'SIM', value: '1' }, { label: 'NÃO', value: '0' } ],
      selectTipoCertidaoEmpresa: [ {value: '1', label: 'REGISTRO'} ]
    }
  },
  methods: {
    toggle () {
      this.validaEmpresaParaCertidaoRegistro()
      this.limparModal()
      this.opened = !this.opened
    },
    validaQuadroTecnico () {
      if (this.listarQuadroTecnico !== '0') {
        this.$axios
          .get('cadastro/certidoes/quadro-tecnico/valida')
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.desabilitarListarQuadroTecnico = true
              this.listarQuadroTecnico = '0'
            } else {

            }
          })
      }
    },
    validaObjetoSocial () {
      if (this.listarObjetoSocial !== '0') {
        this.$axios
          .get('cadastro/certidoes/objeto-social/valida')
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.desabilitarListarObjetoSocial = true
              this.listarObjetoSocial = '0'
            } else {

            }
          })
      }
    },
    validaEmpresaParaCertidaoRegistro () {
      this.$axios
        .get('cadastro/certidoes/empresa-registro/valida')
        .then(response => {
          this.empresaPodeGerarCertidao = true
        })
        .catch(erro => {
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages, true)
          }
        })
    },
    limparModal () {
      this.finalidadeOnline = ''
      this.finalidadePresencial = ''
      this.empresaPodeGerarCertidao = false
      this.desabilitarListarObjetoSocial = false
      this.desabilitarListarQuadroTecnico = false
    },
    getCertidaoRegistro () {
      if (this.online === '1') {
        openURL('http://192.168.1.21:8080/creaOnLine/home/realizarAtendimentoPublico.do?funcao=emissaoCertidao&idRegistro=' + this.idPessoa + '&tipo=' + this.tipo + '&finalidade=' + this.finalidadeOnline + '&listaQT=' + this.listarQuadroTecnico + '&listaObjeto=' + this.listarObjetoSocial)
      } else {
        this.getCertidaoPresencial()
      }
    },
    getCertidaoPresencial () {
      let dto = { finalidade: this.finalidadePresencial, tipoPessoa: this.$store.getters['user/getTipoPessoa'], tipoAssuntoProtocolo: 'CERTIDAO_DE_REGISTRO', enumTipoProtocolo: 'CERTIDAO', idPessoa: this.$store.getters['user/getUserRegistro'], idUnidadeDeAtendimento: 99999 }
      this.$axiosProtocoloApi
        .post('protocolo/certidao', dto, {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
        })
        .then(response => {
          const blob = new Blob([response.data], {
            type: 'application/pdf'
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'premio-' + '.pdf')
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
</script>
<style>
span {
  font-size: 13px;
}
.q-modal{
  touch-action: none
}
</style>
