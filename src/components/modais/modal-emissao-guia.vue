<template>
<div>
  <q-modal  v-model="opened"  :content-css="{minWidth: '55vw', minHeight: '28vh'}">
    <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          Parcelamentos
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
    :data="dividas"
    :columns="columns"
    row-key="id"
    no-data-label = "Não existe nenhum registro de dívidas no momento."
  >
    <q-tr slot="header" slot-scope="props">
      <q-th v-for="col in props.cols" :key="col.name" :props="props">
        {{ col.label }}
      </q-th>
    </q-tr>
    <template slot="body" slot-scope="props">
      <q-tr :props="props">
        <q-td key="anoDivida" :props="props">{{ props.row.anoDivida }}</q-td>
        <q-td key="parcela" :props="props">{{ props.row.parcela }}</q-td>
        <q-td key="dataVencimentoFormatada" :props="props">{{ props.row.dataVencimentoFormatada }}</q-td>
        <q-td key="valorAtual" :props="props">R$&nbsp;{{ props.row.valorAtual }}</q-td>
        <q-td v-if="props.row.__index === 0" key="boleto" :props="props">
          <a v-if="props.row.statusDivida !== 19" :href="urlLegado + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + props.row.id" target="_blank">
            <q-btn size="10px" flat color="primary" icon="cloud_download" class="q-mr-md">
              &nbsp;Baixar Boleto
            </q-btn>
          </a>
        </q-td>
        <q-td v-if="props.row.__index !== 0" key="boleto" :props="props">
          <q-chip color="positive" dense>EM ABERTO</q-chip>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
export default {
  props: ['itemDivida'],
  data () {
    return {
      opened: false,
      dividas: [],
      filter: '',
      columns: [
        { name: 'anoDivida', label: 'Identificador', field: 'anoDivida' },
        { name: 'parcela', label: 'Parcela', field: 'parcela' },
        { name: 'dataVencimentoFormatada', label: 'Dt. Vencimento', field: 'dataVencimentoFormatada', align: 'left' },
        { name: 'valorAtual', label: 'Valor', field: 'valorAtual', align: 'left' },
        { name: 'boleto', label: 'Boleto', field: '', align: 'center' }
      ],
      urlLegado: process.env.URL_LEGADO
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    show (divida, tipo) {
      this.getDividas(divida, tipo)
    },
    async getDividas (divida, tipo) {
      if (tipo === 'multa') {
        await this.$axios
          .post('financeiro/multas-a-vencer/', {anuidade: divida.anoDivida, idPessoa: divida.idPessoa})
          .then(response => {
            this.dividas = response.data.data
            this.opened = !this.opened
          })
      } else {
        await this.$axios
          .post('financeiro/parcelas-a-vencer/', {anuidade: divida.anoDivida, idPessoa: divida.idPessoa})
          .then(response => {
            this.dividas = response.data.data
            this.opened = !this.opened
          })
      }
    }
  }
}
</script>
