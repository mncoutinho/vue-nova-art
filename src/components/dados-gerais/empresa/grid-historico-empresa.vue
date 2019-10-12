<template>
  <div>
    <q-card>
      <q-card-title class="bg-grey-3" text-color="white">
        <label id="label-view">HISTÓRICO DO REGISTRO</label>
      </q-card-title>
      <q-card-main class="q-mt-sm">
        <q-table
          ref="table"
          color="primary"
          row-key="titulo"
          :data="historicos"
          :columns="historico"
          :loading = loading
          class="no-border-grid"
          :pagination.sync="serverPagination"
          @request="request"
          :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
          rows-per-page-label="Históricos por página:"
          no-data-label="NENHUM HISTÓRICO PARA EXIBIR"
          no-results-label="NENHUM HISTÓRICO PARA EXIBIR"
        >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="evento" :props="props">
          <small class="text-italic">{{ props.row.evento }}</small>
          </q-td>
          <q-td key="dataInicial" :props="props">
          <small class="text-italic">{{ props.row.dataInicial }}</small>
          </q-td>
          <q-td key="dataFinal" :props="props">
          <small class="text-italic">{{ props.row.dataFinal }}</small>
          </q-td>
          <q-td key="observacao" :props="props">
          <small class="text-italic">{{ props.row.observacao }}</small>
          </q-td>
        </q-tr>
        </q-table>
      </q-card-main>
    </q-card>
  </div>
</template>
<script>
export default {
  created () {
    this.getHistoricos()
  },
  data () {
    return {
      pesquisa: { id: this.$store.getters['user/getUserRegistro'], page: 1, rows: 3 },
      serverPagination: {
        page: 1, rowsNumber: 3, rowsPerPage: 3
      },
      historicos: [],
      historico: [
        { name: 'evento', align: 'left', label: 'EVENTO', field: 'evento', sortable: true },
        { name: 'dataInicial', align: 'left', label: 'DATA INICIAL', field: 'dataInicial', sortable: true },
        { name: 'dataFinal', align: 'left', label: 'DATA FINAL', field: 'dataFinal', sortable: true },
        { name: 'observacao', align: 'left', label: 'OBSERVAÇÃO', field: 'observacao' }
      ],
      loading: false
    }
  },
  methods: {
    getHistoricos () {
      this.$axios
        .post('cadastro/historico/', this.pesquisa)
        .then(response => {
          this.historicos = response.data.data
          if (this.pesquisa.page === 1) {
            this.serverPagination.rowsNumber = response.data.total_count
          }
        })
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.pesquisa.id = this.$store.getters['user/getUserRegistro']
      this.getHistoricos()
    }
  }
}
</script>
