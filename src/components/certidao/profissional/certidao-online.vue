<template>
  <div class="row gutter-y-md">
    <mensagem-validacao-certidao ref="msgValida" />
      <div class="col-12">
        <select-tipo-certidao @validacoes="validacoes" v-model="tipo" />
      </div>
      <div class="col-12">
        <select-finalidade-certidao v-if="pessoaPodeGerarCertidao" v-model="finalidade" />
      </div>
      <div class="col-12" v-if="pessoaPodeGerarCertidao && tipo === '4'">
        <q-table
              ref="table"
              color="secondary"
              class="no-border-grid"
              row-key="id"
              :data="listEmpresas"
              :columns="columnsEmpresas"
              :loading="loadingTableEmpresa"
              selection="multiple"
              :selected.sync="selectedEmpresas"
              :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
              no-data-label = "Nenhuma empresa para exibir."
              no-results-label="Nenhuma empresa para exibir.">
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td auto-width>
              <q-checkbox color="primary" v-model="props.selected" />
            </q-td>
            <q-td key="nome" :props="props">
              <small class="text-italic">{{ props.row.nome }}</small>
            </q-td>
          </q-tr>
        </q-table>
      </div>
      <div class="col-12" v-if="pessoaPodeGerarCertidao && tipo === '8'">
        <q-table
              ref="table"
              color="secondary"
              class="no-border-grid"
              row-key="numero"
              :data="listArts"
              :columns="columnsArts"
              :loading="loadingTableArt"
              selection="multiple"
              :selected.sync="selectedArts"
              rows-per-page-label="ARTs por página:"
              :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
              no-data-label = "Nenhuma art para exibir."
              no-results-label="Nenhuma art para exibir." >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td auto-width>
              <q-checkbox color="primary" v-model="props.selected" />
            </q-td>
            <q-td key="numero" :props="props">
              <small class="text-italic">{{ props.row.numero }}</small>
            </q-td>
            <q-td key="dataCadastroFormatada" :props="props">
              <small class="text-italic">{{ props.row.dataCadastroFormatada }}</small>
            </q-td>
            <q-td key="acaoDetalhar" :props="props">
              <q-btn @click.native="$refs.modalPreview.toggle(props.row)" rounded color="green" size="sm" label="Detalhar" />
            </q-td>
          </q-tr>
        </q-table>
      </div>
      <div class="col-12">
        <div class="row justify-center text-center">
          <q-btn
            v-if="( ( (this.tipo === '1' || this.tipo === '2') && this.finalidade) || (this.tipo === '4' && this.finalidade && this.selectedEmpresas.length) || (this.tipo === '8' && this.finalidade && this.selectedArts.length) )"
            rounded
            @click="validaCamposParaEnvio()"
            class="full-width full-height"
            color="green"
            size="sm"
            icon="fas fa-file-alt"
            label="Gerar Certidão" />
        </div>
      </div>
      <modal-preview-art ref="modalPreview" />
    </div>
</template>
<script>
import ModalPreviewArt from '../../modais/modal-preview-art'
import { openURL } from 'quasar'
import MensagemValidacaoCertidao from '../../partials/mensagem-validacao-certidao'
import SelectTipoCertidao from '../../selects/select-tipo-certidao'
import SelectFinalidadeCertidao from '../../selects/select-finalidade-certidao'
export default {
  props: ['listEmpresas', 'listArts'],
  components: {
    ModalPreviewArt,
    MensagemValidacaoCertidao,
    SelectTipoCertidao,
    SelectFinalidadeCertidao
  },
  mounted () {
  },
  data () {
    return {
      loadingTableArt: false,
      loadingTableEmpresa: false,
      stringComIdsParaEnviarLegado: '',
      selectedEmpresas: [ ],
      selectedArts: [ ],
      columnsEmpresas: [
        { name: 'nome', align: 'center', label: 'NOME', field: row => row.nome, sortable: true }
      ],
      columnsArts: [
        { name: 'numero', align: 'center', label: 'CODIGO', field: row => row.numero, sortable: true },
        { name: 'dataCadastroFormatada', align: 'center', label: 'DATA', field: row => row.dataCadastroFormatada, sortable: true },
        { name: 'acaoDetalhar', label: '', field: 'acaoDetalhar' }
      ],
      tipo: '',
      finalidade: '',
      pessoaPodeGerarCertidao: false
    }
  },
  methods: {
    validacoes (value) {
      this.tipo = value
      if (this.tipo === '1') {
        this.validaParaCertidaoRegistro()
      } else if (this.tipo === '2') {
        this.validaParaCertidaoAtribuicoes()
      } else {
        this.pessoaPodeGerarCertidao = true
      }
    },
    validaParaCertidaoRegistro () {
      this.$axios
        .get('cadastro/certidoes/registro/valida')
        .then(response => {
          this.pessoaPodeGerarCertidao = true
        })
        .catch(erro => {
          if (erro.response.data) {
            this.pessoaPodeGerarCertidao = false
            this.$refs.msgValida.toggle(erro.response.data.messages, true)
          }
        })
    },
    validaParaCertidaoAtribuicoes () {
      this.$axios
        .get('cadastro/certidoes/atribuicoes/valida')
        .then(response => {
          this.pessoaPodeGerarCertidao = true
        })
        .catch(erro => {
          this.pessoaPodeGerarCertidao = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages, true)
          }
        })
    },
    validaCamposParaEnvio () {
      if (this.finalidade && this.pessoaPodeGerarCertidao) {
        if (this.tipo === '4') {
          if (this.selectedArts.legth > 0) {
            this.gerarCertidao()
          }
        } else if (this.tipo === '8') {
          if (this.selectedEmpresas.legth > 0) {
            this.gerarCertidao()
          }
        } else {
          this.gerarCertidao()
        }
      }
    },
    gerarCertidao () {
      if (this.tipo === '1' || this.tipo === '2') {
        this.getCertidaoRegistroEAtribuicoes()
      } else if (this.tipo === '4') {
        this.getListIdString(this.selected, 'empresas')
      } else {
        this.getListIdString(this.selectedArts, 'arts')
      }
    },
    getCertidaoRegistroEAtribuicoes () {
      openURL('http://192.168.1.21:8080/creaOnLine/home/realizarAtendimentoPublico.do?funcao=emissaoCertidao&idRegistro=' + this.$store.getters['user/getUserRegistro'] + '&tipo=' + this.tipo + '&finalidade=' + this.finalidade)
    },
    getCertidaoCurriculoEAcervoTecnico () {
      openURL('http://192.168.1.21:8080/creaOnLine/home/realizarAtendimentoPublico.do?funcao=emissaoCertidao&idRegistro=' + this.$store.getters['user/getUserRegistro'] + '&tipo=' + this.tipo + '&finalidade=' + this.finalidade + '&lista=' + this.stringComIdsParaEnviarLegado)
    },
    getListIdString (lista, tipo) {
      if (tipo === 'empresa') {
        lista = lista.map(({ idString }) => idString)
      } else {
        lista = lista.map(({ numero }) => numero)
      }
      this.stringComIdsParaEnviarLegado = lista.join(',')
      this.getCertidaoCurriculoEAcervoTecnico()
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
