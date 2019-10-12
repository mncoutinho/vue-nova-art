<template>
  <div>
    <q-table
      ref="table"
      class="no-border-grid"
      color="secondary"
      :data="capitalSocial"
      :columns="columns"
      hide-bottom
      row-key="tipoCapitalSocial"
      >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="tipoCapitalSocial" :props="props">
       <small class="text-italic">{{ props.row.tipoCapitalSocial }}</small>
      </q-td>
      <q-td key="dataInclusao" :props="props">
       <small class="text-italic">{{ props.row.dataInclusao}}</small>
      </q-td>
      <q-td key="valorCapital" :props="props">
        <small class="text-italic">{{ props.row.valorCapital}}</small>
      </q-td>
      <q-td key="faixaCapital" :props="props">
        <small class="text-italic">{{ props.row.faixaCapital}}</small>
      </q-td>
      <q-td key="acaoDetalhar" :props="props">
        <q-btn-dropdown label="Ações" color="dark" size="10px" flat rounded>
          <q-list link>
            <q-item v-close-overlay @click.native="$refs.modalCapitalSocial.toggle(props.row)">
              <q-item-side color="dark" icon="edit" />
              <q-item-main >
                Detalhar
              </q-item-main>
            </q-item>
          </q-list>
      </q-btn-dropdown>
      </q-td>
    </q-tr>
    </q-table>
    <modal-capital-social ref="modalCapitalSocial"/>
  </div>
</template>
<script>
import ModalCapitalSocial from '../empresa/modal-capital-social'
export default {
  components: {
    ModalCapitalSocial
  },
  props: ['capitalSocial'],
  data () {
    return {
      columns: [
        { name: 'tipoCapitalSocial', align: 'center', label: 'TIPO CAPITAL SOCIAL', field: 'tipoCapitalSocial' },
        { name: 'dataInclusao', align: 'center', label: 'DATA INCLUSÃO', field: 'dataInclusao' },
        { name: 'valorCapital', align: 'center', label: 'VALOR CAPITAL', field: 'valorCapital' },
        { name: 'faixaCapital', align: 'center', label: 'FAIXA CAPITAL', field: 'faixaCapital' },
        { name: 'acaoDetalhar', align: 'center', label: '', field: 'acaoDetalhar' }
      ]
    }
  }
}
</script>
