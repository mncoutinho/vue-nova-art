<template>
  <div>
    <q-table
        ref="table"
        color="secondary"
        :data="listDividas"
        :columns="columnsDividas"
        :loading="loading"
        :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
        no-data-label="Nenhuma guia para exibir"
        no-results-label="Nenhuma guia para exibir"
        rows-per-page-label="Guias por página:"
        row-key="id"
        class="no-border-grid"
      >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="id" :props="props">
            <small class="text-italic">{{ props.row.id }}</small>
          </q-td>
          <q-td key="dataVencimentoFormatada" :props="props">
            <small class="text-italic">{{ props.row.dataVencimentoFormatada }}</small>
          </q-td>
          <q-td key="valorAtual" :props="props">
            <small class="text-italic">{{ props.row.valorAtual }}</small>
          </q-td>
          <q-td key="tipo" :props="props">
            <small class="text-italic">{{ props.row.tipo }}</small>
          </q-td>
          <q-td key="acao" :props="props">
            <a :href="urlLegado + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + props.row.id" target="_blank">
            <q-btn size="10px" flat color="dark" rounded icon="fas fa-barcode" class="q-mr-md">
              &nbsp;&nbsp;Emitir
            </q-btn>
            </a>
          </q-td>
        </q-tr>
      </q-table>
  </div>

</template>
<script>
export default {
  data () {
    return {
      urlLegado: process.env.URL_LEGADO,
      loading: false,
      columnsDividas: [
        { name: 'dataVencimentoFormatada', align: 'center', label: 'DATA DE VENCIMENTO', field: 'dataVencimentoFormatada' },
        { name: 'valorAtual', align: 'center', label: 'VALOR ATUAL', field: 'valorAtual' },
        { name: 'tipo', align: 'center', label: 'NATUREZA', field: 'tipo' },
        { name: 'acao', align: 'center', label: '', field: 'acao' }
      ],
      listDividas: [],
      idPessoa: null
    }
  },
  methods: {
    async getDividas () {
      this.listDividas = []
      await this.$axios
        .get('financeiro/debitos/art/taxa-incorporacao/' + this.idPessoa)
        .then(response => {
          if (response.data.data) {
            this.listDividas = response.data.data
          }
        })
    },
    async carregaGrid () {
      this.user = this.$store.getters['user/getUser']
      this.idPessoa = this.user.registro
      this.getDividas()
    },
    async limpaGrid () {
      this.listDividas = []
    }
  }
}
</script>
