<template>
  <div class="row gutter-x-sm">
    <div class="col-7 q-mb-md" v-if="this.$store.getters['art/ehModelo']">
      <q-field icon="fas fa-asterisk"
               icon-color="red-9">
        <q-input v-model="descricao"
                 color="secondary"
                 float-label="Descrição do modelo"
                 maxlength="50"
                 @input="atualizaDescricao"
                 :error="validado" />
      </q-field>
    </div>
    <div class="col-5 q-mb-md" v-if="!(this.$store.getters['art/ehModelo'] && descricao === '')">
      <select-natureza :natureza="natureza" @atualizouNatureza = "atualizouNatureza" />
    </div>
  </div>
</template>
<script>
import SelectNatureza from '../selects/select-natureza'
import _ from 'lodash'
export default {
  props: ['natureza', 'descricaoModelo'],
  components: {
    SelectNatureza
  },
  data () {
    return {
      descricao: '',
      validado: false
    }
  },
  methods: {
    atualizaDescricao: _.debounce(function (value) {
      if (this.$store.getters['art/ehArtEmEdicao']) {
        if (value !== '') {
          this.$axios
            .put('art/modelo/descricao', { descricao: value, numero: this.$store.getters['art/getNumero'] })
            .then(response => {
              this.$store.commit('art/setDescricaoModelo', value)
              this.validado = false
            })
        } else {
          this.validado = true
        }
      } else {
        this.$store.commit('art/setDescricaoModelo', value)
      }
    }, 500),
    atualizouNatureza () {
      this.$emit('atualizouNatureza')
    }
  },
  watch: {
    descricaoModelo: function (value) {
      this.descricao = value
    }
  }
}
</script>
