<template>
  <div>
      <q-card>
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">QT/RT</label>
        </q-card-title>
        <q-card-main class="q-mt-sm">
          <q-table
            ref="table"
            color="primary"
            row-key="titulo"
            :data="listQuadroTecnico"
            :columns="quadroTecnico"
            :loading = loading
            class="no-border-grid"
            :pagination.sync="serverPagination"
            @request="request"
            :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
            rows-per-page-label="QT/RT por página:"
            no-data-label="NENHUM QT/RT PARA EXIBIR"
            no-results-label="NENHUM QT/RT PARA EXIBIR"
            loading-label= "Aguarde..."
          >
            <template slot="top-left" slot-scope="props" :props="props">
              <q-checkbox v-model="pesquisa.checked"
                          color="secondary" keep-color
                          class="q-mb-sm q-mr-md"
                          @input="check"
                          label="Mostrar somente RT" />

              <q-checkbox v-model="pesquisa.segundoChecked"
                          color="secondary" keep-color
                          class="q-mb-sm"
                          @input="check"
                          label="Mostrar baixados" />
            </template>
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="acoes" :props="props">
                <q-btn-dropdown label="Ações"
                  color="dark" size="10px"
                  flat rounded>
                  <q-list link>
                    <q-item v-if="!props.row.ehVisaoProfissional" @click.native="$refs.modalDetalharQt.toggle(props.row)" v-close-overlay>
                      <q-item-side color="white" icon="visibility" />
                      <q-item-main>
                        Detalhar
                      </q-item-main>
                    </q-item>
                    <q-item v-if="props.row.possuiDivida && !props.row.ehVisaoProfissional" @click.native="$refs.modalDivida.toggle(props.row.profissional)" v-close-overlay >
                      <q-item-side color="white" icon="monetization_on" />
                      <q-item-main>
                        Mostrar Dívida
                      </q-item-main>
                    </q-item>
                     <q-item v-if="props.row.ehResponsavelTecnico && props.row.baixado === false" v-close-overlay @click.native="$refs.modalBaixaRT.toggle(props.row)">
                      <q-item-side color="white" icon="fas fa-sign-out-alt" />
                      <q-item-main >
                        Baixar RT
                      </q-item-main>
                    </q-item>
                    <q-item v-if="props.row.baixado === false" v-close-overlay @click.native="$refs.modalBaixaQT.toggle(props.row, 'QT')" >
                      <q-item-side color="white" icon="fas fa-sign-out-alt" />
                      <q-item-main>
                        Baixar QT
                      </q-item-main>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
              <q-td key="profissionalEmpresaId" :props="props">
                <small v-if="!props.row.ehVisaoProfissional" class="text-italic">{{ props.row.profissional.id }}</small>
                <small v-if="props.row.ehVisaoProfissional" class="text-italic">{{ props.row.empresa.id }}</small>
              </q-td>
              <q-td key="profissionalEmpresaNome" :props="props">
                <small v-if="!props.row.ehVisaoProfissional" class="text-italic">{{ props.row.profissional.nome}}</small>
                <small v-if="props.row.ehVisaoProfissional" class="text-italic">{{ props.row.empresa.nome}}</small>
              </q-td>
              <q-td key="dataInicioQuadro" :props="props">
                <small class="text-italic">{{ props.row.dataInicioQuadro }}</small>
              </q-td>
              <q-td key="possuiDivida" :props="props">
                <small><div>{{!props.row.possuiDivida ? 'Não Possui Divida' : 'Possui Divida'}}</div></small>
              </q-td>
              <q-td key="ehResponsavelTecnico" :props="props">
                <small class="text-italic">
                  <q-chip v-if="props.row.baixado === true" dense color="grey-5">&nbsp;&nbsp;&nbsp;BAIXADO&nbsp;&nbsp;&nbsp;</q-chip>
                  <q-chip v-if="props.row.baixado === false" dense color="blue-4">&nbsp;&nbsp;&nbsp;QT&nbsp;&nbsp;&nbsp;</q-chip>
                  <q-chip v-if="props.row.ehResponsavelTecnico === true && props.row.baixado === false" dense color="blue-4">&nbsp;&nbsp;&nbsp;RT&nbsp;&nbsp;&nbsp;</q-chip>
                </small>
              </q-td>
            </q-tr>
          </q-table>
          <spinner :showSpinner="loading"></spinner>
        </q-card-main>
      </q-card>
      <br>
      <modal-detalhar-qt ref="modalDetalharQt" />
      <modal-dividas-qt ref="modalDivida" />
      <modal-baixa-rt ref="modalBaixaRT" @atualizaGrid="getQuadroTecnicoEmpresa" />
      <modal-baixa-qt ref="modalBaixaQT" @atualizaGrid="getQuadroTecnicoEmpresa" />
  </div>
</template>
<script>
import Spinner from '../partials/spinner'
import ModalDetalharQt from './empresa/modal-detalhar-qt'
import GridHistoricoEmpresa from './empresa/grid-historico-empresa'
import ModalDividasQt from './empresa/modal-dividas-qt'
import ModalBaixaQt from '../modais/modal-baixa-qt'
import ModalBaixaRt from '../modais/modal-baixa-rt'
export default {
  components: {
    ModalBaixaRt,
    ModalBaixaQt,
    ModalDetalharQt,
    GridHistoricoEmpresa,
    ModalDividasQt,
    Spinner
  },
  mounted () {
    this.getQuadroTecnicoEmpresa()
  },
  data () {
    return {
      listQuadroTecnico: [],
      pesquisa: {
        checked: false,
        segundoChecked: false,
        idPessoa: null,
        idEmpresa: null,
        page: 1,
        rows: 5
      },
      serverPagination: {
        page: 1, rowsNumber: 5, rowsPerPage: 5
      },
      quadroTecnico: [
        { name: 'acoes', align: 'center', label: 'AÇÕES', field: 'acoes', sortable: true },
        { name: 'profissionalEmpresaId', align: 'center', label: 'REGISTRO', field: 'profissionalEmpresaId', sortable: true },
        { name: 'profissionalEmpresaNome', align: 'center', label: 'NOME', field: 'profissionalEmpresaNome', sortable: true },
        { name: 'dataInicioQuadro', align: 'center', label: 'DATA INÍCIO QT', field: 'dataInicioQuadro', sortable: true },
        { name: 'possuiDivida', align: 'center', label: 'SITUAÇÃO', field: 'possuiDivida', sortable: true },
        { name: 'ehResponsavelTecnico', align: 'center', label: 'QT/RT', field: 'ehResponsavelTecnico', sortable: true }
      ],
      loading: false
    }
  },
  methods: {
    getQuadroTecnicoEmpresa () {
      this.loading = true
      this.pesquisa.idPessoa = this.$store.getters['user/getUserRegistroProfissional']
      this.pesquisa.idEmpresa = this.$store.getters['user/getUserRegistroEmpresa']
      if (this.pesquisa.idPessoa || this.pesquisa.idEmpresa) {
        this.$axios
          .post('cadastro/empresa/quadro-tecnico', this.pesquisa)
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.listQuadroTecnico = []
              this.pesquisa.page = 1
              this.pesquisa.rows = 5
            } else {
              this.listQuadroTecnico = response.data.data
              if (this.pesquisa.page === 1) {
                this.serverPagination.rowsNumber = response.data.total_count
              }
            }

            this.loading = false
          }).catch(erro => {
            this.loading = false
          })
      }
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.getQuadroTecnicoEmpresa()
    },
    check () {
      this.pesquisa.page = 1
      this.pesquisa.rows = 5
      this.getQuadroTecnicoEmpresa()
    }
  }
}
</script>
