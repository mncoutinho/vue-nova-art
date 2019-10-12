<template>
  <div>
    <q-search v-model="termosBusca" style="margin-top: 17px;"
              placeholder="Digite o nome da pessoa ..."
    >
      <q-autocomplete :min-characters="1" @search="busca" @selected="seleciona" />
    </q-search>
</div>
</template>
<script>
import { filter } from 'quasar'
export default {
  props: ['tipoPessoa'],
  data () {
    return {
      id: null,
      termosBusca: '',
      pessoaResultado: ''
    }
  },
  methods: {
    async busca (termosBusca, done) {
      let listResult = []
      await this.pesquisa(termosBusca)
      listResult = this.pessoaResultado
      done(filter(termosBusca, {field: 'value', list: listResult}))
    },
    async pesquisa (termosBusca) {
      let result = []
      await this.$axios
        .post('pessoa/fisica/consulta-por-nome-paginado', { nomePessoa: termosBusca, rows: 5, page: 1 })
        .then(response => {
          response.data.data.forEach(function (el) {
            result.push({value: el.nome, label: el.cpf + ' - ' + el.nome, id: el.id, cpf: el.cpf, tipo: el.tipo})
          })
        }).catch(() => {
          this.$q.notify({message: 'Nome não encontrado. Favor buscar por CPF.', timeout: 1000, type: 'negative', position: 'center'})
          result = []
        })
      this.pessoaResultado = result
    },
    seleciona (profissional) {
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: true, codigo: profissional.id, cpfOuCnpj: profissional.cpf, nome: profissional.value, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', profissional.tipo)
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: true, codigo: profissional.id, cpfOuCnpj: profissional.cpf, nome: profissional.value, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setProprietario', response.data.data)
            this.$emit('edita', response.data.data)
          })
      } else {
        this.$emit('edita', profissional)
      }
    }
  }
}
</script>
