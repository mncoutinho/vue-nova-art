<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
        <q-breadcrumbs-el label="Serviços" icon="fas fa-toolbox" />
        <q-breadcrumbs-el label="Certidão" icon="fas fa-file-signature " />
    </q-breadcrumbs>
    <br>
    <q-table
      :loading="loading"
      ref="table"
      color="secondary"
      class="no-border-grid"
      row-key="numero"
      :data="listCertidoes"
      :columns="columns"
      no-data-label = "Nenhuma certidão para exibir."
      no-results-label="Nenhuma certidão para exibir."
      @request="request"
      :pagination.sync="serverPagination"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      rows-per-page-label="Certidões por página:"
    >
    <template slot="top-right" slot-scope="props">
      <botao v-if="!modoEdicao && $store.getters['user/getTipoPessoa'] !== 'EMPRESA'"
            :label="'Gerar Certidão'"
            :icon="'fas fa-file-signature '"
            @emit="$refs.modalCertidaoProfissional.toggle()" />
    <botao v-if="!modoEdicao && $store.getters['user/getTipoPessoa'] === 'EMPRESA'"
            :label="'Gerar Certidão'"
            :icon="'fas fa-file-signature '"
            @emit="$refs.modalCertidaoEmpresa.toggle()" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="ano" :props="props">
       <small class="text-italic">{{ props.row.ano }}</small>
      </q-td>
      <q-td key="numero" :props="props">
       <small class="text-italic">{{ props.row.numero }}</small>
      </q-td>
      <q-td key="tipo" :props="props">
         <small class="text-italic">{{ props.row.tipo }}</small>
      </q-td>
       <q-td key="dataCertidao" :props="props">
       <small class="text-italic">{{ props.row.dataCertidao }}</small>
      </q-td>
    </q-tr>
    </q-table>
    <spinner :showSpinner="showSpinner"></spinner>
    <modal-certidao-profissional ref="modalCertidaoProfissional" />
    <modal-certidao-empresa ref="modalCertidaoEmpresa" />
  </q-page>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import Botao from '../../components/button/botao'
import ModalCertidaoProfissional from '../../components/certidao/profissional/modal-certidao-profissional'
import ModalCertidaoEmpresa from '../../components/modais/modal-certidao-empresa'
export default {
  components: { Botao,
    ModalCertidaoProfissional,
    ModalCertidaoEmpresa,
    Spinner },
  created () {
    this.showSpinner = true
    this.getCertidoes({page: 1, rows: 5, idPessoa: this.$store.getters['user/getUserRegistro'], tipo: '0'})
  },
  data () {
    return {
      showSpinner: '',
      ehProfissional: this.$store.getters['user/ehProfissional'],
      modoEdicao: false,
      listCertidoes: [],
      pesquisa: {
        page: 1,
        rows: 5,
        idPessoa: this.$store.getters['user/getUserRegistro'],
        tipo: '0'
      },
      serverPagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5
      },
      columns: [
        { name: 'ano', align: 'left', label: 'Ano', field: 'ano' },
        { name: 'numero', align: 'left', label: 'Número', field: 'numero' },
        { name: 'tipo', align: 'left', label: 'Tipo', field: 'tipo' },
        { name: 'dataCertidao', label: 'Data', field: 'dataCertidao' }
      ],
      loading: false
    }
  },
  methods: {
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      setTimeout(() => {
        this.serverPagination = props.pagination
        this.pesquisa.page = props.pagination.page
        this.getCertidoes(this.pesquisa)
        this.showSpinner = false
      }, 300)
    },
    async getCertidoes (pesquisa) {
      this.listCertidoes = []
      this.showSpinner = false

      await this.$axios
        .post('cadastro/certidoes/pesquisa', pesquisa)
        .then(response => {
          if (pesquisa.tipo === '1') {
            this.serverPagination.page = 1
            this.serverPagination.rowsPerPage = 3
            this.serverPagination.rowsNumber = 3
          }
          if (response.data.type === 'SUCCESS') {
            this.listCertidoes = response.data.data
            if (pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          }
          if (response.data.type === 'INFORMATION') {
            if (pesquisa.page !== 1) { // caso seja deletado o ultimo daquela page, pegara a page anterior
              this.serverPagination.page = this.serverPagination.page - 1
              this.serverPagination.rowsPerPage = 3
              this.pesquisa.page = this.serverPagination.page
              this.pesquisa.rows = 3
              this.getCertidoes(this.pesquisa)
            } else {
              this.listCertidoes = []
            }
          }
        })
    }
  }
}
</script>
