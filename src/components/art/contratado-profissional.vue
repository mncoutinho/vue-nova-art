<template>
  <div>
    <search-profissional-qt v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"/>
    <input-profissional-contratado v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" />
  </div>
</template>
<script>
import SearchProfissionalQt from '../searchs/search-profissional-qt'
import InputProfissionalContratado from '../input/input-profissional-contratado'
export default {
  components: {
    SearchProfissionalQt,
    InputProfissionalContratado
  }
}
</script>
