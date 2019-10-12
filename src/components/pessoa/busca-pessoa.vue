<template>
  <div>
     <!-- :label="tipo === 'EDICAO' ? 'Atualizar atividade' : 'Incluir Atividade no Livro de ordem'" -->
    <q-btn size="sm" class="full-width"
           rounded color="green" icon="fas fa-user-plus"
           :label="titulo"
           @click="opened = true" />

    <q-modal v-model="opened" :content-css="{minWidth: '78vw', minHeight: '35vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">
            Pessoa
          </q-toolbar-title>
          <q-btn flat round dense
                  color="white" icon="clear"
                  v-close-overlay />
        </q-toolbar>
        <div class="layout-padding ">
            <div class="row gutter-x-sm gutter-y-sm">
              <div class="col-5">
                <q-select
                  color="secondary"
                  float-label="Buscar Por"
                  v-model="pesquisa.tipo"
                  placeholder="Tipo de busca"
                  :options="defineListTipoBusca()" />
              </div>
            </div>
            <br>
            <div class="row gutter-x-sm gutter-y-sm">
              <div class="col-12">
                <cpf v-if="pesquisa.tipo === 1" @edita="edita" :tipoPessoa="tipoPessoa" />
                <cnpj v-if="pesquisa.tipo === 2" @edita="edita" :tipoPessoa="tipoPessoa" />
                <nome-pf v-if="pesquisa.tipo === 3" @edita="edita" :tipoPessoa="tipoPessoa" />
                <nome-pj v-if="pesquisa.tipo === 4" @edita="edita" :tipoPessoa="tipoPessoa" />
                <isenta-estrangeiro-juridica v-if="pesquisa.tipo === 5" @edita="edita" :tipoPessoa="tipoPessoa" />
                <isenta-estrangeiro-fisica v-if="pesquisa.tipo === 6" @edita="edita" :tipoPessoa="tipoPessoa" />
              </div>
            </div>
        </div>
    </q-modal-layout>
  </q-modal>
  </div>
</template>
<script>
import cpf from './cpf'
import cnpj from './cnpj'
import NomePf from './nome-pf'
import NomePj from './nome-pj'
import IsentaEstrangeiroJuridica from './isenta-estrangeiro-juridica'
import IsentaEstrangeiroFisica from './isenta-estrangeiro-fisica'
export default {
  props: ['tipoPessoa', 'titulo'],
  components: {
    cpf,
    cnpj,
    NomePf,
    NomePj,
    IsentaEstrangeiroJuridica,
    IsentaEstrangeiroFisica
  },
  data () {
    return {
      opened: false,
      pesquisa: {},
      listTipoBusca: [
        {value: 1, label: 'CPF'},
        {value: 2, label: 'CNPJ'},
        {value: 3, label: 'Nome Pessoa Física'},
        {value: 4, label: 'Nome Pessoa Jurídica'},
        {value: 5, label: 'Pessoa Jurídica estrangeira ou isenta de CNPJ'},
        {value: 6, label: 'Pessoa Física estrangeira sem CPF'}
      ],
      listTipoBuscaCargoOuFuncao: [
        {value: 2, label: 'CNPJ'},
        {value: 4, label: 'Nome Pessoa Jurídica'}
      ]
    }
  },
  methods: {
    edita (value) {
      this.$emit('edita', value)
    },
    defineListTipoBusca () {
      if (this.$store.getters['art/ehDesempenhoDeCargoEFuncao']) {
        return this.listTipoBuscaCargoOuFuncao
      } else {
        return this.listTipoBusca
      }
    }
  }
}
</script>
