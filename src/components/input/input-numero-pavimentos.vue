<template>
  <div>
    <div class="row">
          <div class="col-11">
            <q-input
             v-model="numeroDePavimentos"
             float-label="N° Pavimentos"
             color="secondary"
             @input="atualiza"
             v-mask="customMask"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="numeroPavimentos" />
          </div>
        </div>
  </div>
</template>
<script>
import {mask} from 'vue-the-mask'
import _ from 'lodash'
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    this.numeroDePavimentos = this.$store.getters['art/getNumeroPavimentos']
  },
  data () {
    return {
      numeroDePavimentos: null,
      showing: false,
      customMask: {
        mask: '####',
        tokens: {
          '#': {pattern: /[0-9]/}
        }
      }
    }
  },
  directives: {mask},
  methods: {
    atualiza: _.debounce(function (value, oldValue) {
      this.$axios
        .put('art/contratos/numero-pavimentos', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setNumeroPavimentos', value)
        })
    }, 1000)
  }
}
</script>
