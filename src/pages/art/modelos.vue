<template>
  <div>
  <q-page padding class="docs-table">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="ART" icon="library_books" />
      <q-breadcrumbs-el label="Modelos" icon="library_books" />
    </q-breadcrumbs>
    <br>
    <q-table
      ref="table"
      color="secondary"
      class="no-border-grid"
      row-key="descricao"
      :data="listModelos"
      :columns="columns"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label = "Nenhum modelo para exibir."
      no-results-label="Nenhum modelo para exibir"
      rows-per-page-label="Modelos por página:"
    >
    <template slot="top-right" slot-scope="props">
      <botao :label="'Criar Modelo'"
              :icon="'fas fa-file-alt'"
              @emit="novoModelo()" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="descricaoModelo" :props="props">
       <small class="text-italic">{{ props.row.descricaoModelo }}</small>
      </q-td>
      <q-td key="natureza" :props="props">
       <small>{{ props.row.natureza }}</small>
      </q-td>
      <q-td key="acaoEditar" :props="props">
            <q-btn-dropdown label="Ações"
                color="dark" size="10px"
                flat rounded>
                <q-list link>
                  <q-item v-close-overlay @click.native="aplicar(props.row.numero)">
                    <q-item-side color="dark" icon="far fa-copy" />
                    <q-item-main >
                      Gerar ART com base no modelo
                    </q-item-main>
                  </q-item>
                  <q-item v-close-overlay @click.native="editar(props.row.numero)">
                    <q-item-side color="dark" icon="edit" />
                    <q-item-main >
                      Editar
                    </q-item-main>
                  </q-item>
                   <q-item v-close-overlay @click.native="$refs.modalPreview.toggle(props.row)"  >
                    <q-item-side color="dark" icon="visibility" />
                    <q-item-main>
                      Visualizar
                    </q-item-main>
                  </q-item>
                  <q-item v-close-overlay @click.native="excluir(props.row.numero)">
                    <q-item-side color="dark" icon="clear" />
                    <q-item-main >
                      Excluir
                    </q-item-main>
                  </q-item>
                </q-list>
            </q-btn-dropdown>
      </q-td>
    </q-tr>
    </q-table>
    <modal-preview-art ref="modalPreview" />
  </q-page>
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
import ModalPreviewArt from '../../components/modais/modal-preview-art'
export default {
  components: {
    Botao,
    ModalPreviewArt
  },
  created () {
    this.getListModelos()
  },
  data () {
    return {
      listModelos: [],
      columns: [
        { name: 'descricaoModelo', align: 'left', label: 'Descrição', field: 'descricaoModelo' },
        { name: 'natureza', align: 'left', label: 'Natureza', field: 'natureza' },
        { name: 'acaoEditar', label: '', field: 'acaoEditar' }
      ]
    }
  },
  methods: {
    getListModelos () {
      this.$axios
        .post('art/modelos', {tipoPessoa: this.$store.getters['user/getTipoPessoa'], idPessoa: this.$store.getters['user/getUserRegistro']})
        .then(response => {
          this.listModelos = response.data.data
        })
    },
    novoModelo () {
      this.$router.push('/art/modelo')
    },
    aplicar (numero) {
      this.$axios
        .post('art/modelo/aplicar/' + numero)
        .then(response => {
          this.$router.push('/art/editar/' + response.data.data)
        })
    },
    editar (numeroArt) {
      this.$router.push('/art/modelo/' + numeroArt)
    },
    excluir (numeroArt) {
      this.$axios
        .delete('art/modelo/' + numeroArt)
        .then(response => {
          this.$q.notify({message: 'Modelo excluído com sucesso!', timeout: 1500, type: 'positive', position: 'center'})
          this.getListModelos()
        })
    }
  }
}
</script>
