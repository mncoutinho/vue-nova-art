<template>
  <div>
    <br>
     <label v-if="this.$store.getters['art/getPossuiContratoCadastrado']">{{profissional.nome || profissional.label}}
     </label>&nbsp;&nbsp;&nbsp;
      <q-icon color="red" name="fas fa-exclamation-circle" v-if="this.$store.getters['art/getPossuiContratoCadastrado']">
        <q-popover>
          <q-card-main>
            ART já possui contrato(s) cadastrados. Por isso não é permitido alterar o tipo de registro. Para alterar o tipo registro remova os contratos.
          </q-card-main>
        </q-popover>
      </q-icon><br/>
      <div class="row">
        <div class="col-11">
          <q-search v-if="!profissional && !this.$store.getters['art/getPossuiContratoCadastrado']"
                    v-model="termosBusca"
                    placeholder="Busca Profissional">
            <q-autocomplete :min-characters="6" @search="busca" @selected="seleciona" />
          </q-search>
        </div>
        <div v-if="!(profissional && !this.$store.getters['art/getPossuiContratoCadastrado'])" style="margin-top: 20px" class="col-1">
          <info-help v-model="showing" tipo="profissionalContratadoSearch" />
        </div>
      </div>
      <div class="row">
        <div class="col-11">
          <q-input v-if="profissional && !this.$store.getters['art/getPossuiContratoCadastrado']"
             readonly
             float-label="Profissional"
             :value="profissional.nome || profissional.label"
             :after="[{ icon: 'fas fa-eraser', handler () { apagarProfissional() } }]" />
        </div>
      </div>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
import { filter } from 'quasar'
export default {
  components: {
    InfoHelp
  },
  created () {
    this.user = this.$store.getters['user/getUser']
    this.profissional = this.$store.getters['art/getProfissionalContratado']
  },
  data () {
    return {
      showing: false,
      id: null,
      termosBusca: '',
      profissional: null,
      profissionalResultado: ''
    }
  },
  methods: {
    async busca (termosBusca, done) {
      let listResult = []
      await this.pesquisaProfissional(termosBusca)
      listResult = this.profissionalResultado
      done(filter(termosBusca, {field: 'value', list: listResult}))
    },
    async pesquisaProfissional (termosBusca) {
      let result = []
      await this.$axios
        .post('cadastro/profissional/quadro-tecnico', {idEmpresa: this.user.registro, tipoPessoa: 'EMPRESA', nomePessoa: termosBusca})
        .then(response => {
          response.data.data.forEach(function (el) {
            result.push({value: el.profissional.nome, label: el.profissional.nome, id: el.profissional.id})
          })
        })
      this.profissionalResultado = result
    },
    seleciona (profissional) {
      this.atualizaProfissional(profissional)
    },
    apagarProfissional () {
      this.termosBusca = null
      this.atualizaProfissional(null)
    },
    atualizaProfissional (profissional) {
      this.$axios
        .put('art/profissional-contratado', {id: profissional === null ? null : profissional.id, numero: this.$store.getters['art/getNumero']})
        .then(response => {
          this.profissional = profissional
          this.$store.commit('art/setProfissionalContratado', profissional)
        })
    }
  }
}
</script>
