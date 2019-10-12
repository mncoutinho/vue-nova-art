<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
        <q-breadcrumbs-el label="Guias" icon="fas fa-barcode" />
        <q-breadcrumbs-el label="Guias e Dívidas" icon="far fa-handshake" />
    </q-breadcrumbs>
    <q-table
    class="no-border-grid q-mt-xs"
    style="margin-top:30px;"
    :data="divida.dividas"
    :columns="columns"
    :filter="filter"
    row-key="id"
    :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
    rows-per-page-label="Guias por página:"
    no-data-label = "Não existe nenhum registro de dívidas no momento."
  >
    <q-tr slot="header" slot-scope="props">
      <q-th v-for="col in props.cols" :key="col.name" :props="props">
        {{ col.label }}
      </q-th>
    </q-tr>
    <template slot="body" slot-scope="props">
      <q-tr :props="props">
        <q-td key="acao" :props="props">
          <a v-if="props.row.statusDivida !== 19" :href="urlLegado + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + props.row.id" target="_blank">
            <q-btn size="10px" flat color="primary" icon="cloud_download" class="q-mr-md">
              &nbsp;Baixar Boleto
            </q-btn>
          </a>
          <a v-if="props.row.statusDivida === 19 && props.row.tipo === 'ANUIDADE'" @click="$refs.modalEmissaoGuiaDividas.show(props.row, 'parcelamento')">
            <q-btn size="10px" flat color="primary" icon="remove_red_eye" class="q-mr-md">
              &nbsp;Ver parcelamento
            </q-btn>
          </a>
          <a v-if="props.row.statusDivida === 19 && props.row.tipo === 'MULTA'" @click="$refs.modalEmissaoGuiaDividas.show(props.row, 'multa')">
            <q-btn size="10px" flat color="primary" icon="remove_red_eye" class="q-mr-md">
              &nbsp;Ver parcelamento
            </q-btn>
          </a>
          <a v-if="props.row.statusDivida === 1 && props.row.tipo === 'ANUIDADE' && divida.liberaParcelamentoAnuidadeCorrente" :href="urlLegado + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + props.row.id  + '&tipo=2'" target="_self">
            <q-btn size="10px" flat color="primary" icon="fas fa-barcode" class="q-mr-md">
              &nbsp;Guia de parcelamento
            </q-btn>
          </a>
        </q-td>
        <q-td key="tipo" v-if="props.row.tipo" :props="props">{{ props.row.tipo }}</q-td>
        <q-td key="identificador" :props="props">{{ props.row.identificadorDivida }}</q-td>
        <q-td key="descricao" :props="props">{{ props.row.descricao }}</q-td>
        <q-td key="dataVencimentoFormatada" :props="props">{{ props.row.dataVencimentoFormatada }}</q-td>
        <q-td key="valorAtual" :props="props">R$&nbsp;{{ props.row.valorAtual }}</q-td>
      </q-tr>
    </template>
  </q-table>
  <spinner :showSpinner="showSpinner"></spinner>
  <modal-emissao-guia  ref="modalEmissaoGuiaDividas"></modal-emissao-guia>
  </q-page>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import ModalEmissaoGuia from '../../components/modais/modal-emissao-guia'
export default {
  components: {
    ModalEmissaoGuia, Spinner
  },
  created () {
    this.showSpinner = true
    this.getDividas()
  },
  data () {
    return {
      urlLegado: process.env.URL_LEGADO,
      showSpinner: '',
      filter: '',
      divida: {},
      itemDivida: {},
      serverPagination: {
        page: 1,
        rowsNumber: 10
      },
      columns: [
        { name: 'acao', label: '', field: 'acao' },
        { name: 'tipo', label: 'Natureza', field: 'tipo' },
        { name: 'identificador', label: 'Identificador', field: 'identificador' },
        { name: 'descricao', label: 'Situação', field: 'descricao' },
        { name: 'dataVencimentoFormatada', label: 'Vencimento', field: 'dataVencimentoFormatada' },
        { name: 'valorAtual', label: 'Valor Atual', field: 'valorAtual' }
      ]
    }
  },
  methods: {
    getDividas (registro) {
      this.$axios
        .post('financeiro/emissao-guia/', {registro: this.$store.getters['user/getUser'].idPessoa, tipo: 'REGISTRO'})
        .then(response => {
          // liberaParcelamentoAnuidadeCorrente
          this.divida = response.data.data
          this.showSpinner = false
        })
    }
  }
}
</script>
