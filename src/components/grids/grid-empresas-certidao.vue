<template>
  <div>
    <q-table
        ref="table"
        color="secondary"
        class="no-border-grid"
        row-key="codigo"
        :data="listEmpresas"
        :columns="columns"
        :loading="loading"
        :pagination="{rowsPerPage: 100}"
        selection="multiple"
        :selected.sync="selected"
        no-data-label = "Nenhuma empresa para exibir."
        no-results-label="Nenhuma empresa para exibir."
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td auto-width>
          <q-checkbox color="primary" v-model="props.selected" />
        </q-td>
        <q-td key="nomeFantasia" :props="props">
        <small class="text-italic">{{ props.row.nomeFantasia }}</small>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>
<script>
export default {
  created () {
    this.getEmpresasCurriculo()
  },
  data () {
    return {
      listEmpresas: [ ],
      loading: false,
      selected: [],
      columns: [
        { name: 'nomeFantasia', align: 'center', label: 'NOME', field: row => row.nomeFantasia, sortable: true }
      ]
    }
  },
  methods: {
    getEmpresasCurriculo () {
      this.$axios
        .get('cadastro/empresa/curriculo')
        .then(response => {
          this.listEmpresas = response.data.data
        })
    }
  }
}
</script>
