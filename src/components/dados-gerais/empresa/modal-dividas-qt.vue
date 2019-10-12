<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '28vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          DÍVIDAS REFERENTES AO PROFISSIONAL: {{pessoa.nome}}
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
            :data="listDividas"
            :columns="divida"
            no-data-label="NENHUMA DÍVIDA PARA EXIBIR"
            no-results-label="NENHUMA DÍVIDA PARA EXIBIR"
            rows-per-page-label="DÍVIDAS POR PÁGINA:"
          >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="anoDivida" :props="props">
              <small class="text-italic">{{ props.row.anoDivida }}</small>
            </q-td>
            <q-td key="dataVencimentoFormatada" :props="props">
              <small class="text-italic">{{ props.row.dataVencimentoFormatada }}</small>
            </q-td>
            <q-td key="valorOriginal" :props="props">
             <small>{{ props.row.valorOriginal }}</small>
            </q-td>
            <q-td key="juros" :props="props">
             <small>{{ props.row.juros }}</small>
            </q-td>
            <q-td key="multa" :props="props">
             <small>{{ props.row.multa }}</small>
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
      urlLegado: process.env.URL_LEGADO,
      opened: false,
      pessoa: {},
      listDividas: [],
      divida: [
        { name: 'anoDivida', align: 'center', label: 'EXERCÍCIO', field: 'anoDivida' },
        { name: 'dataVencimentoFormatada', align: 'center', label: 'DATA DE VENCIMENTO', field: 'dataVencimentoFormatada' },
        { name: 'valorOriginal', align: 'center', label: 'VALOR ORIGINAL', field: 'valorOriginal' },
        { name: 'juros', align: 'center', label: 'JUROS', field: 'juros' },
        { name: 'multa', align: 'center', label: 'MULTA', field: 'multa' },
        { name: 'valorAtual', align: 'center', label: 'VALOR ATUAL', field: 'valorAtual' },
        { name: 'acao', align: 'center', label: 'BAIXAR GUIA', field: 'acao' }
      ]
    }
  },
  methods: {
    async toggle (pessoa) {
      this.pessoa = pessoa
      await this.getDividasByIdProfissional()
      this.opened = !this.opened
    },
    async getDividasByIdProfissional () {
      await this.$axios
        .get('financeiro/debitos/anuidade/quadro-tecnico/' + this.pessoa.id)
        .then(response => {
          this.listDividas = response.data.data
        })
    }
  }
}
</script>
