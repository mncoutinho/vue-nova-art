<template>
  <div>
  <q-page padding class="docs-table">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="ART" icon="library_books" />
      <q-breadcrumbs-el label="Em Cadastramento" icon="edit" />
    </q-breadcrumbs>
    <br>
    <br>
    <q-table
      ref="table"
      color="secondary"
      class="no-border-grid"
      row-key="numero"
      :data="listArtRascunho"
      :columns="columns"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label = "Nenhuma ART para exibir."
      no-results-label="Nenhuma ART para exibir"
      rows-per-page-label="ARTs por página:"
    >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="numero" :props="props">
       <small class="text-italic">{{ props.row.numero }}</small>
      </q-td>
      <q-td key="dataCadastro" :props="props">
       <small>{{ props.row.dataCadastro }}</small>
      </q-td>
      <q-td key="natureza" :props="props">
       <small>{{ props.row.natureza }}</small>
      </q-td>
      <q-td key="situacao" :props="props">
       <q-chip color="amber-6" dense>Em cadastramento</q-chip>
      </q-td>
      <q-td key="acaoEditar" :props="props">
        <q-btn-dropdown label="Ações"
                color="dark" size="10px"
                flat rounded>
          <q-list link>
            <q-item v-close-overlay @click.native="editar(props.row)">
              <q-item-side color="dark" icon="edit"/>
              <q-item-main >
                Editar
              </q-item-main>
            </q-item>
            <q-item v-close-overlay @click.native="$refs.modalPreview.toggle(props.row)" >
              <q-item-side color="dark" icon="visibility" />
              <q-item-main>
                Visualizar
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </q-tr>
    </q-table>
    <spinner :showSpinner="showSpinner"></spinner>
    <modal-preview-art ref="modalPreview" />
  </q-page>
  </div>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import ModalPreviewArt from '../../components/modais/modal-preview-art'
export default {
  components: {
    Spinner,
    ModalPreviewArt
  },
  created () {
    this.showSpinner = true
    this.getListRascunhos()
  },
  data () {
    return {
      listArtRascunho: [],
      showSpinner: '',
      columns: [
        { name: 'numero', align: 'left', label: 'Número', field: 'numero' },
        { name: 'dataCadastro', align: 'left', label: 'Data Cadastro', field: 'dataCadastro' },
        { name: 'natureza', align: 'left', label: 'Natureza', field: 'natureza' },
        { name: 'situacao', align: 'left', label: 'Situação', field: 'situacao' },
        { name: 'acaoEditar', label: '', field: 'acaoEditar' }
      ]
    }
  },
  methods: {
    getListRascunhos () {
      this.$axios
        .post('art/rascunhos', {tipoPessoa: this.$store.getters['user/getTipoPessoa'], idPessoa: this.$store.getters['user/getUserRegistro']})
        .then(response => {
          this.listArtRascunho = response.data.data
          this.showSpinner = false
        })
    },
    editar (art) {
      this.$router.push('/art/editar/' + art.numero)
    }
  }
}
</script>
