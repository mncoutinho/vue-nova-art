<template>
  <div>
    <!-- <q-card v-if="this.$store.getters['art/getPossuiContratoCadastrado']">
      <q-card-title>
        <q-icon slot="right" name="live_help">
          <q-popover>
            <q-card-main>
              ART já possui contrato(s) cadastrados. Por isso não é permitido alterar a empresa. Para alterar a empresa remova os contratos.
            </q-card-main>
          </q-popover>
        </q-icon>
        <label>{{nomeEmpresa}}</label><br/>
      </q-card-title>
    </q-card> -->
    <q-input v-if="true"
      color="secondary"
      v-model="cnpj"
      float-label="CNPJ da Empresa"
      placeholder="Somente números"
      @input="getEmpresaPeloCnpj"
      :after="[{ icon: 'live_help', handler () { showing = true } }]"
    />
    <q-input disable v-if="nomeEmpresa !== null && true" v-model="nomeEmpresa" float-label="Nome da Empresa" style="margin-top: 10px" />
  </div>
</template>
<script>
export default {
  created () {
    let empresa = this.$store.getters['art/getEmpresaContratado']
    if (typeof empresa !== 'undefined' && empresa !== null) {
      this.cnpj = empresa.cnpj
      this.nomeEmpresa = empresa.nome
    }
  },
  data () {
    return {
      cnpj: '',
      nomeEmpresa: null,
      showing: false
    }
  },
  methods: {
    getEmpresaPeloCnpj (value) {
      if (value.length === 14) {
        this.$axios
          .get('cadastro/empresa/consulta-por-cnpj/' + value)
          .then(response => {
            let empresa = response.data.data[0]
            this.nomeEmpresa = response.data.data[0].nome
            this.$axios
              .put('art/empresa-contratado', {id: response.data.data[0].id, numero: this.$store.getters['art/getNumero']})
              .then(response => {
                this.$store.commit('art/setEmpresaContratado', empresa)
              })
          })
          .catch(() => {
            this.$q.notify({message: 'Empresa não localizada!', timeout: 1500, type: 'negative', position: 'center'})
            this.cnpj = ''
          })
      }
    }
  }
}
</script>
