<template>
  <div>
      <grid-historico-empresa :dadosEmpresa="dados"/>
      <grid-qt-rt class="q-mt-md" />
  </div>
</template>
<script>
import ModalDetalharQt from './modal-detalhar-qt'
import GridHistoricoEmpresa from './grid-historico-empresa'
import GridQtRt from '../grid-qt-rt'
export default {
  components: {
    GridQtRt,
    ModalDetalharQt,
    GridHistoricoEmpresa
  },
  mounted () {
    this.getQuadroTecnicoEmpresa()
  },
  data () {
    return {
      dados: {
        titulos: [],
        historicos: []
      },
      ehRT: false,
      listQuadroTecnico: [],
      pesquisa: { id: this.$store.getters['user/getUserRegistro'], page: 1, rows: 5 },
      serverPagination: {
        page: 1, rowsNumber: 5, rowsPerPage: 5
      },
      quadroTecnico: [
        { name: 'acoes', align: 'center', label: 'AÇÕES', field: 'acoes', sortable: true },
        { name: 'profissionalId', align: 'center', label: 'REGISTRO', field: 'profissionalId', sortable: true },
        { name: 'profissionalNome', align: 'center', label: 'NOME', field: 'profissionalNome', sortable: true },
        { name: 'dataInicioQuadro', align: 'center', label: 'DATA INÍCIO QT', field: 'dataInicioQuadro', sortable: true },
        { name: 'possuiDivida', align: 'center', label: 'SITUAÇÃO', field: 'possuiDivida', sortable: true },
        { name: 'ehResponsavelTecnico', align: 'center', label: 'QT/RT', field: 'ehResponsavelTecnico', sortable: true },
        { name: 'ramoDescricao', align: 'center', label: 'RAMO', field: 'ramoDescricao', sortable: true }
      ],
      loading: false
    }
  },
  methods: {
    getQuadroTecnicoEmpresa () {
      this.$axios
        .post('cadastro/empresa/quadro-tecnico', this.pesquisa)
        .then(response => {
          this.listQuadroTecnico = response.data.data
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
      this.getQuadroTecnicoEmpresa()
    },
    checkRT () {
      this.pesquisa.checked = true
      this.getQuadroTecnicoEmpresa()
    }
  }
}
</script>
