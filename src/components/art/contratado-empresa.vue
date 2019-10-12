<template>
  <div>
        <select-empresa-contratado v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" />
        <!-- <input-empresa-contratado v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" /> -->
    <br>
  </div>
</template>
<script>
import SelectEmpresaContratado from '../selects/select-empresa-contratado'
import InputEmpresaContratado from '../input/input-empresa-contratado'
export default {
  components: {
    SelectEmpresaContratado,
    InputEmpresaContratado
  }
}
</script>
