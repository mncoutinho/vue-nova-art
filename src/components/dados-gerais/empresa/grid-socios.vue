<template>
  <div>
    <q-table
      ref="table"
      class="no-border-grid"
      color="secondary"
      :data="socios"
      :columns="columns"
      hide-bottom
      row-key="tipoCapitalSocial"
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="registro" :props="props">
          <small class="text-italic">{{ props.row.socio.id }}</small>
        </q-td>
        <q-td key="nome" :props="props">
          <small class="text-italic">{{ props.row.socio.nome}}</small>
        </q-td>
        <q-td key="tipoPessoa" :props="props">
          <small class="text-italic">{{ props.row.socio.tipo}}</small>
        </q-td>
        <q-td key="percentual" :props="props">
          <small class="text-italic">{{ props.row.percentual}}</small>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>
<script>
export default {
  created () {
    this.getSocios()
  },
  data () {
    return {
      socios: [],
      columns: [
        { name: 'registro', align: 'center', label: 'REGISTRO', field: 'registro' },
        { name: 'nome', align: 'center', label: 'NOME', field: 'nome' },
        { name: 'tipoPessoa', align: 'center', label: 'TIPO PESSOA', field: 'tipoPessoa' },
        { name: 'percentual', align: 'center', label: 'PERCENTUAL', field: 'percentual' }
      ]
    }
  },
  methods: {
    async getSocios () {
      await this.$axios
        .get('cadastro/socio/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          this.socios = response.data.data
        })
    }
  }
}
</script>
