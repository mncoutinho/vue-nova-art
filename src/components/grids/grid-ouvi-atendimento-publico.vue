<template>
  <div style="width: 800px; max-width: 90vw; margin-top:20px;">
    <div class="col-6">
      <q-input
        outline
        float-label="E-mail"
        v-model="pesquisa.email"
      />
      <q-input
        outline
        float-label="Código do Atendimento"
        v-model="pesquisa.codigoAtendimento"
      />
      <q-input
        outline
        float-label="Número de Protocolo"
        v-model="pesquisa.numeroProtocolo"
      />
      <br>
      <q-btn
          rounded
          v-if="pesquisa.email || pesquisa.codigoAtendimento || pesquisa.numeroProtocolo"
          color="primary"
          icon="search"
          size="sm"
          label="Pesquisar"
          @click="this.getListaAtendimentos"
        />
    </div>
    <q-table
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
      class="no-border-grid"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
      >
        <q-td
          key="numero"
          :props="props"
        >
          <small class="text-italic">{{ props.row.id }}</small>
        </q-td>
        <q-td
          key="dataAtendimento"
          :props="props"
        >
          <small class="text-italic">{{ props.row.dataAtendimentoFormatada }}</small>
        </q-td>
        <q-td
          key="situacao"
          :props="props"
        >
          <small class="text-italic">
            <q-chip
              dense
              :color="getCorCss(props.row.situacao)"
              text-color="white"
            >{{ props.row.situacao !== null ? props.row.situacao.descricao : '' }}</q-chip>
          </small>
        </q-td>
        <q-td
          key="acao"
          :props="props"
        >
          <q-btn
            flat
            rounded
            color="dark"
            size="10px"
            icon="visibility"
            @click.native="$refs.modalDetalhar.toggle(props.row)"
            label="Visualizar"
          />
        </q-td>
      </q-tr>
      <template
        slot="top-right"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          rounded
          color="primary"
          icon="record_voice_over"
          size="sm"
          @click.native="$refs.modalOuvidoriaCadastrar.toggle()"
          label="Nova Ocorrência"
        />
      </template>
    </q-table>
    <modal-ouvidoria-cadastrar
      @atualizaListaGrid="getListaAtendimentos"
      ref="modalOuvidoriaCadastrar"
    />
    <modal-ouvidoria-detalhar ref="modalDetalhar" />
  </div>
</template>
<script>
import demanda from '../selects/select-ouvidoria-demanda'
import ModalOuvidoriaCadastrar from '../../components/modais/modal-ouvidoria-publica-cadastrar'
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
  data () {
    return {
      assuntoGeral: {},
      assuntoEspecifico: {},
      listSituacao: [],
      opcaoFiltro: 'todos',
      columnsAtendimento: [
        { name: 'numero', label: 'CÓDIGO ATENDIMENTO', field: 'numero', align: 'left', sortable: true },
        { name: 'dataAtendimento', label: 'DATA ATENDIMENTO', field: 'dataAtendimento', align: 'left', sortable: true },
        { name: 'situacao', label: 'SITUAÇÃO', field: 'situacao', align: 'left', sortable: true },
        { name: 'acao', label: '', field: 'acao', align: 'center', sortable: true }
      ],
      listAtendimentos: [],
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      pesquisa: {
        page: 1,
        rows: 5,
        email: null,
        codigoAtendimento: null,
        numeroProtocolo: null
      }
    }
  },
  methods: {
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.getListaAtendimentos()
    },
    async getListaAtendimentos () {
      await this.$axios
        .post('atendimento/ouvidoria/pesquisa-publica', this.pesquisa)
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
    }
  }
}
</script>
