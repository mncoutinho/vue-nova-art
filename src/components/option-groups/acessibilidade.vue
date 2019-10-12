<template>
  <div>
      <q-card>
      <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view" >ACESSIBILIDADE</label>
          <info-help v-model="showing" tipo="acessibilidade" />
      </q-card-title>
      <q-card-main>
        <q-option-group
          :disable="sequencialDoContrato !== 1"
          color="secondary"
          type="radio"
          @input="atualiza"
          v-model="acessibilidade"
          :options="[
            { label: '<b>SIM</b>:&nbsp;&nbsp;&nbsp;DECLARO ATENDIMENTO ÀS REGRAS DE ACESSIBILIDADE PREVISTAS NAS NORMAS TÉCNICAS DA ABNT, NA LEGISLAÇÃO ESPECÍFICA E NO DECRETO Nº 5.296, DE 2 <br>DE DEZEMBRO DE 2004.', value: true, color: 'green' },
            { label: '<div style=innerbox><b> NÃO</b>: &nbsp;&nbsp;DECLARO QUE AS REGRAS DE ACESSIBILIDADE PREVISTAS NAS NORMAS TÉCNICAS DA ABNT, NA LEGISLAÇÃO ESPECÍFICA E NO DECRETO Nº 5.296, DE 2 DE DEZEMBRO DE 2004, <br>NÃO SE APLICAM ÀS ATIVIDADES PROFISSIONAIS ACIMA RELACIONADAS.</div>', value: false, color: 'negative' }
          ]" />
      </q-card-main>
    </q-card>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    if (this.$store.getters['art/getAcessibilidade'] !== null) {
      this.acessibilidade = this.$store.getters['art/getAcessibilidade']
    }
    if (this.$store.getters['art/getSequencialContrato']) {
      this.sequencialDoContrato = this.$store.getters['art/getSequencialContrato']
    }
  },
  data () {
    return {
      acessibilidade: null,
      showing: false,
      sequencialDoContrato: 0
    }
  },
  methods: {
    atualiza (value) {
      this.$axios
        .put('art/contratos/acessibilidade', { checked: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setAcessibilidade', response.data.data.checked)
        })
    },
    showInfo () {
      this.showing = !this.showing
    }
  }
}
</script>
