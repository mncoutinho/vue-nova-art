<template>
  <div>
    <q-step name="contratado" title="Contratado">

      <select-empresa-contratado v-if="user.tipoPessoa == 'PROFISSIONAL' && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"
                                 :idPessoa="user.registro" :tipoPessoa="user.tipoPessoa" :idEmpresaContratado="idEmpresaContratado"
                                 @editaEmpresaContratado="editaEmpresaContratado">
      </select-empresa-contratado>

      <search-profissional-qt v-if="user.tipoPessoa == 'EMPRESA' && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"
                              :idPessoa="user.registro" :tipoPessoa="user.tipoPessoa" :idProfissionalContratado="idProfissionalContratado"
                              @editaProfissionalContratado="editaProfissionalContratado">
      </search-profissional-qt>

      <input-empresa-contratado v-if="user.tipoPessoa == 'PROFISSIONAL' && this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"
                                :empresa="empresa" @editaEmpresaContratado="editaEmpresaContratado">
      </input-empresa-contratado>

      <input-profissional-contratado v-if="user.tipoPessoa == 'EMPRESA' && this.$store.getters['art/ehDesempenhoDeCargoEFuncao']"
                                    :profissional="profissional" @editaProfissionalContratado="editaProfissionalContratado">
      </input-profissional-contratado>

      <q-stepper-navigation>
        <q-btn size="sm" color="blue-10" icon="play_for_work" @click="continua()">Continuar</q-btn>
      </q-stepper-navigation>
    </q-step>
  </div>
</template>

<script>
import InputEmpresaContratado from '../input/input-empresa-contratado'
import InputProfissionalContratado from '../input/input-profissional-contratado'
export default {
  props: ['empresa', 'profissional'],
  components: {
    InputEmpresaContratado,
    InputProfissionalContratado
  },
  mounted () {
    this.art = this.$store.getters['art/getArt']
    this.user = this.$store.getters['user/getUser']
  },
  data () {
    return {
      art: { empresa: { id: '' } },
      user: {},
      idProfissionalContratado: null,
      idEmpresaContratado: null,
      idEntidadeClasse: null
    }
  },
  methods: {
    editaEmpresaContratado (value) {
      this.$axios
        .put('art/empresa-contratado', {id: value.id, numero: this.$store.getters['art/getNumero']})
        .then(response => {
          this.$store.commit('art/setEmpresaContratado', value)
        })
    },
    editaProfissionalContratado (value) {
      this.$axios
        .put('art/profissional-contratado', {id: value.id, numero: this.$store.getters['art/getNumero']})
        .then(response => {
          this.$store.commit('art/setProfissionalContratado', value)
        })
    },
    continua () {
      this.$emit('prosseguir')
    }
  },
  watch: {
    profissional: function (value, oldValue) {
      if (value !== null) {
        this.idProfissionalContratado = value.id
      }
    },
    empresa: function (value, oldValue) {
      if (value !== null) {
        this.idEmpresaContratado = value.id
      }
    }
  }
}
</script>
