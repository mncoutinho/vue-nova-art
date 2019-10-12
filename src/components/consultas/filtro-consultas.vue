<template>
  <div>
      <q-collapsible icon="fas fa-filter" ref="collapise"  v-model="open" label="Filtrar minhas ARTs" opened>
        <div>
         <div style="width: 800px; max-width: 90vw; margin-top:20px;">
              <div class="col-12">
                <q-option-group
                  type="radio"
                  inline
                  class="full-width "
                  color="secondary"
                  v-model="opcaoFiltro"
                  :options="[
                    { label: 'Número ART     ', value: 'numeroArt', color: 'grey-7' },
                    { label: 'Número ART Principal', value: 'numeroArtPrincipal', color: 'grey-7' },
                    { label: 'Nome do Contratante', value: 'nomeContratante', color: 'grey-7' },
                    { label: 'Mais Filtro', value: 'maisFiltros', color: 'grey-7' }
                  ]"
                />
              </div>
          </div>
          <div class="row gutter-x-xl" style="margin-top:20px;">
                <div class="col-8" >
                  <q-search
                   v-show="opcaoFiltro === 'numeroArt'"
                   v-model="termsNumeroArt" placeholder="Número da ART ..."
                   style="margin-top: 18px;">
                      <q-autocomplete
                      :min-characters="4"
                      @search="searchNumeroArt" />
                  </q-search>
                  <q-search
                  v-show="opcaoFiltro === 'numeroArtPrincipal'"
                  v-model="termsNumeroArtPrincipal"
                  placeholder="Número da ART Principal ..."
                  style="margin-top: 18px;">
                      <q-autocomplete
                      :min-characters="4"
                      @search="searchNumeroArtPrincipal" />
                  </q-search>
                  <q-search
                  v-show="opcaoFiltro === 'nomeContratante'"
                  v-model="termsNomeContratante" placeholder="Nome do Contratante ..."
                  style="margin-top: 18px;">
                      <q-autocomplete
                      :min-characters="4"
                      @search="searchNomeContratante" />
                  </q-search>
              </div>
          </div>
          <div
          class="row gutter-x-xl"
          v-show="opcaoFiltro === 'maisFiltros'">
              <div class="col-6">
                <q-select v-model="pesquisa.idNatureza"
                          :options="listNatureza"
                          color="secondary"
                          float-label="Tipo de Registro"
                          placeholder="Escolha o tipo de registro" />
              </div>
              <div class="col-6">
                <q-select v-model="pesquisa.idTipo"
                          :options="listTipoArt"
                          color="secondary"
                          float-label="Forma de Registro"
                          placeholder="Escolha a forma de registro" />
              </div>
          </div>
          <br>
          <div class="row gutter-x-xl" v-show="opcaoFiltro === 'maisFiltros'">
            <div class="col-3">
                  <q-input v-model="pesquisa.dataInicioContrato"
                          float-label="Dt. início contrato:"
                          masked="false" class="full-width"
                          v-mask="'##/##/####'"
                          suffix=" até " />
                </div>
                <div class="col-3">
                  <q-input v-model="pesquisa.dataFimContrato"
                          float-label="Dt. fim de contrato:"
                          masked="false"
                          v-mask="'##/##/####'" />
              </div>
                              <div class="col-3">
                   <q-input v-model="pesquisa.dataInicioCadastro"
                          float-label="Dt. início cadastro:"
                          masked="false"
                          v-mask="'##/##/####'"
                          suffix=" até " />
                </div>
                <div class="col-3">
                    <q-input v-model="pesquisa.dataFimCadastro"
                          float-label="Dt. fim cadastro:"
                          masked="false"
                          v-mask="'##/##/####'" />
                </div>
          </div>
          <br>
          <div class="row gutter-x-xl" v-show="opcaoFiltro === 'maisFiltros'">
            <div class="col-3">
               <q-input v-model="pesquisa.dataInicioPagamento"
                          float-label="Dt. início pagamento:"
                          masked="false"
                          v-mask="'##/##/####'"
                          suffix=" até " />
              </div>
              <div class="col-3">
                  <q-input v-model="pesquisa.dataFimPagamento"
                          float-label="Dt. fim pagamento:"
                          masked="false"
                          v-mask="'##/##/####'" />
              </div>

          </div>
          <br>
          <div class="row gutter-x-xl" v-show="opcaoFiltro === 'maisFiltros'">
            <div class="col-12">
                <div class="row justify-end q-mt-lg">
                  <botao v-show="opcaoFiltro === 'maisFiltros'"
                        :label="'Limpar Filtros'"
                        :type="'secondary'"
                        :icon="'fas fa-eraser'"
                        @emit="limparFiltros()" />
                  &nbsp;&nbsp;&nbsp;
                  <botao v-show="opcaoFiltro === 'maisFiltros'"
                        :label="'Pesquisar'"
                        :icon="'find_replace'"
                        @emit="pesquisar(); opened = false" />
                </div>
              </div>
          </div>
        </div>
      </q-collapsible>
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
import PesquisaConsultaArt from '../../components/models/PesquisaConsultaArt'
import { mask } from 'vue-the-mask'
import listNatureza from 'assets/listNatureza'
import listTipoArt from 'assets/listTipoArt'
export default {
  components: { Botao },
  directives: { mask },
  created () {
    this.opcaoFiltro = 'maisFiltros'
    this.user = this.$store.getters['user/getUser']
    this.pesquisa = new PesquisaConsultaArt(this.user.registro, this.user.tipoPessoa)
  },
  data () {
    return {
      open: false,
      user: {},
      pesquisa: {},
      opcaoFiltro: null,
      opened: false,
      listNatureza,
      listTipoArt,
      termsNumeroArt: '',
      termsNumeroArtPrincipal: '',
      termsNomeContratante: ''
    }
  },
  methods: {
    async searchNumeroArt (terms, done) {
      this.$emit('autocomplete', { tipo: 'numeroArt', terms: terms, done: done, pesquisa: this.pesquisa })
    },
    async searchNumeroArtPrincipal (terms, done) {
      this.$emit('autocomplete', { tipo: 'numeroArtPrincipal', terms: terms, done: done, pesquisa: this.pesquisa })
    },
    async searchNomeContratante (terms, done) {
      this.$emit('autocomplete', { tipo: 'nomeContratante', terms: terms, done: done, pesquisa: this.pesquisa })
    },
    pesquisar () {
      this.$refs.collapise.hide()
      this.$emit('pesquisar', this.pesquisa)
    },
    limparFiltros () {
      this.user = this.$store.getters['user/getUser']
      this.pesquisa = new PesquisaConsultaArt(this.user.registro, this.user.tipoPessoa)
      this.termsNumeroArt = ''
      this.termsNumeroArtPrincipal = ''
      this.termsNomeContratante = ''
    }
  },
  watch: {
    opcaoFiltro: function (value, oldValue) {
      this.limparFiltros()
    }
  }
}
</script>
