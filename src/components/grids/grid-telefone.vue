<template>
  <div>
    <q-table
      ref="table"
      class="no-border-grid"
      color="primary"
      row-key="codigo"
      :data="telefones"
      :columns="columns"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      rows-per-page-label="Telefones por página:"
      no-data-label = "Não possui nenhum telefone cadastrado."
    >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="tipoTelefone" :props="props">
        <small class="text-italic">{{ props.row.tipoTelefone.descricao }}</small>
      </q-td>
      <q-td key="ddd" :props="props">
        <small class="text-italic">{{ props.row.ddd }}</small>
      </q-td>
      <q-td key="numero" :props="props">
        <small class="text-italic">{{ props.row.numero }}</small>
      </q-td>
      <q-td key="acaoEditar" :props="props">
        <modal-telefone @atualiza="atualiza"
                        :index="props.row.__index"
                        :telefone="props.row"
                        @exclui="exclui"
                        modoEdicao
                        :idPessoa="idPessoa"
                        >
        </modal-telefone>
      </q-td>
    </q-tr>
    <template slot="top-right" slot-scope="props">
      <modal-telefone
        @adiciona="adiciona"
        :idPessoa="idPessoa">
      </modal-telefone>
    </template>
    </q-table>
  </div>
</template>
<script>
import ModalTelefone from '../../components/modais/modal-telefone'
export default {
  props: ['telefones', 'idPessoa'],
  components: { ModalTelefone },
  data () {
    return {
      columns: [
        { name: 'tipoTelefone', align: 'center', label: 'TIPO', field: row => row.tipoTelefone, sortable: true },
        { name: 'ddd', align: 'center', label: 'DDD', field: 'ddd', sortable: true },
        { name: 'numero', align: 'center', label: 'NÚMERO', field: 'numero', sortable: true },
        { name: 'acaoEditar', align: 'center', label: '', field: 'acaoEditar' }
      ]
    }
  },
  methods: {
    adiciona (telefone) {
      this.telefones.push(telefone)
    },
    exclui (telefone, index) {
      this.telefones.splice(index, 1)
    },
    atualiza (telefone) {
      for (let key in this.telefones) {
        if (this.telefones[key].codigo === telefone.codigo) {
          this.telefones[key].numero = telefone.numero
          this.telefones[key].ddd = telefone.ddd
          this.telefones[key].tipoTelefone.descricao = telefone.tipoTelefone.descricao
          this.telefones[key].tipoTelefone.id = telefone.tipoTelefone.id
        }
      }
    }
  }
}
</script>
