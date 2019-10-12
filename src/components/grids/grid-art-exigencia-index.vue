<template>
  <div>
    <q-table
      ref="table"
      color="secondary"
      :data="listExigencias"
      :columns="columnsExigencias"
      :pagination.sync="serverPagination"
      :loading="loading"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label="NENHUMA EXIGÊNCIA PARA EXIBIR"
      no-results-label="NENHUMA EXIGÊNCIA PARA EXIBIR"
      rows-per-page-label="Exigências por página"
      row-key="numero"
      class="no-border-grid"
      @request="request"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="numero" :props="props">
          <small class="text-italic">{{ props.row.numero }}</small>
        </q-td>
        <q-td key="natureza" :props="props">
          <small class="text-italic">{{ props.row.natureza }}</small>
        </q-td>
        <q-td key="dataCadastro" :props="props">
          <small class="text-italic">{{ props.row.dataCadastro }}</small>
        </q-td>
        <q-td key="acao" :props="props">
          <q-btn flat rounded color="dark" size="10px" icon="visibility" @click.native="$refs.modalPreview.toggle(props.row)" label="Visualizar" />
        </q-td>
      </q-tr>
    </q-table>
    <modal-preview-art ref="modalPreview"></modal-preview-art>
  </div>

</template>
<script>
import PesquisaConsultaArt from '../../components/models/PesquisaConsultaArt'
import ModalPreviewArt from '../../components/modais/modal-preview-art'
export default {
  components: {
    ModalPreviewArt
  },
  data () {
    return {
      loading: false,
      columnsExigencias: [
        { name: 'numero', label: 'NÚMERO', field: 'numero', align: 'center' },
        { name: 'natureza', label: 'NATUREZA', field: 'natureza', align: 'center' },
        { name: 'dataCadastro', label: 'DATA', field: 'dataCadastro', align: 'center' },
        { name: 'acao', label: '', field: 'acao', align: 'center' }
      ],
      listExigencias: [],
      pesquisa: { },
      filtro: {},
      serverPagination: {
        page: 1,
        rowsNumber: 5
      }
    }
  },
  methods: {
    async getArts () {
      this.listExigencias = []
      await this.$axios
        .post('art/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.data) {
            this.listExigencias = response.data.data
            if (this.pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          }
        })
    },
    async carregaGrid () {
      this.user = this.$store.getters['user/getUser']
      this.pesquisa = new PesquisaConsultaArt(this.user.registro, this.user.tipoPessoa)
      this.pesquisa.exigencia = true
      this.pesquisa.page = 1
      this.serverPagination.page = 1
      this.serverPagination.rowsNumber = 5
      this.getArts(this.pesquisa)
    },
    async limpaGrid () {
      this.pesquisa.page = 1
      this.serverPagination.page = 1
      this.serverPagination.rowsNumber = 5
      this.listExigencias = []
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.getArts()
    }
  }
}
</script>
