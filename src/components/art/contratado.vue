<template>
  <div>
    <div class="row">
      <div class="col-12">
        <contratado-profissional-logado v-if="this.$store.getters['user/ehProfissional']"/>
        <contratado-profissional v-if="this.$store.getters['user/ehEmpresa']" /><br/>
        <contratado-empresa-logado v-if="this.$store.getters['user/ehEmpresa']" />
      </div>
      <div class="col-5">
        <contratado-empresa v-if="this.$store.getters['user/ehProfissional'] && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao'] && !this.$store.getters['art/ehReceituarioAgronomico']" />
      </div>
    </div>
  </div>
</template>

<script>
import ContratadoEmpresa from './contratado-empresa'
import ContratadoProfissional from './contratado-profissional'
import ContratadoProfissionalLogado from './contratado-profissional-logado'
import ContratadoEmpresaLogado from './contratado-empresa-logado'
export default {
  components: {
    ContratadoEmpresa,
    ContratadoProfissional,
    ContratadoProfissionalLogado,
    ContratadoEmpresaLogado
  }
}
</script>
