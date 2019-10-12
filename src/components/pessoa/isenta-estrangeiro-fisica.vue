<template>
  <div>
    <q-search v-model="termosBusca" style="margin-top: 17px;"
              placeholder="Digite o nome da pessoa"
    >
      <q-autocomplete :min-characters="1" @search="busca" @selected="seleciona" />
    </q-search>
    <div class="row gutter-x-sm gutter-y-sm" style="margin-top:20px;" v-if="opened">
      <div class="col-10">
        <q-card v-show="opened" color="info" text-color="white" style="border-color: #fff;">
          <q-card-main>
            <q-icon name="fas fa-info-circle" color="white"/>
            &nbsp;&nbsp; Não foi localizado em nossa base o nome informado, o mesmo será cadastrado.
          </q-card-main>
        </q-card>
      </div>
      <div class="col-2 row justify-end">
        <q-btn
            dense rounded icon="save"  flat style="margin-top:20px;" color="dark"
            label="Salvar"
            @click="salvar" />
      </div>
    </div>
</div>
</template>
<script>
import { filter } from 'quasar'
export default {
  props: ['tipoPessoa'],
  data () {
    return {
      id: null,
      opened: false,
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
        .post('pessoa/juridica/isenta-cpf/consulta-por-nome', { nomePessoa: termosBusca, rows: 5, page: 1 })
        .then(response => {
          this.opened = false
          response.data.data.forEach(function (el) {
            result.push({value: el.nome, label: ' Registro: ' + el.id + ' - ' + el.nome, id: el.id, cpf: el.cpf, registro: el.registro, tipo: el.tipo})
          })
        }).catch(() => {
          this.opened = true
          result = []
        })
      this.pessoaResultado = result
    },
    seleciona (pessoa) {
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: true, codigo: pessoa.id, cpfOuCnpj: pessoa.cpf, nome: pessoa.value, registro: pessoa.registro, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', pessoa.tipo)
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: true, codigo: pessoa.id, cpfOuCnpj: pessoa.cpf, nome: pessoa.value, registro: pessoa.registro, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setProprietario', response.data.data)
            this.$emit('edita', response.data.data)
          })
      } else {
        this.$emit('edita', pessoa)
      }
    },
    salvar () {
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: false, codigo: null, cpfOuCnpj: '_ISENTO_CPF', nome: this.termosBusca, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', 'LEIGOPF')
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: false, codigo: null, cpfOuCnpj: '_ISENTO_CPF', nome: this.termosBusca, numero: this.$store.getters['art/getId']})
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
