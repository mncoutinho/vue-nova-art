<template>
  <div>
      <q-table
      ref="table"
      class="no-border-grid"
      color="secondary"
      :data="empresas"
      :columns="columns"
      hide-bottom
      row-key="registro"
    >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="registro" :props="props">
       <small class="text-italic">{{ props.row.registro }}</small>
      </q-td>
      <q-td key="cpfOuCnpj" :props="props">
       <small class="text-italic">{{ props.row.cpfOuCnpj }}</small>
      </q-td>
      <q-td key="razaoSocial" :props="props">
       <small class="text-italic">{{ props.row.razaoSocial }}</small>
      </q-td>
    </q-tr>
    </q-table>
      <br>
  </div>
</template>
<script>
export default {
  created () {
    this.empresa = this.$store.getters['user/getUser']
    this.empresas.push(this.empresa)
  },
  data () {
    return {
      empresas: [],
      empresa: {},
      columns: [
        { name: 'registro', label: 'REGISTRO', field: 'registro', align: 'center' },
        { name: 'cpfOuCnpj', label: 'CNPJ', field: 'cpfOuCnpj', align: 'center' },
        { name: 'razaoSocial', label: 'NOME', field: 'razaoSocial', align: 'center' }
      ]
    }
  }
}
</script>
