<template>
  <q-modal v-model="opened"  :content-css="{minWidth: '50vw', minHeight: '22vh'}">
    <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
            Livro de Ordem - ART: {{this.numeroArt}}
        </q-toolbar-title>
        <q-btn flat
              round
              dense
              color="white"
              icon="clear"
              v-close-overlay />
      </q-toolbar>
      <br>
      <div class="layout-padding">
      <q-table :data="livros"
               :columns="columns"
               row-key="id"
               class="no-border-grid"
               :pagination.sync="serverPagination"
               @request="request"
               :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
               no-data-label="Não há nenhum livro de ordem para exibir."
               no-results-label="Não há nenhum livro de ordem para exibir."
               rows-per-page-label="Registros por página:">
        <template slot="top-left" slot-scope="props">
          <q-btn v-if="livros.length > 0" flat rounded color="secondary" :loading="showLoandingBtn" icon="cloud_download" @click="downloadLivroDeOrdem" label="Baixar todo livro de ordem" />
        </template>
        <template slot="top-right" slot-scope="props">
          <q-btn rounded color="green" icon="list"  @click="incluirLivroDeOrdem" label="Incluir" />
        </template>
        <q-tr slot="header" slot-scope="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
            <q-td key="acoes" :props="props">
              <div class="col-3">
                <q-btn flat round dense icon="more_horiz">
                  <q-popover >
                    <q-list link>
                      <q-item v-close-overlay>
                        <q-btn
                            icon="edit"
                            flat
                            @click="$refs.modalLivroEdicao.toggle(props.row, 'EDICAO')"
                            size="sm"
                            dense>
                            &nbsp;Editar &nbsp;&nbsp;&nbsp;
                        </q-btn>
                      </q-item>
                      <q-item v-close-overlay>
                        <q-btn
                            icon="clear"
                            flat
                            @click="deleta(props.row.codigo)"
                            size="sm"
                            dense>
                            &nbsp;Excluir &nbsp;&nbsp;&nbsp;
                        </q-btn>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </q-td>
            <q-td key="dataInicio" :props="props"><span>{{ props.row.dataInicioDaEtapa }}</span></q-td>
            <q-td key="dataConclusao" :props="props"><span>{{ props.row.dataConclusao }}</span></q-td>
            <q-td key="relatoVisitaResponsavelTecnico" :props="props">
              <span v-if="props.row.relatoVisitaResponsavelTecnico !== null">
                {{ props.row.relatoVisitaResponsavelTecnico.substring(0,12)}}
                <q-tooltip>{{ props.row.relatoVisitaResponsavelTecnico }}</q-tooltip>
              </span>
            </q-td>
            <q-td key="orientacao" :props="props">
              <span v-if="props.row.orientacao !== null">
                {{ props.row.orientacao.substring(0,12)}}
                <q-tooltip>{{ props.row.orientacao }}</q-tooltip>
              </span>
            </q-td>
            <q-td key="acidentesDanosMateriais" :props="props">
              <span v-if="props.row.acidentesDanosMateriais !== null">
                {{ props.row.acidentesDanosMateriais.substring(0,12)}}
                <q-tooltip>{{ props.row.acidentesDanosMateriais }}</q-tooltip>
              </span>
            </q-td>
            <q-td key="empresasePrestadoresContratadosSubContratados" :props="props">
              <span v-if="props.row.nomeContratado !== null">
                {{ props.row.nomeContratado.substring(0,12)}}
                <q-tooltip>{{ props.row.nomeContratado }}</q-tooltip>
              </span>
            </q-td>
            <q-td key="periodosInterrupcaoEMotivos" :props="props">
              <span v-if="props.row.periodosInterrupcaoEMotivos !== null">
                {{ props.row.periodosInterrupcaoEMotivos.substring(0,12)}}
                <q-tooltip>{{ props.row.periodosInterrupcaoEMotivos }}</q-tooltip>
              </span>
            </q-td>
            <q-td key="outrosFatosEObservacoes" :props="props">
              <span v-if="props.row.outrosFatosEObservacoes !== null">
                {{ props.row.outrosFatosEObservacoes.substring(0,12)}}
                <q-tooltip>{{ props.row.outrosFatosEObservacoes }}</q-tooltip>
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>
      <modal-livro-ordem-edicao ref="modalLivroEdicao" :numeroArt="numeroArt" @atualizaGrid="atualizaGrid"></modal-livro-ordem-edicao>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import ModalLivroOrdemEdicao from './modal-livro-ordem-edicao'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  components: {
    ModalLivroOrdemEdicao
  },
  data () {
    return {
      opened: false,
      numeroArt: null,
      livros: [],
      filter: '',
      showLoandingBtn: false,
      pesquisa: {
        page: 1,
        rows: 5,
        numeroArt: null
      },
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      columns: [
        { name: 'acoes', label: 'Ações', field: '' },
        { name: 'dataInicio', label: 'Data Início', field: 'dataInicioDaEtapaFormatada' },
        { name: 'dataConclusao', label: 'Data Conclusão', field: 'dataConclusaoFormatada' },
        { name: 'relatoVisitaResponsavelTecnico', label: 'Relato Visita', field: 'relatoVisitaResponsavelTecnico' },
        { name: 'orientacao', label: 'Orientação', field: 'orientacao' },
        { name: 'acidentesDanosMateriais', label: 'Acidentes', field: 'acidentesDanosMateriais' },
        { name: 'empresasePrestadoresContratadosSubContratados', label: 'Contratados', field: 'empresasePrestadoresContratadosSubContratados' },
        { name: 'periodosInterrupcaoEMotivos', label: 'Interrupções', field: 'periodosInterrupcaoEMotivos' },
        { name: 'outrosFatosEObservacoes', label: 'Observações', field: 'outrosFatosEObservacoes' }
      ]
    }
  },
  methods: {
    toggle (numeroArt) {
      this.numeroArt = numeroArt
      this.pesquisa.numeroArt = numeroArt
      this.opened = !this.opened
      if (this.opened) {
        this.getLivros(numeroArt)
      }
    },
    async getLivros () {
      this.livros = []
      this.pesquisa.numeroArt = this.numeroArt
      await this.$axios
        .post('art/livro-ordem/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.data) {
            this.livros = response.data.data
            if (this.pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          }
        })
    },
    incluirLivroDeOrdem () {
      this.$refs.modalLivroEdicao.toggle({numeroArt: this.numeroArt}, 'INCLUIR')
    },
    async downloadLivroDeOrdem () {
      this.showLoandingBtn = true
      await this.$axios
        .get('/art/livro-ordem/download/' + this.numeroArt + '/' + this.$store.getters['user/getUserRegistro'], {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
        })
        .then(response => {
          this.showLoandingBtn = false
          const blob = new Blob([response.data], {
            type: 'application/pdf'
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'livro-ordem-art-' + this.numeroArt + '.pdf')
          document.body.appendChild(link)
          link.click()
        }).catch(() => {
          this.showLoandingBtn = false
          this.mostrarMensagem('Problemas ao efetuar o download do livro de ordem. Favor tentar novamente.', 'negative', 1500)
        })
    },
    atualizaGrid () {
      this.getLivros()
    },
    async deleta (codigo) {
      await this.$axios
        .delete('art/livro-ordem/' + codigo)
        .then(response => {
          this.getLivros()
        })
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.contratos = this.getLivros()
    }
  }
}
</script>
