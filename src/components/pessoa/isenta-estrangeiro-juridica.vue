<template>
  <div>
    <q-search v-model="termosBusca" style="margin-top: 17px;"
              placeholder="Digite a empresa isenta CNPJ ou estrangeiro"
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
        .post('pessoa/juridica/isenta-cnpj/consulta-por-nome', { razaoSocial: termosBusca, rows: 5, page: 1 })
        .then(response => {
          this.opened = false
          response.data.data.forEach(function (el) {
            result.push({value: el.nome, label: ' Registro: ' + el.id + ' - ' + el.nome, id: el.id, cnpj: el.cnpj, registro: el.registro, tipo: el.tipo})
          })
        }).catch(() => {
          this.opened = true
          result = []
        })
      this.pessoaResultado = result
    },
    seleciona (empresa) {
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: true, codigo: empresa.id, cpfOuCnpj: empresa.cnpj, nome: empresa.value, registro: empresa.registro, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', empresa.tipo)
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: true, codigo: empresa.id, cpfOuCnpj: empresa.cnpj, nome: empresa.value, registro: empresa.registro, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setProprietario', response.data.data)
            this.$emit('edita', response.data.data)
          })
      } else {
        this.$emit('edita', empresa)
      }
    },
    salvar () {
      if (this.tipoPessoa === 'contratante') {
        this.$axios
          .put('art/contratos/contratante', {checked: false, codigo: null, cpfOuCnpj: '_ISENTO_CNPJ', nome: this.termosBusca, numero: this.$store.getters['art/getId']})
          .then(response => {
            this.$store.commit('art/setContratante', response.data.data)
            this.$store.commit('art/setTipoPessoaContratante', 'LEIGOPJ')
            this.$emit('edita', response.data.data)
          })
      } else if (this.tipoPessoa === 'proprietario') {
        this.$axios
          .put('art/contratos/proprietario', {checked: false, codigo: null, cpfOuCnpj: '_ISENTO_CNPJ', nome: this.termosBusca, numero: this.$store.getters['art/getId']})
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
