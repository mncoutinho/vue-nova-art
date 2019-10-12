<template>
  <div>
    <q-card>
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">HISTÓRICO DO REGISTRO</label>
        </q-card-title>
        <q-card-main class="q-mt-sm">
          <q-table
            ref="table"
            color="primary"
            row-key="titulo"
            :data="dadosProfissionais.historicos"
            :columns="historico"
            class="no-border-grid"
            :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
            rows-per-page-label="Históricos por página:"
          >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="evento" :props="props">
            <small class="text-italic">{{ props.row.evento }}</small>
            </q-td>
            <q-td key="dataInicial" :props="props">
            <small class="text-italic">{{ props.row.dataInicial }}</small>
            </q-td>
            <q-td key="dataFinal" :props="props">
            <small class="text-italic">{{ props.row.dataFinal }}</small>
            </q-td>
            <q-td key="observacao" :props="props">
            <small class="text-italic">{{ props.row.observacao }}</small>
            </q-td>
          </q-tr>
          </q-table>
        </q-card-main>
      </q-card>
  </div>
</template>
<script>
export default {
  props: ['dadosProfissionais'],
  data () {
    return {
      historico: [
        { name: 'evento', align: 'left', label: 'EVENTO', field: 'evento', sortable: true },
        { name: 'dataInicial', align: 'left', label: 'DATA INICIAL', field: 'dataInicial', sortable: true },
        { name: 'dataFinal', align: 'left', label: 'DATA FINAL', field: 'dataFinal', sortable: true },
        { name: 'observacao', align: 'left', label: 'OBSERVAÇÃO', field: 'observacao' }
      ]
    }
  },
  methods: {
  }
}
</script>
