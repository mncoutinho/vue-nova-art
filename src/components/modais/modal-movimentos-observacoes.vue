<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '70vw', minHeight: '40vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          OBSERVAÇÕES
        </q-toolbar-title>
        <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>
      <div class="layout-padding">
        <br><br>
      <!-- Tabela -->
            <q-table
              ref="table"
              class="no-border-grid"
              color="primary"
              row-key="codigo"
              :data="listaObservacoes"
              :columns="columns"
              :loading = loading
              :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
              rows-per-page-label="Histórico de observações por página:"
              no-data-label = "Não possui nenhuma observação."
            >
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="acoes" :props="props">
                <q-btn style="margin-left: -20px;" flat rounded size="sm" color="blue-10" @click="getAnexoObservacoes(props.row.id)" icon="play_for_work" >Baixar</q-btn>
              </q-td>
              <q-td key="dataformatada" :props="props">
                <small class="text-italic">{{ props.row.dataFormatada}}</small>
              </q-td>
              <q-td key="observacao" :props="props">
                <small class="text-italic">{{ props.row.observacao}}</small>
              </q-td>
              <q-td key="unidade" :props="props">
                <small class="text-italic">{{ props.row.departamento.nome}}</small>
              </q-td>
            </q-tr>
          </q-table>
      </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import { openURL } from 'quasar'
export default {
  data () {
    return {
      loading: false,
      opened: false,
      listaObservacoes: [],
      teste: '',
      columns: [
        { name: 'acoes', align: 'left', label: 'ANEXO', field: 'acoes' },
        { name: 'dataformatada', align: 'left', label: 'DATA', field: 'dataformatada' },
        { name: 'observacao', align: 'left', label: 'OBSERVAÇÃO', field: 'observacao' },
        { name: 'unidade', align: 'left', label: 'UNIDADE', field: 'unidade' }
      ]
    }
  },
  methods: {
    toggle (movimento) {
      this.getListaObservações(movimento.id)
      this.opened = !this.opened
    },
    getListaObservações (idMovimento) {
      this.$axios
        .get('protocolo/observacoes/' + idMovimento)
        .then(response => {
          this.listaObservacoes = response.data.data
        })
    },
    getAnexoObservacoes (idObservacao) {
      openURL(process.env.API + '/rest-api/crea/protocolo/anexo/' + idObservacao)
    }
  }
}
</script>
