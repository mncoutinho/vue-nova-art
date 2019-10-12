<template>
  <div>
    <div class="row gutter-x-sm gutter-y-sm">
      <div class="col-4">
        <q-input v-mask="'###.###.###-##'"
                 masked="false"
                 v-model="cpf"
                 float-label="CPF"
                 color="secondary"
                 @input="buscaPorCpf" />
      </div>
      <div class="col-8">
        <q-input v-if="cpfEhValido"
                 v-model="pessoa.nome"
                 :disable="existeNaBase"
                 color="secondary"
                 float-label="Nome" />
      </div>
    </div>
    <br>
    <div class="row justify-end">
      <q-btn v-if="cpfEhValido"
             dense rounded icon="save"
             flat style="margin-top:20px;" color="dark"
             label="Salvar"
             @click="salvar" />
    </div>
  </div>
</template>
<script>
import {mask} from 'vue-the-mask'
import _ from 'lodash'
export default {
  props: ['tipoPessoa'],
  data () {
    return {
      cpf: null,
      nome: null,
      pessoa: {},
      cpfEhValido: false,
      existeNaBase: false
    }
  },
  directives: {mask},
  methods: {
    buscaPorCpf: _.debounce(function (value) {
      let cpf = value.replace(/\./g, '').replace(/-/g, '')
      if (cpf.length === 11) {
        this.$axios
          .get('pessoa/fisica/' + cpf)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              this.pessoa = response.data.data[0]
              this.cpfEhValido = true
              this.existeNaBase = true
            } else if (response.data.type === 'INFORMATION') {
              this.pessoa.nome = ''
              this.cpfEhValido = true
              this.existeNaBase = false
              this.pessoa.id = null
            }
          })
          .catch(() => {
            this.$q.notify({message: 'CPF inválido', timeout: 1500, type: 'negative', position: 'center'})
            this.cpfEhValido = false
            this.existeNaBase = false
            this.pessoa = {}
          })
      }
    }, 10),
    salvar () {
      let cpfNaoFormatado = this.cpf.replace(/\./g, '').replace(/-/g, '')
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: this.existeNaBase, codigo: this.pessoa.id, cpfOuCnpj: cpfNaoFormatado, nome: this.pessoa.nome, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', this.pessoa.tipo)
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: this.existeNaBase, codigo: this.pessoa.id, cpfOuCnpj: cpfNaoFormatado, nome: this.pessoa.nome, numero: this.$store.getters['art/getId']})
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
