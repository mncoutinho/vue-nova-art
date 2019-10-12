<template>
  <div>
    <q-modal  v-model="opened"  :content-css="{minWidth: '55vw', minHeight: '28vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          DÍVIDAS REFERENTES A ART: {{numero}}
        </q-toolbar-title>
        <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>
      <br>
      <div class="layout-padding">
          <q-table
            ref="table"
            class="no-border-grid"
            color="secondary"
            row-key="numero"
            :data="listDividasArtByNumero"
            :columns="dividaArt"
            no-data-label="NENHUMA GUIA PARA EXIBIR"
            no-results-label="NENHUMA GUIA PARA EXIBIR"
            rows-per-page-label="GUIAS POR PÁGINA:"
          >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="dataVencimentoFormatada" :props="props">
            <small class="text-italic">{{ props.row.dataVencimentoFormatada }}</small>
            </q-td>
            <q-td key="tipo" :props="props">
            <small>{{ props.row.tipo }}</small>
            </q-td>
            <q-td key="valorAtual" :props="props">
            <small>{{ props.row.valorAtual }}</small>
            </q-td>
            <q-td key="acao" :props="props">
              <a :href="urlLegado + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + props.row.id" target="_blank">
              <q-btn size="10px" flat color="secondary" rounded icon="vertical_align_bottom" class="q-mr-md">
                &nbsp;Download
              </q-btn>
              </a>
            </q-td>
          </q-tr>
          </q-table>
      </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      opened: false,
      numero: '',
      listDividasArtByNumero: [],
      dividaArt: [
        { name: 'dataVencimentoFormatada', align: 'center', label: 'DATA DE VENCIMENTO', field: 'dataVencimentoFormatada' },
        { name: 'tipo', align: 'center', label: 'TIPO', field: 'tipo' },
        { name: 'valorAtual', align: 'center', label: 'VALOR', field: 'valorAtual' },
        { name: 'acao', align: 'center', label: 'BAIXAR GUIA', field: 'acao' }
      ],
      urlLegado: process.env.URL_LEGADO
    }
  },
  methods: {
    async toggle (numero) {
      this.numero = numero
      await this.getDividasByNumeroArt(numero)
      this.opened = !this.opened
    },
    async getDividasByNumeroArt (numero) {
      await this.$axios
        .get('financeiro/debitos/numero-art/' + numero)
        .then(response => {
          this.listDividasArtByNumero = response.data.data
        })
    }
  }
}
</script>
