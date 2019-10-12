<template>
  <div class="row gutter-y-md">
    <mensagem-validacao-certidao ref="msgValida" />
      <div class="col-12">
        <select-tipo-certidao
          @validacoes="validacoes"
          v-model="tipo" />
      </div>
      <div class="col-12">
        <q-select
          class="form-control"
          v-if="pessoaPodeGerarCertidao && tipo === '8'"
          v-model="certidaoForm.temAtestado"
          float-label="Com Atestado"
          :options="selectTemAtestado">
        </q-select>
      </div>
      <div class="col-12">
        <q-input
          v-if="pessoaPodeGerarCertidao"
          float-label="Finalidade"
          style="margin-top: 15px"
          type="textarea"
          rows="3"
          maxlength="4000"
          v-model="finalidade"
          outline/>
      </div>
      <div class="col-12" v-if="pessoaPodeGerarCertidao && tipo === '4'">
        <q-table
              ref="table"
              color="secondary"
              class="no-border-grid"
              row-key="id"
              :data="listEmpresas"
              :columns="columnsEmpresas"
              :loading="loading"
              selection="multiple"
              :selected.sync="certidaoForm.selectedEmpresas"
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
              :loading="loading"
              selection="multiple"
              :selected.sync="certidaoForm.selectedArts"
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
            rounded
            v-if="( ( (this.tipo === '1' || this.tipo === '2') && this.finalidade) || (this.tipo === '4' && this.finalidade && this.certidaoForm.selectedEmpresas.length) || (this.tipo === '8' && this.finalidade && this.certidaoForm.selectedArts.length && this.certidaoForm.temAtestado !== '') )"
            @click="gerarCertidao()"
            class="full-width full-height "
            color="green"
            size="sm"
            icon="fas fa-file-alt"
            label="Gerar Requerimento" />
        </div>
      </div>
    </div>
</template>
<script>
import CertidaoProtocolo from '../../models/CertidaoProtocolo'
import ModalPreviewArt from '../../modais/modal-preview-art'
import MensagemValidacaoCertidao from '../../partials/mensagem-validacao-certidao'
import SelectTipoCertidao from '../../selects/select-tipo-certidao'
export default {
  props: ['listEmpresas', 'listArts'],
  components: {
    CertidaoProtocolo,
    ModalPreviewArt,
    MensagemValidacaoCertidao,
    SelectTipoCertidao
  },
  mounted () {
  },
  data () {
    return {
      tipo: '',
      finalidade: '',
      loading: false,
      selectTemAtestado:
      [
        { label: 'SIM', value: true },
        { label: 'NÃO', value: false }
      ],
      columnsEmpresas:
      [
        { name: 'nome', align: 'center', label: 'NOME', field: row => row.nome, sortable: true }
      ],
      columnsArts:
      [
        { name: 'numero', align: 'center', label: 'CODIGO', field: row => row.numero, sortable: true },
        { name: 'dataCadastroFormatada', align: 'center', label: 'DATA', field: row => row.dataCadastroFormatada, sortable: true },
        { name: 'acaoDetalhar', label: '', field: 'acaoDetalhar' }
      ],
      certidao: {},
      certidaoForm: {
        selectedEmpresas: [],
        selectedArts: [],
        temAtestado: '',
        idPessoa: this.$store.getters['user/getUserRegistro'],
        tipoPessoa: this.$store.getters['user/getTipoPessoa']
      },
      pessoaPodeGerarCertidao: false
    }
  },
  methods: {
    validacoes (value) {
      this.limpaCampos()
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
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages, true)
          }
        })
    },
    gerarCertidao () {
      this.certidao = new CertidaoProtocolo(this.certidaoForm, this.tipo, this.finalidade)
      this.$axiosProtocoloApi
        .post('protocolo/certidao', this.certidao, {
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
          link.setAttribute('download', 'Requerimento' + '.pdf')
          document.body.appendChild(link)
          link.click()
          this.limparForm()
        })
    },
    limparForm () {
      this.tipo = ''
      this.limpaCampos()
      this.$emit('toggle')
    },
    limpaCampos () {
      this.finalidade = ''
      this.certidaoForm.selectedArts = []
      this.certidaoForm.selectedEmpresas = []
      this.certidaoForm.temAtestado = ''
      this.pessoaPodeGerarCertidao = false
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
