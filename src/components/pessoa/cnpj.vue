<template>
  <div>
    <div class="row gutter-x-sm gutter-y-sm">
      <div class="col-4">
        <q-input v-mask="'##.###.###/####-##'"
                 masked="false"
                 v-model="cnpj"
                 float-label="CNPJ"
                 color="secondary"
                 @input="buscaPorCnpj" />
      </div>
      <div class="col-8">
        <q-input v-if="cnpjEhValido"
                 v-model="pessoa.nome"
                 :disable="existeNaBase"
                 color="secondary"
                 float-label="Nome" />
      </div>
    </div>
    <br>
    <div class="row justify-end">
           <q-btn v-if="cnpjEhValido"
               dense rounded icon="save"  flat style="margin-top:20px;" color="dark"
               label="Salvar"
               @click="salvar" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {mask} from 'vue-the-mask'
export default {
  props: ['tipoPessoa'],
  data () {
    return {
      cnpj: null,
      nome: null,
      pessoa: {},
      cnpjEhValido: false,
      existeNaBase: false
    }
  },
  directives: {mask},
  methods: {
    buscaPorCnpj: _.debounce(function (value) {
      let cnpj = value.replace(/\./g, '').replace(/-/g, '').replace('/', '')
      if (cnpj.length === 14) {
        this.$axios
          .get('pessoa/juridica/' + cnpj)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              this.pessoa = response.data.data[0]
              this.cnpjEhValido = true
              this.existeNaBase = true
            } else if (response.data.type === 'INFORMATION') {
              this.pessoa.nome = ''
              this.cnpjEhValido = true
              this.existeNaBase = false
              this.pessoa.id = null
            }
          })
          .catch(() => {
            this.$q.notify({message: 'CNPJ inválido', timeout: 1500, type: 'negative', position: 'center'})
            this.cnpjEhValido = false
            this.existeNaBase = false
            this.pessoa = {}
          })
      }
    }, 100),
    salvar () {
      let cnpjNaoFormatado = this.cnpj.replace(/\./g, '').replace(/-/g, '').replace('/', '')
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: this.existeNaBase, codigo: this.pessoa.id, cpfOuCnpj: cnpjNaoFormatado, nome: this.pessoa.nome, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', this.pessoa.tipo)
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: this.existeNaBase, codigo: this.pessoa.id, cpfOuCnpj: cnpjNaoFormatado, nome: this.pessoa.nome, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setProprietario', response.data.data)
            this.$emit('edita', response.data.data)
          })
      } else {
        this.$emit('edita', this.pessoa)
      }
    }
  }
}
</script>
