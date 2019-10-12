<template>
  <div>
    <q-card>
      <q-card-main>
        <q-field icon="fas fa-asterisk"
                 icon-color="red-9">
          <div style="text-align: right;" class="col-1">
            <info-help v-model="showHelp" :tipo="tipo" />
          </div>
          <q-select ref="select"
                    color="br-grey-3"
                    multiple
                    :disable="statusSelect"
                    :display-value="displayValueSelect"
                    :float-label="titulo"
                    v-model="itensChecked"
                    :options="itensOptions"
                    filter
                    @input="adicionaItem" />

        </q-field>
        <q-item>
          <q-item-main>
            <q-item-tile sublabel lines="0">
              <p v-for="item in listDescricaoItensAdicionados" link :key="item.descricao" class="q-mt-md">
                <span :title="item.descricao">{{item.descricao.substring(0, 18)}}{{item.descricao.length > 18 ? '... ' : ' '}}</span>
                <q-btn :disable="statusBotaoExcluir"
                       size="sm" flat rounded dense color="dark"
                       @click="deletaItem(item.id)" icon="clear" /><br/>
              </p>
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
  </div>
</template>
<script>
import { filter } from '../../mixins/mixin-select-utils'
import InfoHelp from '../../components/info/info-help'
import { format } from 'quasar'
const { capitalize } = format
export default {
  components: {
    InfoHelp
  },
  mixins: [filter],
  props: ['tipo'],
  mounted () {
    this.itensChecked = this.populaListItens()
    this.itensAdicionados = this.populaListItens()
    this.getListSelect()
    if (this.$store.getters['art/getSequencialContrato']) {
      this.sequencialDoContrato = this.$store.getters['art/getSequencialContrato']
    }
  },
  data () {
    return {
      itensOptions: [],
      itensChecked: [],
      itensAdicionados: [],
      sequencialDoContrato: 0
    }
  },
  methods: {
    populaListItens () {
      let listTempListAtividades = this.$store.getters['art/' + this.tipo]
      let listTemp = []
      listTempListAtividades.forEach(function (el) {
        listTemp.push(el.id)
      })
      return listTemp
    },
    setListStore () {
      let listTemp = []
      this.itensAdicionados.forEach(function (el) {
        listTemp.push({ id: el })
      })
      this.$store.commit('art/' + this.tipo, listTemp)
    },
    adicionaItem (value) {
      if (this.itensChecked.length < this.itensAdicionados.length) {
        // Se for menor exclui da lista itensAdicionados
        this.deletaItem(this.itensAdicionados.filter(x => !this.itensChecked.includes(x))[0])
        var index = this.itensAdicionados.indexOf(this.itensAdicionados.filter(x => (!this.itensChecked.includes(x))[0]))
        if (index !== -1) this.itensAdicionados.splice(index, 1)
        this.setListStore()
      } else if (this.itensChecked.length > this.itensAdicionados.length) {
        // Se for maior ele vai adicionar na lista itensAdicionados
        this.atualizaItens(this.getDiferencaLista(this.itensAdicionados)[0])
        this.itensAdicionados.push(this.getDiferencaLista(this.itensAdicionados)[0])
        this.setListStore()
      }
      if (this.itensChecked.length >= 3) {
        this.$refs.select.hide()
      }
    },
    getDiferencaLista (lista) {
      return this.itensChecked.filter(x => !lista.includes(x))
    },
    getListSelect () {
      if (this.tipo === 'atividade') {
        this.getAtividades()
      } else if (this.tipo === 'especificacao') {
        this.getEspecificacoes()
      } else if (this.tipo === 'complemento') {
        this.getComplementos()
      }
    },
    async getAtividades () {
      await this.$axios
        .post('art/atividades-tecnicas/' + this.$store.getters['art/getIdProfissional'], { id: this.$store.getters['art/getIdNatureza'] })
        .then(response => {
          let listTemp = []
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.id + ' - ' + el.nome})
          })
          this.itensOptions = listTemp
        })
    },
    async getEspecificacoes () {
      await this.$axios
        .post('art/especificacao-atividade/' + this.$store.getters['art/getIdProfissional'], { id: this.$store.getters['art/getIdNatureza'] })
        .then(response => {
          let listTemp = []
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.id + ' - ' + el.nome})
          })
          this.itensOptions = listTemp
        })
    },
    async getComplementos () {
      await this.$axios
        .post('art/complemento/' + this.$store.getters['art/getIdProfissional'], { id: this.$store.getters['art/getIdNatureza'] })
        .then(response => {
          let listTemp = []
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.id + ' - ' + el.nome})
          })
          this.itensOptions = listTemp
        })
    },
    deletaItem (idAtividade) {
      this.$axios
        .delete('art/contratos/' + this.tipo + '/' + this.$store.getters['art/getNumero'] + '/' + idAtividade)
        .then(response => {
          let indiceDeletadoDosAdicionados = this.itensAdicionados.indexOf(idAtividade)
          if (indiceDeletadoDosAdicionados !== -1) this.itensAdicionados.splice(indiceDeletadoDosAdicionados, 1)
          let indiceDeletadoDosCheckados = this.itensChecked.indexOf(idAtividade)
          if (indiceDeletadoDosCheckados !== -1) this.itensChecked.splice(indiceDeletadoDosCheckados, 1)
          this.setListStore()
        })
    },
    atualizaItens (idAtividade) {
      this.$axios
        .post('art/contratos/' + this.tipo, { id: idAtividade, numero: this.$store.getters['art/getNumero'] })
        .then()
    }
  },
  computed: {
    titulo () {
      return this.tipo !== 'especificacao' ? capitalize(this.tipo) : 'Especificação'
    },
    listDescricaoItensAdicionados () {
      let listTemp = []
      this.itensChecked.forEach(function (el) {
        let descricao = this.filterGetDescricao(el, this.itensOptions)
        listTemp.push({id: el, descricao: descricao})
      }.bind(this))
      return listTemp
    },
    statusSelect () {
      return this.itensChecked.length >= 3 || this.sequencialDoContrato !== 1
    },
    statusBotaoExcluir () {
      return this.sequencialDoContrato !== 1
    },
    displayValueSelect () {
      let titulo = this.titulo !== 'Especificação' ? this.titulo : (this.listDescricaoItensAdicionados.length === 1 ? this.titulo : 'Especificaçõe')
      return this.listDescricaoItensAdicionados.length + ' ' + titulo + (this.listDescricaoItensAdicionados.length === 1 ? '' : 's')
    }
  }
}
</script>
