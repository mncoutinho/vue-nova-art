<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '28vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          ART: {{pesquisa.numeroArt}} - Exigências
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
          <q-table
               ref="table"
               color="secondary"
               :data="listExigencias"
               :columns="columnsExigencias"
               row-key="codigo"
               :loading="loading"
               no-data-label="NENHUMA EXIGÊNCIA PARA EXIBIR"
               no-results-label="NENHUMA EXIGÊNCIA PARA EXIBIR"
               rows-per-page-label="EXIGÊNCIAS POR PÁGINA:">
                <q-tr slot="body" slot-scope="props" :props="props">
                  <q-td key="codigo" :props="props">
                    <small class="text-italic">{{ props.row.codigo }}</small>
                  </q-td>
                  <q-td key="descricao" :props="props">
                    <small class="text-italic">{{ props.row.descricao }}</small>
                  </q-td>
                  <q-td key="conteudoGerador" :props="props">
                    <small class="text-italic">{{ props.row.conteudoGerador }}</small>
                  </q-td>
                  <q-td key="statusTipoAcao" :props="props">
                    <small class="text-italic">{{ props.row.statusTipoAcao }}</small>
                  </q-td>
                  <q-td key="data" :props="props">
                    <small class="text-italic">{{ props.row.data }}</small>
                  </q-td>
                  <q-td key="descricaoAnalise" :props="props">
                    <small class="text-italic">{{ props.row.descricaoAnalise }}</small>
                  </q-td>
                  <q-td key="situacaoLiberacao" :props="props">
                    <small class="text-italic">{{ props.row.situacaoLiberacao }}</small>
                  </q-td>
                  <q-td key="dataDaLiberacao" :props="props">
                    <small class="text-italic">{{ props.row.dataDaLiberacao }}</small>
                  </q-td>
                  <q-td key="descricaoLiberacao" :props="props">
                    <small class="text-italic">{{ props.row.descricaoLiberacao }}</small>
                  </q-td>
                </q-tr>
                </q-table>
    </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
export default {
  created () {
    this.getExigencias(this.pesquisa)
  },
  data () {
    return {
      columnsExigencias: [
        { name: 'codigo', label: 'CÓDIGO', field: 'codigo' },
        { name: 'descricao', label: 'DESCRIÇÃO', field: 'descricao' },
        { name: 'conteudoGerador', label: 'CONTEÚDO GERADOR', field: 'conteudoGerador' },
        { name: 'statusTipoAcao', label: 'STATUS TIPO AÇÃO', field: 'statusTipoAcao' },
        { name: 'data', label: 'Data', field: 'data' },
        { name: 'descricaoAnalise', label: 'Descrição Análise', field: 'descricaoAnalise' },
        { name: 'situacaoLiberacao', label: 'SITUAÇAO LIBERAÇÃO', field: 'situacaoLiberacao' },
        { name: 'dataDaLiberacao', label: 'DATA DA LIBERAÇÃO', field: 'dataDaLiberacao' },
        { name: 'descricaoLiberacao', label: 'DESCRIÇÃO LIBERAÇÃO', field: 'descricaoLiberacao' }
      ],
      pesquisa: {
        page: 1,
        rows: 3,
        numeroArt: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 3
      },
      listExigencias: [],
      loading: false,
      opened: false
    }
  },
  methods: {
    async toggle (art) {
      this.pesquisa.numeroArt = art
      this.getExigencias(this.pesquisa)
      this.opened = !this.opened
    },
    async getExigencias (pesquisa) {
      await this.$axios
        .post('art/exigencias', pesquisa)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.listExigencias = response.data.data
          } else if (response.data.type === 'INFORMATION') {
            this.listExigencias = []
          }
        })
    }
  },
  watch: {
    pesquisa (value) {
      this.pesquisa = value
    }
  }
}
</script>
