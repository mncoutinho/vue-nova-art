<template>
  <div>
    <div style="width: 800px; max-width: 90vw; margin-top:20px;">
      <div class="col-12">
        <q-option-group
          type="radio"
          inline
          class="full-width "
          color="secondary"
          v-model="opcaoFiltro"
          :options="[
            { label: 'Todos os Atendimentos', value: 'todos', color: 'grey-7' },
            { label: 'Data de Atendimento', value: 'dataAtendimento', color: 'grey-7' },
            { label: 'Situação', value: 'situacao', color: 'grey-7' },
            { label: 'Tipo de Demanda', value: 'tipoDemanda', color: 'grey-7' },
            { label: 'Assunto', value: 'assunto', color: 'grey-7' }]"
      />
      </div>
    </div>
    <div v-show="opcaoFiltro !== 'todos'"
    class="row  gutter-x-sm">
      <div class="col-2" v-if="opcaoFiltro === 'dataAtendimento'">
        <q-datetime
          v-model="pesquisa.dataInicio"
          type="date"
          format="DD/MM/YYYY"
          style="margin: 15px"
          float-label="Início:"
          color="secondary"/>
      </div>
      <div class="col-2" v-if="opcaoFiltro === 'dataAtendimento'">
        <q-datetime
          v-model="pesquisa.dataFim"
          type="date"
          format="DD/MM/YYYY"
          style="margin: 15px"
          float-label="Fim:"
          color="secondary"/>
      </div>
      <div class="col-3" v-if="opcaoFiltro === 'situacao'">
        <q-select
          v-model="pesquisa.situacao"
          color="secondary"
          float-label="Situação"
          style="margin: 15px"
          value="value"
          :options="listSituacao"
          />
      </div>
      <div class="col-3" v-if="opcaoFiltro === 'tipoDemanda'">
          <demanda
          v-model="pesquisa.tipoDemanda"
          color="secondary"
          style="margin: 15px"
          value="value" />
      </div>
      <div class="col-3" v-if="opcaoFiltro === 'assunto'">
          <select-assunto
          style="margin: 15px"
          stack-label="Assunto Geral"
          v-model="assuntoGeral"
          />
      </div>
      <div class="col-5" v-if="opcaoFiltro === 'assunto'">
        <select-especifico
          style="margin: 15px"
          v-if="assuntoGeral"
          :assuntosGerais="assuntoGeral.id"
          v-model="assuntoEspecifico"
          />
      </div>
      <div class="col-2" v-if="opcaoFiltro !== 'todos'">
        <q-btn
        style="margin-top:40px;"
        rounded
        color="primary"
        icon="find_replace"
        size="sm"
        label="Pesquisar"
        @click="getListaAtendimentos"/>
      </div>
    </div>
    <q-table v-show="open === true"
    ref="table"
    color="secondary"
    :data="listAtendimentos"
    :columns="columnsAtendimento"
    no-data-label="NENHUM ATENDIMENTO PARA EXIBIR"
    no-results-label="NENHUM ATENDIMENTO PARA EXIBIR"
    rows-per-page-label="ATENDIMENTOS POR PÁGINA"
    :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
    @request="request"
    :pagination.sync="serverPagination"
    row-key="numero"
    class="no-border-grid">
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="numero" :props="props">
          <small class="text-italic">{{ props.row.id }}</small>
        </q-td>
        <q-td key="dataAtendimento" :props="props">
          <small class="text-italic">{{ props.row.dataAtendimentoFormatada }}</small>
        </q-td>
        <q-td key="situacao" :props="props">
          <small class="text-italic">
            <q-chip dense :color="getCorCss(props.row.situacao)" text-color="white" >{{ props.row.situacao !== null ? props.row.situacao.descricao : '' }}</q-chip>
            </small>
        </q-td>
        <q-td key="acao" :props="props">
          <q-btn flat rounded color="dark" size="10px" icon="visibility" @click.native="$refs.modalDetalhar.toggle(props.row)" label="Visualizar" />
        </q-td>
      </q-tr>
      <template slot="top-right" slot-scope="props" :props="props">
        <q-btn rounded
        color="primary"
        icon="record_voice_over"
        size="sm"
        @click.native="$refs.modalOuvidoriaCadastrar.toggle()"
        label="Nova Ocorrência" />
      </template>
    </q-table>
  <modal-ouvidoria-cadastrar @atualizaListaGrid="getListaAtendimentos" ref="modalOuvidoriaCadastrar" />
  <modal-ouvidoria-detalhar ref="modalDetalhar"/>
  </div>
</template>
<script>
import demanda from '../selects/select-ouvidoria-demanda'
import ModalOuvidoriaCadastrar from '../../components/modais/modal-ouvidoria-cadastrar'
import ModalOuvidoriaDetalhar from '../../components/modais/modal-ouvidoria-detalhar'
import SelectAssunto from 'components/selects/select-ouvidoria-assunto'
import SelectEspecifico from 'components/selects/select-ouvidoria-assunto-especifico'
export default {
  components: {
    demanda,
    SelectAssunto,
    SelectEspecifico,
    ModalOuvidoriaCadastrar,
    ModalOuvidoriaDetalhar
  },
  created () {
    this.getListaAtendimentos()
  },
  data () {
    return {
      assuntoGeral: {},
      assuntoEspecifico: {},
      listSituacao: [],
      open: false,
      opcaoFiltro: 'todos',
      columnsAtendimento: [
        { name: 'numero', label: 'CÓDIGO ATENDIMENTO', field: 'numero', align: 'left', sortable: true },
        { name: 'dataAtendimento', label: 'DATA ATENDIMENTO', field: 'dataAtendimento', align: 'left', sortable: true },
        { name: 'situacao', label: 'SITUAÇÃO', field: 'situacao', align: 'left', sortable: true },
        { name: 'acao', label: '', field: 'acao', align: 'center', sortable: true }
      ],
      listAtendimentos: [ this.form ],
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      pesquisa: {
        page: 1,
        rows: 5,
        idPessoa: this.$store.getters['user/getUserRegistro']
      }
    }
  },
  methods: {
    async getSituacao () {
      let listTempSituacao = []
      await this.$axios
        .get('atendimento/ouvidoria/situacao/')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempSituacao.push({value: el.id, label: el.descricao})
          })
        })
      this.listSituacao = listTempSituacao
      return this.listSituacao
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.getListaAtendimentos()
    },
    async getListaAtendimentos () {
      this.listAtendimentos = []
      if (this.open === false) {
        this.open = true
      }
      if (this.opcaoFiltro === 'assunto') {
        this.pesquisa.assuntoGeral = this.assuntoGeral.id
        if (this.assuntoEspecifico) {
          this.pesquisa.assuntoEspecifico = this.assuntoEspecifico.id
        } else {
          this.pesquisa.assuntoEspecifico = null
        }
      }
      await this.$axios
        .post('atendimento/ouvidoria/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.data) {
            this.listAtendimentos = response.data.data
            if (this.pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          }
        })
    },
    getCorCss (situacao) {
      if (situacao !== null) {
        switch (situacao.descricao) {
          case 'EM ANDAMENTO':
            return 'green'
          case 'ARQUIVADO':
            return 'orange'
          case 'NAO TRAMITADO':
            return 'red-9'
        }
      }
    },
    filtros () {
      this.user = this.$store.getters['user/getUser']
      this.pesquisa = {
        page: 1,
        rows: 5,
        idPessoa: this.$store.getters['user/getUserRegistro']}
      if (this.opcaoFiltro !== 'todos') {
        this.open = false
      }
      if (this.opcaoFiltro === 'todos') {
        this.open = true
        this.getListaAtendimentos()
      }
      if (this.opcaoFiltro === 'situacao') {
        this.getSituacao()
      }
    }
  },
  watch: {
    opcaoFiltro: function (value, oldValue) {
      this.filtros()
    }
  }
}
</script>
