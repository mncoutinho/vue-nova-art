<template>
  <div>
    <q-list no-border>
      <q-item>
        <q-item-side avatar="http://portalservicos.crea-rj.org.br/images/brazil.jpg" />
        <q-item-main
          :label="'Nº ART: ' + this.$store.getters['art/getNumero']"
          :sublabel="descricaoNatureza"
        />
        <q-item-side right>
          <q-item-tile stamp>Data de cadastro: {{dataCadastro}}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import listNatureza from '../../assets/listNatureza'
import { date } from 'quasar'
export default {
  components: {
    listNatureza
  },
  created () {
    this.dataCadastro = date.formatDate(this.$store.getters['art/getDataCadastroFormatada'], 'DD/MM/YYYY')
  },
  data () {
    return {
      dataCadastro: ''
    }
  },
  methods: {
    getDescricaoNaturezaPorId () {
      let natureza = listNatureza.filter(function (el) { return el.value === this.art.natureza.id })
      return natureza[0].label
    }
  },
  computed: {
    descricaoNatureza: {
      get () {
        let idNatureza = this.$store.getters['art/getIdNatureza']
        if (idNatureza !== undefined) {
          let natureza = listNatureza.filter(function (el) { return el.value === idNatureza })
          return natureza[0].label
        }
      }
    }
  }
}
</script>
