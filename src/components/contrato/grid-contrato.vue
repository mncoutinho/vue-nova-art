<template>
  <div>
    <q-table
      ref="table"
      class="no-border-grid"
      color="secondary"
      :data="contratos"
      :columns="columns"
      row-key="id"
      :pagination.sync="serverPagination"
      @request="request"
      :loading="loading"
      :pagination-label="(inicio, fim, total) => {this.qtdContratos = total; return inicio + '-' + fim + ' de ' + total}"
      no-data-label="NENHUM CONTRATO PARA EXIBIR"
      no-results-label="NENHUM CONTRATO PARA EXIBIR"
      rows-per-page-label="CONTRATOS POR PÁGINA:"
    >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="numero" :props="props">
       <small class="text-italic">{{ props.row.id }}</small>
      </q-td>
      <q-td key="nomeContratante" :props="props">
       <small class="text-italic">{{ props.row.nomeContratante }}</small>
      </q-td>
      <q-td key="valorContratoFormatado" :props="props">
       <small class="text-italic">{{ props.row.valorContratoFormatado }}</small>
      </q-td>
      <q-td key="finalizado" :props="props">
        <q-chip v-if="props.row.finalizado" dense color="green-9">Finalizado</q-chip>
        <q-chip v-if="!props.row.finalizado" dense color="amber-9">Em cadastramento</q-chip>
      </q-td>
      <q-td key="acao" :props="props">
        <q-btn size="10px"
               flat rounded color="dark" icon="edit"
               @click="editar(props.row.id)"
               :loading="loadingEditar"
               class="q-mr-md" label="Editar">
        <span slot="loading">
        <q-spinner-facebook class="on-left" />
        Carregando...
        </span>
        </q-btn>
        <q-btn size="10px"
              flat rounded color="red-9"
             icon="delete_outline" @click="excluirContrato(props.row.id)" class="q-mr-md" label="Excluir" />
      </q-td>
    </q-tr>
    <template slot="top-right" slot-scope="props">
      <botao v-if="statusBotaoCadastrar"
            :label="'Novo Contrato'"
            :icon="'note_add'"
            :loading="loading"
            @emit="criarContrato()" />
    </template>
    </q-table>
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
export default {
  components: { Botao },
  created () {
    this.getContratos(this.pesquisa)
  },
  data () {
    return {
      contratos: [],
      qtdContratos: 0,
      pesquisa: {
        page: 1,
        rows: 3,
        numeroArt: this.$store.getters['art/getNumero'],
        tipo: '0'
      },
      serverPagination: {
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 3
      },
      columns: [
        { name: 'numero', label: 'NÚMERO', field: 'id' },
        { name: 'nomeContratante', label: 'CONTRATANTE', field: 'nomeContratante', align: 'center' },
        { name: 'valorContratoFormatado', label: 'VALOR', field: 'valorContratoFormatado', align: 'center' },
        { name: 'finalizado', label: 'STATUS', field: 'finalizado', align: 'center' },
        { name: 'acao', label: '', field: 'acao', align: 'center' }
      ],
      selected: [
        { name: 'numero' }
      ],
      loading: false,
      loadingEditar: false,
      loadingExcluir: false
    }
  },
  methods: {
    editar (idContrato) {
      this.loadingEditar = true
      this.$axios
        .put('art/contratos/finaliza', { numero: idContrato, checked: false })
        .then(response => {
          this.loadingEditar = false
          this.getContrato(idContrato)
        })
        .catch(() => {
          this.$q.notify({message: 'Erro ao editar contrato', type: 'negative', position: 'center'})
          this.loadingEditar = false
        })
    },
    async getContratos (pesquisa) {
      if (pesquisa.tipo === '1') {
        this.serverPagination.page = 1
        this.serverPagination.rowsPerPage = 3
        this.serverPagination.rowsNumber = 3
      }
      await this.$axios
        .post('art/contratos/pesquisa', pesquisa)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.contratos = response.data.data
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
              this.getContratos(this.pesquisa)
            } else {
              this.contratos = []
              this.qtdContratos = 0
            }
          }

          if (this.contratos.length === 0) {
            this.$store.commit('art/setPossuiContratoCadastrado', false)
          }
        })
    },
    getContrato (idContrato) {
      this.$axios
        .get('art/contratos/detalhado/' + idContrato)
        .then(response => {
          this.$store.commit('art/setContrato', response.data.data)
          this.$emit('openModal')
        })
    },
    excluirContrato (idContrato) {
      this.loadingExcluir = true
      this.$axios
        .delete('art/contratos/' + idContrato)
        .then(response => {
          this.loadingExcluir = false
          this.getContratos(this.pesquisa)
        })
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.loading = true
      setTimeout(() => {
        this.serverPagination = props.pagination
        this.pesquisa.page = props.pagination.page
        this.contratos = this.getContratos(this.pesquisa)
        this.loading = false
      }, 300)
    },
    async criarContrato () {
      this.loading = true
      if (this.contratos.length === 0) {
        this.$q.dialog({
          color: 'dark',
          title: 'Atenção',
          message: 'Ao cadastrar o primeiro contrato não será possível alterar o tipo de registro (Natureza) de sua ART. Para alteração do tipo de registro (Natureza) a ART não deve possuir nenhum contrato cadastrado. Deseja prosseguir? ',
          ok: 'Sim',
          cancel: 'Não, vou alterar o tipo de registro (Natureza)'
        }).then(() => {
          this.$axios
            .post('art/contratos/novo', {numero: this.$store.getters['art/getNumero']})
            .then(response => {
              this.loading = false
              this.$store.commit('art/setPossuiContratoCadastrado', true)
              this.$store.commit('art/setContrato', response.data.data)
              this.contratos.push(response.data.data)
              this.$emit('openModal')
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        }).catch(() => {
          this.loading = false
          this.$emit('irParaNatureza')
        })
      } else {
        await this.$axios
          .get('art/valida/contratos/se-todos-os-contratos-estao-finalizados/' + this.$store.getters['art/getNumero'])
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.loading = false
              this.$q.loading.hide()
              this.$q.notify({message: 'Finalize todos os contratos antes de criar um novo.', type: 'negative', position: 'center'})
            } else {
              this.$axios
                .post('art/contratos/novo', {numero: this.$store.getters['art/getNumero']})
                .then(response => {
                  this.loading = false
                  this.$store.commit('art/setContrato', response.data.data)
                  this.contratos.push(response.data.data)
                  this.$emit('openModal')
                })
            }
          })
          .catch(() => {
            this.loading = false
            this.$q.notify({message: 'Lamentamos o transtorno! Ocorreu um problema de comunicação. Favor tentar novamente.', type: 'negative', position: 'center'})
          })
      }
    },
    totalContratos () {
      return this.contratos.length
    }
  },
  computed: {
    statusBotaoCadastrar () {
      if (this.$store.getters['art/ehMultipla']) {
        if (this.qtdContratos >= 120) {
          return false
        }
      } else {
        if (this.qtdContratos > 0) {
          return false
        }
      }
      return true
    }
  }
}
</script>
