<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Dados Gerais" icon="account_box" />
      <q-breadcrumbs-el  label="Currículo" icon="fas fa-list-alt" />
    </q-breadcrumbs>
    <br>
    <curriculo-profissional v-if="this.$store.getters['user/ehProfissional'] === true" />
    <curriculo-empresa v-if="this.$store.getters['user/ehEmpresa'] === true" />
  </q-page>
</template>
<script>
import CurriculoProfissional from '../../components/dados-gerais/profissional/curriculo-profissional'
import CurriculoEmpresa from '../../components/dados-gerais/empresa/curriculo-empresa'
export default {
  components: {
    CurriculoProfissional,
    CurriculoEmpresa
  }
}
</script>
