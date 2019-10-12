<template>
  <div>
    <q-field icon="fas fa-asterisk"
          icon-color="red-9">
      <div class="row">
          <div class="col-11">
            <q-input v-mask="'##:##'"
               v-model="nhhjt"
               float-label="Jornada de Trabalho - Hora-Dia"
               color="secondary"
               placeholder="04:00 a 09:00 hs"
               @input="atualizaNhhjt"/>
          </div>
          <div style="margin-top: 25px" class="col-1">
            <info-help v-model="showing" tipo="nhhjt" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import {mask} from 'vue-the-mask'
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    this.nhhjt = this.$store.getters['art/getNhhjt']
  },
  data () {
    return {
      nhhjt: null,
      showing: false,
      customMask: {
        mask: '0H:M#',
        tokens: {
          'H': {pattern: /[4-9]/},
          'M': {pattern: /[0-5]/},
          '#': {pattern: /[0-9]/}

        }
      }
    }
  },
  directives: {mask},
  methods: {
    atualizaNhhjt: _.debounce(function (value) {
      if (value.length === 5) {
        if (this.validaJornadaDeTrabalho(value)) {
          this.$axios
            .put('art/contratos/nhhjt', { descricao: value, numero: this.$store.getters['art/getId'] })
            .then(response => {
              this.$store.commit('art/setNhhjt', value)
            })
        } else {
          this.nhhjt = this.$store.getters['art/getNhhjt']
          // this.$q.notify({ message: 'A jornada de trabalho deve estar compreendida entre 04:00 e 09:00 inclusive.', type: 'negative', position: 'center', timeout: 1000 })
        }
      }
    }, 100),
    validaJornadaDeTrabalho (nhhjt) {
      if (nhhjt.substring(0, 1) === '0') {
        if (nhhjt.substring(1, 2) === '9') {
          if (nhhjt.substring(3, 5) === '00') {
            return true
          } else {
            this.$q.notify({ message: 'A jornada de trabalho deve estar compreendida entre 04:00 e 09:00 inclusive.', type: 'negative', position: 'center', timeout: 1000 })
            return false
          }
        }
        // hora está no intervalo de horas válidas?
        if (nhhjt.substring(1, 2) === '4' || nhhjt.substring(1, 2) === '5' || nhhjt.substring(1, 2) === '6' || nhhjt.substring(1, 2) === '7' || nhhjt.substring(1, 2) === '8') {
          if (nhhjt.substring(3, 4) === '0' || nhhjt.substring(3, 4) === '1' || nhhjt.substring(3, 4) === '2' || nhhjt.substring(3, 4) === '3' || nhhjt.substring(3, 4) === '4' || nhhjt.substring(3, 4) === '5') {
            if (nhhjt.substring(4, 5) === '0' || nhhjt.substring(4, 5) === '5') {
              return true
            } else {
              this.$q.notify({ message: 'Os minutos devem ser terminados em 0 ou 5. (ex: 07:45 ou 07:40)', type: 'negative', position: 'center', timeout: 1000 })
              return false
            }
          } else {
            this.$q.notify({ message: 'Digite os minutos em um formato válido.', type: 'negative', position: 'center', timeout: 1000 })
            return false
          }
        } else {
          this.$q.notify({ message: 'A jornada de trabalho deve estar compreendida entre 04:00 e 09:00 inclusive.', type: 'negative', position: 'center', timeout: 1000 })
          return false
        }
      } else {
        this.$q.notify({ message: 'A jornada de trabalho deve estar compreendida entre 04:00 e 09:00 inclusive.', type: 'negative', position: 'center', timeout: 1000 })
        return false
      }
    }
  }
}
</script>
