<template>
  <div>
    <span style="color: #979797; font-size: 0.75rem">Salário</span>
    <q-field v-if="temProlabore" class="col q-input-target q-no-input-spinner ellipsis"
    helper=" ">
          <money
             v-model.lazy="salario"
             v-bind="money"
             @input="atualiza"
             align="left"
             maxlength="25" />
    </q-field>
    <q-field icon="fas fa-asterisk"
          icon-color="red-9" v-if="!temProlabore">
          <money
            v-model.lazy="salario"
            v-bind="money"
            @input="atualiza"
            class="col q-input-target text-left"
            align="left"
            maxlength="25" />
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import {Money} from 'v-money'
export default {
  components: {Money},
  props: {
    temProlabore: Boolean
  },
  created () {
    if (this.$store.getters['art/getSalario']) {
      this.salario = this.$store.getters['art/getSalario']
    } else {
      this.salario = 0.0
    }
  },
  data () {
    return {
      salario: 0.0,
      showing: false,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        prefix: 'R$',
        masked: false
      }
    }
  },
  methods: {
    atualiza: _.debounce(function (value) {
      this.$axios
        .put('art/contratos/salario', { valor: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setSalario', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar o salário, favor tentar novamente', 'negative', 1500)
        })
    }, 1000)
  }
}
</script>
