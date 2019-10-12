<template>
  <div>
     <q-field  icon="fas fa-asterisk" icon-color="white" helper="Ex: (+/-)43.123456, o sinal deverá ser indicado ou não.">
       <div class="row">
          <div class="col-11">
            <q-input :value="value"
                     v-mask="customMask"
                     float-label="Longitude"
                     @input="atualiza"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="longitude" />
          </div>
        </div>
     </q-field>
  </div>
</template>
<script>
import {mask} from 'vue-the-mask'
import InfoHelp from '../../info/info-help'
export default {
  props: ['value'],
  components: {InfoHelp},
  data () {
    return {
      showing: false,
      customMask: {
        mask: 'P##,######',
        tokens: {
          'P': {pattern: /[-+]/},
          '#': {pattern: /[0-9]/}
        }
      }
    }
  },
  directives: {mask},
  methods: {
    atualiza (value) {
      this.$emit('input', value)
    }
  }
}
</script>
