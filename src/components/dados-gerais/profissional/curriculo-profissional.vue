<template>
  <div>
      <q-card>
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">DADOS PROFISSIONAIS </label>
        </q-card-title>
        <q-card-main style="margin-top:10px" class="q-ml-sm">
          <div class="row gutter-xs justify-between">
            <div class="col-md-3">
              <label id="internal-label">REGISTRO: </label><span id="span-view">{{dados.id}}</span>
            </div>
            <div class="col-md-9">
              <label id="internal-label">RNP: </label><span id="span-view">{{dados.numeroRNP}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-3" >
              <label id="internal-label">DATA REGISTRO: </label><span id="span-view">{{dados.dataRegistro}}</span>
            </div>
            <div class="col-md-9">
              <label id="internal-label">DATA VISTO: </label><span id="span-view">{{dados.dataVisto}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-3">
              <label id="internal-label">CARTEIRA: </label><span id="span-view">{{dados.carteira}}</span>
            </div>
            <div class="col-md-9">
              <label id="internal-label">TIPO: </label><span id="span-view">{{dados.tipoCarteira === 'D' ? 'DEFINITIVA' : 'PROVISÓRIA'}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-3" >
              <label id="internal-label">UF DA CARTEIRA: </label><span id="span-view">{{dados.ufCarteira}}</span>
            </div>
            <div class="col-md-9">
              <label id="internal-label">DATA EXPEDIÇÃO:</label><span id="span-view">{{dados.expedicaoCarteira}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label id="internal-label">OBSERVAÇÕES SOBRE O REGISTRO:</label><span id="span-view">{{dados.observacoesProfissional}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label id="internal-label">ANOTAÇÕES ESPECIAIS:</label><span id="span-view">{{dados.anotacoesEspeciais}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <checkbox-participa-catalogo />
            </div>
          </div>
        </q-card-main>
      </q-card>
      <grid-entidades-filiadas class="q-mt-md" :dadosProfissionais="dados" />
      <grid-titulos-profissional class="q-mt-md" :dadosProfissionais="dados" />
      <grid-historico-profissional class="q-mt-md" :dadosProfissionais="dados" />
      <grid-qt-rt class="q-mt-md" />
  </div>
</template>
<script>
import GridHistoricoProfissional from './grid-historico-profissional'
import GridEntidadesFiliadas from './grid-entidades-filiadas'
import GridTitulosProfissional from './grid-titulos-profissional'
import CheckboxParticipaCatalogo from '../../checkbox/checkbox-participa-catalogo'
import GridQtRt from '../grid-qt-rt'
export default {
  components: {
    GridQtRt,
    GridEntidadesFiliadas,
    GridHistoricoProfissional,
    GridTitulosProfissional,
    CheckboxParticipaCatalogo
  },
  mounted () {
    this.getDados()
  },
  data () {
    return {
      dados: {
        titulos: [],
        historicos: []
      },
      listQuadroTecnico: [],
      pesquisa: { id: this.$store.getters['user/getUserRegistro'], page: 1, rows: 5 },
      serverPagination: {
        page: 1, rowsNumber: 5, rowsPerPage: 5
      },
      quadroTecnico: [
        { name: 'acoes', align: 'left', label: 'AÇÕES', field: 'acoes' },
        { name: 'responsavelTecnico', align: 'left', label: 'INDICAÇÃO SE RT', field: 'responsavelTecnico', sortable: true },
        { name: 'empresaId', align: 'left', label: 'REGISTRO', field: 'empresaId', sortable: true },
        { name: 'empresaNome', align: 'left', label: 'RAZÃO SOCIAL', field: 'empresaNome', sortable: true },
        { name: 'situacao', align: 'left', label: 'SITUAÇÃO', field: 'situacao', sortable: true },
        { name: 'vinculo', align: 'left', label: 'VÍNCULO', field: 'vinculo' },
        { name: 'dataInicio', align: 'left', label: 'DATA INÍCIO', field: 'dataInicio', sortable: true },
        { name: 'dataFim', align: 'left', label: 'DATA FIM', field: 'dataFim', sortable: true },
        { name: 'jornadaTrabalho', align: 'left', label: 'JORNADA', field: 'jornadaTrabalho' }
      ],
      loading: false,
      participaCatalogo: false
    }
  },
  methods: {
    getDados () {
      if (this.$store.getters['user/getUserRegistro']) {
        this.$axios
          .get('cadastro/profissional/detalhar/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.dados = response.data.data[0]
            this.listQuadroTecnico = this.dados.quadrosTecnicos
          })
      }
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.pesquisa.id = this.$store.getters['user/getUserRegistro']
      this.getDados()
    }
  }
}
</script>
