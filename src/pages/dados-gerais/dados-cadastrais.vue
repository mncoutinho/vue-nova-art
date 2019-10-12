<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Dados Gerais" icon="account_box" />
      <q-breadcrumbs-el  label="Dados Cadastrais" icon="fas fa-user-edit"/>
    </q-breadcrumbs>
    <br>
    <dados-pessoais v-if="this.$store.getters['user/ehProfissional'] === true"
      :dadosCadastrais="dadosCadastrais"
      :assinatura="assinatura"
      >
    </dados-pessoais>
    <dados-empresa v-if="this.$store.getters['user/ehEmpresa'] === true" :dadosCadastrais="dadosCadastrais"></dados-empresa>
      <br>
      <!-- CAPITAL SOCIAL -->
      <q-card v-if="this.$store.getters['user/ehEmpresa']">
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">CAPITAL SOCIAL  </label>
        </q-card-title>
        <q-card-main>
          <grid-capital-social :capitalSocial="listCapitalSocial"></grid-capital-social>
        </q-card-main>
      </q-card>
      <br v-if="this.$store.getters['user/ehEmpresa']">
      <!-- SÓCIOS -->
      <q-card v-if="this.$store.getters['user/ehEmpresa']">
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">SÓCIOS  </label>
        </q-card-title>
        <q-card-main>
          <grid-socios />
        </q-card-main>
      </q-card>
      <br v-if="this.$store.getters['user/ehEmpresa']">
      <q-card >
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">ENDEREÇO  </label>
        </q-card-title>
        <q-card-main>
          <grid-endereco v-if="!this.$store.getters['user/ehEmpresa']" :enderecos="dadosCadastrais.pessoa.enderecos" :idPessoa="dadosCadastrais.pessoa.id"></grid-endereco>
          <grid-endereco v-if="this.$store.getters['user/ehEmpresa']" :enderecos="dadosCadastrais.enderecosValidos" :idPessoa="dadosCadastrais.id"></grid-endereco>
        </q-card-main>
      </q-card>
      <br>
      <q-card >
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">TELEFONE  </label>
        </q-card-title>
        <q-card-main>
          <grid-telefone v-if="!this.$store.getters['user/ehEmpresa']" :telefones="dadosCadastrais.pessoa.telefones" :idPessoa="dadosCadastrais.pessoa.id"></grid-telefone>
          <grid-telefone v-if="this.$store.getters['user/ehEmpresa']" :telefones="dadosCadastrais.telefones" :idPessoa="dadosCadastrais.id"></grid-telefone>
        </q-card-main>
        <spinner :showSpinner="showSpinner"></spinner>
      </q-card>
  </q-page>
</template>
<script>
import Spinner from '../../components/partials/spinner'
import DadosPessoais from '../../components/dados-gerais/profissional/dados-pessoais'
import DadosEmpresa from '../../components/dados-gerais/empresa/dados-empresa'
import GridCapitalSocial from '../../components/dados-gerais/empresa/grid-capital-social'
import GridSocios from '../../components/dados-gerais/empresa/grid-socios'
import GridTelefone from '../../components/grids/grid-telefone'
import GridEndereco from '../../components/grids/grid-endereco'
import InputEmail from '../../components/input/input-email'
export default {
  components: {
    GridSocios,
    Spinner,
    GridCapitalSocial,
    DadosEmpresa,
    DadosPessoais,
    InputEmail,
    GridTelefone,
    GridEndereco
  },
  created () {
    this.showSpinner = true
    this.getDadosCadastrais()
    this.getAssinatura()
  },
  data () {
    return {
      dadosCadastrais: {
        pessoa: {
          enderecos: [],
          telefones: []
        }
      },
      user: {},
      showSpinner: '',
      listCapitalSocial: [],
      assinatura: null
    }
  },
  methods: {
    async getDadosCadastrais () {
      if (this.$store.getters['user/ehProfissional']) {
        await this.$axios
          .get('pessoa/fisica/detalhar/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.dadosCadastrais = response.data.data[0]
            this.showSpinner = false
          })
      }
      if (this.$store.getters['user/ehEmpresa']) {
        await this.$axios
          .get('cadastro/empresa/detalhar/dados-gerais/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.dadosCadastrais = response.data.data[0]
            this.listCapitalSocial.push(response.data.data[0].capitalSocial)
            this.showSpinner = false
          })
      }
    },
    async getAssinatura () {
      if (this.$store.getters['user/getUserRegistro'] !== undefined) {
        await this.$axios
          .get('cadastro/pessoa-fisica/assinatura/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.assinatura = response.data.data
          })
      }
    }
  }
}
</script>
