<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-select float-label="Finalidade"
                v-model="id"
                :options="listOptions"
                filter
                @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="finalidade" />
          </div>
        </div>
    </q-field>
</div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    let tipo = this.$store.getters['art/getFinalidade']
    if (tipo !== null && tipo !== undefined) {
      this.id = tipo.id
    }
    this.getFinalidades()
  },
  data () {
    return {
      listOptions: [],
      showing: false,
      id: null
    }
  },
  methods: {
    getFinalidades () {
      let listTemp = []
      this.$axios
        .get('art/finalidades')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listOptions = listTemp
        })
    },
    atualiza (value) {
      this.$axios
        .put('art/contratos/finalidade', { id: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setFinalidade', { id: value })
        })
    }
  }
}
</script>
