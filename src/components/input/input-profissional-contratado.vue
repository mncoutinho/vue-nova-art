<template>
  <div>
    <q-card v-if="this.$store.getters['art/getPossuiContratoCadastrado']">
      <q-card-title>
        <q-icon slot="right" name="fas fa-question-circle">
          <q-popover>
            <q-card-main>
              ART já possui contrato(s) cadastrados. Por isso não é permitido alterar o profissional. Para alterar o profissional remova os contratos.
            </q-card-main>
          </q-popover>
        </q-icon>
        <label>{{nomeProfissional}}</label><br/>
      </q-card-title>
    </q-card>
    <div class="row">
      <div class="col-11">
        <q-input v-if="!this.$store.getters['art/getPossuiContratoCadastrado']"
          color="secondary"
          v-model="cpf"
          float-label="CPF do Profissional"
          @input="getProfissionalPelocpf"/>
      </div>
      <div style="margin-top: 30px" class="col-1">
        <info-help v-model="showing" tipo="profissionalContratadoInput" />
      </div>
    </div>
    <div class="row">
      <div class="col-11">
        <q-input disable v-if="nomeProfissional !== null && true" v-model="nomeProfissional" float-label="Nome do Profissional" style="margin-top: 10px" />
      </div>
    </div>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    let profissional = this.$store.getters['art/getProfissionalContratado']
    if (typeof profissional !== 'undefined' && profissional !== null) {
      this.cpf = profissional.cpf
      this.nomeProfissional = profissional.nome
    }
  },
  data () {
    return {
      cpf: '',
      nomeProfissional: null,
      showing: false
    }
  },
  methods: {
    getProfissionalPelocpf (value) {
      if (value.length === 11) {
        this.$axios
          .get('cadastro/profissional/consulta-por-cpf/' + value)
          .then(response => {
            this.nomeProfissional = response.data.data[0].nome
            let profissional = response.data.data[0]
            this.$axios
              .put('art/profissional-contratado', {id: profissional === null ? null : profissional.id, numero: this.$store.getters['art/getNumero']})
              .then(response => {
                this.$store.commit('art/setProfissionalContratado', profissional)
              })
          })
          .catch(() => {
            this.$q.notify({message: 'Profissional não localizado!', timeout: 1500, type: 'negative', position: 'center'})
            this.cpf = ''
          })
      }
    }
  }
}
</script>
