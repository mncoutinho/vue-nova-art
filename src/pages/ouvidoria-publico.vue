<template>
    <div class="index-page bg-primary window-height window-width column items-center no-wrap">
        <br>
        <div class="card-ouvidoria bg-white column no-wrap group" style="border-radius: 6px; -webkit-box-sizing: border-box;">
            <div class="row gutter-x-sm">
                <div class="col-4">
                    <img src="~assets/logo2.png" style="max-width: 85%; margin-left:8px; height: auto;">
                </div>
                <div class="col-8">
                    <div class="q-display-1">- OUVIDORIA ON LINE
                    </div>
                </div>
            </div>
            <div>
                <div class="row gutter-x-sm" v-if="this.listAtendimentos.length === 0">
                    <div class="col-6">
                        <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
                            <q-card-title style="text-align: center">
                                <label>PESQUISA DE OCORRÊNCIA</label>
                            </q-card-title>
                            <q-card-main>
                              <label>{{this.mensagemDeUso}}</label>
                                <div class="col-6">
                                    <q-input
                                      outline
                                      float-label="E-mail"
                                      v-model="pesquisa.email" />
                                    <q-input
                                      outline
                                      float-label="Código da Ocorrência"
                                      v-model="pesquisa.codigoAtendimento" />
                                    <q-input
                                      outline
                                      float-label="Número de Protocolo"
                                      v-model="pesquisa.numeroProtocolo" />
                                    <br>
                                    <q-btn
                                      rounded
                                      color="primary"
                                      icon="search"
                                      size="sm"
                                      class="full-width q-mt-lg q-mb-sm"
                                      label="Pesquisar Ocorrência"
                                      @click="this.getListaAtendimentos" />
                                </div>
                            </q-card-main>
                        </q-card>
                    </div>
                    <div class="col-6">
                        <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
                            <q-card-title style="text-align: center">
                                <label>CADASTRO DE OCORRÊNCIA</label>
                            </q-card-title>
                            <q-card-main>
                                <span class="text-bg-color-red" style="font-size:14px">
                                    <p>Senhor(a) Usuário(a),</p>
                                    <p>A primeira instância na comunicação do usuário com o CREA-RJ é o atendimento. <a href="https://novoportal.crea-rj.org.br/fale-conosco/">Clique aqui</a> e veja o local mais próximo de você.</p>
                                    <p>A Ouvidoria funciona como <u>última instância</u> para o encaminhamento de manifestações. Sendo assim, caberá à Ouvidoria atuar apenas nos assuntos analisados e tratados originalmente pelas Unidades competentes, esgotadas as possibilidades de ação por parte delas.</p>
                                </span>
                                <q-btn
                                    rounded
                                    class="full-width q-mt-lg q-mb-sm"
                                    color="primary"
                                    icon="record_voice_over"
                                    size="sm"
                                    @click.native="$refs.modalOuvidoriaCadastrar.toggle()"
                                    label="Nova Ocorrência" />
                            </q-card-main>
                        </q-card>
                    </div>
                </div>
                <div v-if="this.listAtendimentos.length > 0">
                    <q-table
                      ref="table"
                      color="secondary"
                      :data="listAtendimentos"
                      :columns="columnsAtendimento"
                      no-data-label="NENHUMA OCORRÊNCIA PARA EXIBIR"
                      no-results-label="NENHUMA OCORRÊNCIA PARA EXIBIR"
                      rows-per-page-label="OCORRÊNCIAS POR PÁGINA"
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
                                  <q-chip
                                    dense
                                    :color="getCorCss(props.row.situacao)"
                                    text-color="white">
                                  {{ props.row.situacao !== null ? props.row.situacao.descricao : '' }}</q-chip>
                                </small>
                            </q-td>
                            <q-td key="acao" :props="props">
                                <q-btn
                                    flat
                                    rounded
                                    color="dark"
                                    size="10px"
                                    icon="visibility"
                                    @click.native="$refs.modalDetalhar.toggle(props.row)"
                                    label="Visualizar" />
                            </q-td>
                        </q-tr>
                        <template slot="top-right" slot-scope="props" :props="props">
                            <q-btn
                                rounded
                                icon="undo"
                                size="sm"
                                @click.native="voltar()"
                                label="Voltar"/>
                                &nbsp;&nbsp;
                            <q-btn
                                rounded
                                color="primary"
                                icon="record_voice_over"
                                size="sm"
                                @click.native="$refs.modalOuvidoriaCadastrar.toggle()"
                                label="Nova Ocorrência" />
                        </template>
                    </q-table>
                </div>
            </div>
            <modal-ouvidoria-detalhar ref="modalDetalhar" />
        </div>
        <br>
        <small class="text-white">©2019 - Conselho Regional de Engenharia e Agronomia do Rio de Janeiro, todos os direitos reservados.</small>
        <modal-ouvidoria-cadastrar @atualizaListaGrid="getListaAtendimentos" ref="modalOuvidoriaCadastrar" />
    </div>
</template>
<script>
import GridOuviAtendimento from '../components/grids/grid-ouvi-atendimento-publico'
import ModalOuvidoriaCadastrar from '../components/modais/modal-ouvidoria-publica-cadastrar'
import ModalOuvidoriaDetalhar from '../components/modais/modal-ouvidoria-detalhar'
export default {
  components: {
    GridOuviAtendimento,
    ModalOuvidoriaCadastrar,
    ModalOuvidoriaDetalhar
  },
  created () {
    this.$store.commit('user/offUser')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('ART')
    this.$store.commit('art/deleteArt')
  },
  props: {
    cadastro: Object
  },
  data () {
    return {
      opened: false,
      mensagemDeUso: 'Preencha ao menos um dos campos!',
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      columnsAtendimento: [
        { name: 'numero', label: 'CÓDIGO OCORRÊNCIA', field: 'numero', align: 'left', sortable: true },
        { name: 'dataAtendimento', label: 'DATA OCORRÊNCIA', field: 'dataAtendimento', align: 'left', sortable: true },
        { name: 'situacao', label: 'SITUAÇÃO', field: 'situacao', align: 'left', sortable: true },
        { name: 'acao', label: '', field: 'acao', align: 'center', sortable: true }
      ],
      listAtendimentos: [],
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
      if (this.pesquisa.email || this.pesquisa.codigoAtendimento || this.pesquisa.numeroProtocolo) {
        await this.$axios
          .post('atendimento/ouvidoria/pesquisa-publica', this.pesquisa)
          .then(response => {
            if (response.data.data) {
              this.listAtendimentos = response.data.data
              if (this.pesquisa.page === 1) {
                this.serverPagination.rowsNumber = response.data.total_count
              }
            } else {
              this.$q.notify({message: 'Nenhuma informação encontrada!', type: 'negative'})
            }
          })
      } else {
        this.$q.notify({message: this.mensagemDeUso, type: 'negative'})
      }
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
    voltar () {
      this.listAtendimentos = []
    }
  }
}
</script>
<style lang="stylus">
.index-page
  .card-ouvidoria
    max-width 850px
    padding 20px 40px
    margin-top 15px
    border-radius 2px
</style>
