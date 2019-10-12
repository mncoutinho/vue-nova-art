<template>
  <div>
    <q-page padding class="docs-table">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="SERVIÇOS" icon="fas fa-toolbox" />
        <q-breadcrumbs-el label="Consultar Protocolo" icon="search" />
      </q-breadcrumbs>
      <div class="overflow-hidden">
          <div class = "row" style="width: 800px; max-width: 90vw; margin-top:20px;">
              <div class="col-10">
                <q-option-group
                  type="radio"
                  @input="getProtocolos"
                  inline
                  class="full-width "
                  color="secondary"
                  v-model="opcaoFiltro"
                  :options="[
                    { label: 'Número Protocolo', value: 'numeroProtocolo', color: 'grey-7' },
                    { label: 'Número Processo', value: 'numeroProcesso', color: 'grey-7' },
                    { label: 'Buscar Todos', value: 'buscarTodosProtocolos', color: 'grey-7' },
                    { label: 'Buscar Todos - Protocolo Cointeressado', value: 'buscarTodosProtocolosNaoRequerente', color: 'grey-7' }
                  ]"
                />

              </div>
              <div  class="col-2">
                <info-help v-model="showHelp" tipo="buscarTodosProtocolosNaoRequerente" />
              </div>
          </div>
          <div class="row gutter-x-xl" style="margin-top:25px;">
            <div class="col-6" >
              <q-input
                  v-show="opcaoFiltro === 'numeroProtocolo'"
                  @input="getProtocoloPorNumeroProtocolo"
                  v-model="pesquisa.numeroProtocolo"
                  float-label="Número do Protocolo"
                  :loading="loading"
                  style="margin-top: 18px;">
              </q-input>
              <q-input
                  @input="getProtocoloPorNumeroProcesso"
                  float-label="Número do Processo:"
                  v-show="opcaoFiltro === 'numeroProcesso'"
                  v-model="pesquisa.processo"
                  :loading="loading"
                  style="margin-top: 18px;">
              </q-input>
            </div>
          </div>
    </div>
    <br>
      <grid-vazio v-if="!listaProtocolos.length" />
      <q-table
        :loading = loading
        class="no-border-grid"
        :pagination.sync="serverPagination"
        @request="request"
        :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
        rows-per-page-label="Protocolos por página:"
        v-if="listaProtocolos.length > 0"
        ref="table"
        color="primary"
        row-key="numero"
        :data="listaProtocolos"
        :columns="protocolos"
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="acoes" :props="props">
          <q-btn flat rounded size="sm" color="blue-10" @click="$refs.modalDetalharProtocolo.toggle(props.row)" icon="visibility" label="Detalhar"/>
        </q-td>
        <q-td key="numeroProtocolo" :props="props">
         <small>{{ props.row.numeroProtocolo }}</small>
        </q-td>
        <q-td key="numeroProcesso" :props="props">
         <small>{{ props.row.numeroProcesso }}</small>
        </q-td>
        <q-td key="assunto" :props="props">
         <small>{{ props.row.assunto ? props.row.assunto.descricao : '' }}</small>
        </q-td>
        <q-td key="dataEmissaoFormatada" :props="props">
         <small>{{ props.row.dataEmissaoFormatada}}</small>
        </q-td>
      </q-tr>
      </q-table>
    </q-page>
    <spinner :showSpinner="showSpinner"></spinner>
    <modal-protocolo-detalhar ref="modalDetalharProtocolo" />
  </div>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import ModalProtocoloDetalhar from '../../components/modais/modal-protocolo-detalhar'
import GridVazio from '../../components/partials/mensagem-grid-vazio'
import InfoHelp from '../../components/info/info-help'
import _ from 'lodash'
export default {
  components: {
    ModalProtocoloDetalhar,
    GridVazio,
    InfoHelp,
    Spinner
  },
  created () {
    this.opcaoFiltro = 'buscarTodosProtocolosNaoRequerente'
    this.showSpinner = true
    this.getProtocolos('buscarTodosProtocolosNaoRequerente')
  },
  data () {
    return {
      showSpinner: '',
      user: {},
      loading: false,
      pesquisa: {processo: '', numeroProtocolo: '', idPessoa: '', checked: false, page: 1, rows: 5},
      opcaoFiltro: null,
      opened: false,
      listaProtocolos: [],
      serverPagination: {
        page: 1, rowsNumber: 5, rowsPerPage: 5
      },
      protocolos: [
        { name: 'acoes', align: 'left', label: '', field: 'acoes' },
        { name: 'numeroProtocolo', align: 'left', label: 'NÚMERO PROTOCOLO', field: 'numeroProtocolo' },
        { name: 'numeroProcesso', align: 'left', label: 'NÚMERO PROCESSO', field: 'numeroProcesso' },
        { name: 'assunto', align: 'left', label: 'ASSUNTO', field: 'assunto' },
        { name: 'dataEmissaoFormatada', align: 'left', label: 'DATA EMISSÃO', field: 'dataEmissaoFormatada' }
      ],
      showHelp: false
    }
  },
  methods: {
    getProtocolos (value) {
      if (value === 'buscarTodosProtocolos') {
        this.pesquisa.numeroProtocolo = null
        this.pesquisa.checked = false
        this.getListaProtocolos()
      } else if (value === 'buscarTodosProtocolosNaoRequerente') {
        this.pesquisa.numeroProtocolo = null
        this.pesquisa.checked = true
        this.getListaProtocolos()
      }
    },
    getListaProtocolos () {
      this.loading = true
      this.pesquisa.idPessoa = this.user = this.$store.getters['user/getUserRegistro']
      this.$axios
        .post('protocolo/pesquisa', this.pesquisa)
        .then(response => {
          this.listaProtocolos = response.data.data
          this.loading = false
          this.showSpinner = false
          if (this.pesquisa.page === 1) {
            this.showSpinner = false
            this.serverPagination.page = 1
            this.serverPagination.rowsNumber = response.data.total_count
          }
        })
    },
    getProtocoloPorNumeroProtocolo: _.debounce(function (value) {
      if (value.length > 0) {
        this.getListaProtocolos()
      }
    }, 1100),
    getProtocoloPorNumeroProcesso: _.debounce(function (value) {
      if (value.length > 0) {
        this.getListaProtocolos()
      }
    }, 1100),
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.pesquisa.idPessoa = this.$store.getters['user/getUserRegistro']
      this.getListaProtocolos()
    },
    limparFiltros () {
      this.listaProtocolos = []
      this.pesquisa.numeroProtocolo = ''
      this.pesquisa.processo = ''
      this.pesquisa.page = 1
    }
  },
  watch: {
    opcaoFiltro: function (value, oldValue) {
      this.limparFiltros()
    }
  }
}
</script>
