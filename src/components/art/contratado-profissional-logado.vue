<template>
  <div>
      <q-table
      ref="table"
      class="no-border-grid"
      color="secondary"
      :data="profissionais"
      :columns="columns"
      hide-bottom
      row-key="nome"
    >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="nome" :props="props">
       <small class="text-italic">{{ props.row.nome }}</small>
      </q-td>
      <q-td key="titulo" :props="props">
       <small class="text-italic">{{ props.row.titulo }}</small>
      </q-td>
      <q-td key="id" :props="props">
       <small class="text-italic">{{ props.row.id }}</small>
      </q-td>
      <q-td key="numeroRNP" :props="props">
        <small class="text-italic">{{ props.row.numeroRNP }}</small>
      </q-td>
    </q-tr>
    </q-table>
      <br>
  </div>
</template>
<script>
export default {
  created () {
    this.getProfissionalDetalhado()
  },
  data () {
    return {
      profissionais: [],
      profissional: {},
      columns: [
        { name: 'nome', label: 'NOME', field: 'nome', align: 'center' },
        { name: 'titulo', label: 'TÍTULO', field: 'titulo', align: 'center' },
        { name: 'id', label: 'REGISTRO', field: 'id', align: 'center' },
        { name: 'numeroRNP', label: 'RNP', field: 'numeroRNP', align: 'center' }
      ]
    }
  },
  methods: {
    async getProfissionalDetalhado () {
      await this.$axios
        .get('cadastro/profissional/detalhar/' + this.$store.getters['art/getIdProfissional'])
        .then(response => {
          this.profissionais.push(response.data.data[0])
        })
    }
  }
}
</script>
