<template>
<!-- Verificar se é usado -->
  <q-page class="layout-padding justify-center">
    <q-card class="q-ma" color="secondary">
      <q-card-main>
Para emissão de certidões solicitadas no Atendimento do Conselho é necessário o pagamento da taxa, realizar o agendamento no portal e comparecer na data marcada com a documentação solicitada.
      </q-card-main>
    </q-card>
<!--
     428, 'CERTIDAO DE ACERVO TECNICO [SEM ATESTADO, ACIMA DE 20 ARTs]'
     429, 'CERTIDAO DE ACERVO TECNICO [SEM ATESTADO]'
     430, 'CERTIDAO DE ACERVO TECNICO [COM ATESTADO, ACIMA DE 20 ARTs]'
     431, 'CERTIDAO DE ACERVO TECNICO [COM ATESTADO, ATE 20 ARTs]'
     432, 'CERTIDAO [QUAISQUER OUTROS DOCUMENTOS]'
 -->
    <br>
    <br>
    <div class="row gutter-x-md">
      <div class="col-6">
       <select-fin-natureza v-model="natureza" />
      </div>
      <div class="col-6">
        <q-input v-model="finalidade"  float-label="Digite aqui a finalidade" type="textarea" />
      </div>
    </div>
    <br>
    <div class="row gutter-x-md">
      <div class="col-6">
       <select-tipo-certidao v-model="tipoCertidao" />
      </div>
      <div class="col-6">
        {{inspetoria}}
        <select-inspetorias v-model="inspetoria" label="Selecione o local de entrega do Documento"/>
      </div>
    </div>
    {{this.artsTemp.length}}
            <q-table
          ref="table"
          color="primary"
          row-key="numero"
          :data="arts"
          :columns="columns"
          selection="multiple"
          :selected.sync="selected"
          :pagination.sync="serverPagination"
          @request="request"
          :loading = loading
          no-data-label = "Nenhuma ART para exibir. Utilize o filtro acima para pesquisar."
        >
        <q-tr slot="header" slot-scope="props">
          <q-th auto-width>
            <q-toggle
              v-model="certidao.todasArts"
              checked-icon="done_all"
              unchecked-icon="check"
              color="primary"
              @input="selectAll()"
            />
          </q-th>
        </q-tr>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td auto-width>
            <q-checkbox color="primary" @input="teste(props.row, props.selected)" v-model="props.selected" />
          </q-td>
          <q-td key="numero" :props="props">
          <small class="text-italic">{{ props.row.numero }}</small>
          </q-td>
          <q-td key="dataCadastro" :props="props">
          <small>{{ props.row.dataCadastro }}</small>
          </q-td>
          <q-td key="natureza" :props="props">
          <small>{{ props.row.natureza }}</small>
          </q-td>
          <q-td key="situacao" :props="props">
          <small>{{ props.row.situacao.substring(0,28) }} ...</small>
          <q-tooltip>{{ props.row.situacao }}</q-tooltip>
          </q-td>
          <q-td key="temDivida" :props="props">
          <small><div >{{!props.row.temDivida ? 'Não Possui Divida' : 'Possui Divida'}}</div></small>
          </q-td>
          <q-td key="acaoEditar" :props="props">
            <q-btn size="10px" flat color="primary" icon="search" @click="editar(props.row)" class="q-mr-md">
            </q-btn>
          </q-td>
          <q-td key="acao" :props="props">
            <q-btn size="10px" v-if="props.row.temDivida" flat color="primary" icon="monetization_on" @click="getDividasByNumeroArt(props.row.numero)" class="q-mr-md">
              &nbsp;Mostrar Dívida
            </q-btn>
          </q-td>
        </q-tr>
        <template slot="top-right" slot-scope="props">
          <q-btn class="full-width"
                color="primary"
                icon="find_replace"
                @click="getArts();toggle()"
                size="sm"
                label="Pesquisar" />
        </template>
        </q-table>{{selected}}
  </q-page>
</template>
<script>
import SelectFinNatureza from '../../components/selects/select-fin-naturezas'
import SelectTipoCertidao from '../../components/selects/select-tipo-certidao'
import SelectInspetorias from '../../components/selects/select-inspetorias'
export default {
  components: {
    SelectFinNatureza,
    SelectTipoCertidao,
    SelectInspetorias
  },
  data () {
    return {
      certidao: {
        todasArts: false
      },
      arts: [],
      artsTemp: [],
      selected: [],
      natureza: 0,
      tipoCertidao: 0,
      inspetoria: 0,
      finalidade: '',
      pesquisa: {
        page: 1,
        rows: 5,
        tipoPessoa: 'PROFISSIONAL',
        idPessoa: '1969101350',
        numero: '',
        numeroArtPrincipal: '',
        idNatureza: null,
        idTipo: null,
        rascunho: false,
        dataInicioContrato: '',
        dataFimContrato: '',
        dataInicioCadastro: '',
        dataFimCadastro: '',
        dataInicioPagamento: '',
        dataFimPagamento: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      columns: [
        { name: 'numero', align: 'left', label: 'Número', field: 'numero' },
        { name: 'dataCadastro', align: 'left', label: 'Data Cadastro', field: 'dataCadastro' },
        { name: 'temDivida', align: 'left', label: 'Exigencia', field: 'temDivida' },
        { name: 'acaoEditar', label: '', field: 'acaoEditar' },
        { name: 'acao', label: '', field: 'acao' }
      ],
      loading: false
    }
  },
  methods: {
    teste (item, select) {
      if (select) {
        this.artsTemp.push(item)
      } else {
        this.artsTemp.splice(item.__index, 1)
      }
    },
    selectAll () {
      if (this.certidao.todasArts) {
        this.selected = this.arts
        this.artsTemp = []
      } else {
        this.selected = []
        this.artsTemp = []
      }
    },
    toggle () {
      this.open = !this.open
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.contratos = this.getArts()
    },
    async getArts () {
      this.arts = []
      await this.$axios
        .post('art/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.data) {
            this.arts = response.data.data
            if (this.certidao.todasArts) {
              this.selected = Object.assign([], this.arts)
              this.artsTemp.forEach(function (desmarcado) {
                let index = -1
                for (let key in this.selected) {
                  if (this.selected[key].numero === desmarcado.numero) {
                    index = key
                  }
                }
                if (index !== -1) {
                  this.selected.splice(index, 1)
                }
              }.bind(this))
            }
            if (this.pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          }
        })
    }
  }
}
</script>
