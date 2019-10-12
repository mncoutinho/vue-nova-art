<template>
  <div>
      <div class="row" style="margin-top:20px;" v-if="this.$store.getters['art/getPossuiContratoCadastrado']">
        <div class="col-5">
          <label>{{getNaturezaByValue(this.$store.getters['art/getIdNatureza'])}}</label>
        </div>
          <q-icon color="red" name="fas fa-exclamation-circle">
            <q-popover>
              <q-card-main>
                ART já possui contrato(s) cadastrados. Por isso não é permitido alterar o tipo de registro. Para alterar o tipo registro remova os contratos.
              </q-card-main>
            </q-popover>
          </q-icon>
      </div>
   <q-field
        v-if="!this.$store.getters['art/getPossuiContratoCadastrado']"
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:20px;">
        <div class="row">
          <div class="col-10">
            <q-select
              placeholder="TIPO DE REGISTRO"
              v-if="!this.$store.getters['art/getPossuiContratoCadastrado']"
              v-model="id"
              :options="getNaturezasAtivas()"
              @input="atualiza"
            />
          </div>
          <div style="margin-top: 10px" class="col-2">
            <info-help v-model="showing" tipo="natureza" />
          </div>
        </div>
   </q-field>
</div>
</template>
<script>
import listNatureza from '../../assets/listNatureza'
import InfoHelp from '../info/info-help'
import { dialog } from '../../mixins/mixin-dialog'
export default {
  mixins: [dialog],
  props: ['natureza'],
  components: {
    InfoHelp
  },
  created () {
    let natureza = this.$store.getters['art/getNatureza']
    if (natureza !== null && natureza !== undefined) {
      this.id = natureza.id
    }
    this.getNaturezasAtivas()
  },
  data () {
    return {
      listNatureza: listNatureza,
      showing: false,
      id: null,
      listOptions: []
    }
  },
  methods: {
    getNaturezasAtivas () {
      // liberado apenas para as naturezas obra ou serviço e cargo ou função
      // let listTemp = []
      // this.$axios
      //   .get('art/natureza')
      //   .then(response => {
      //     response.data.data.forEach(function (el) {
      //       listTemp.push({value: el.id, label: el.nome})
      //     })
      //     this.listOptions = listTemp
      //   })
      return this.listNatureza.filter(function (el) { return el.ativa === 1 })
    },
    getNaturezaByValue (id) {
      let natureza = this.listNatureza.filter(function (el) { return el.value === id })
      if (natureza[0]) {
        return natureza[0].label
      } else {
        return ''
      }
    },
    async atualiza () {
      if (!this.$store.getters['art/ehArtEmEdicao']) {
        await this.criaART()
      }
    },
    async criaART () {
      if (await this.dialogGeneric('Atenção', 'Um novo número de ART será gerado, deseja prosseguir?')) {
        this.$q.loading.show({
          message: 'Aguarde...Está sendo iniciada uma nova ART.'
        })
        if (this.$store.getters['art/possuiDescricaoModelo']) {
          this.$axios
            .post('art/nova/modelo', {natureza: {id: this.id}, modelo: true, descricaoModelo: this.$store.getters['art/getDescricaoModelo']})
            .then(response => {
              this.$store.commit('art/setArt', response.data.data)
              this.numero = response.data.data.numero
              localStorage.setItem('ART', this.numero)
              this.$router.push('/art/editar/' + this.numero)
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        } else {
          this.$axios
            .post('art/nova/' + this.id)
            .then(response => {
              this.$store.commit('art/setArt', response.data.data)
              this.numero = response.data.data.numero
              localStorage.setItem('ART', this.numero)
              this.$router.push('/art/editar/' + this.numero)
            })
            .finally(() => {
              this.$q.loading.hide()
            })
        }
      }
    },
    async atualizaNatureza (value) {
      if (await this.dialogGeneric('Atenção', 'A natureza da ART será alterada, os campos incompatíveis com a natureza selecionada serão apagados, deseja prosseguir?')) {
        this.$axios
          .put('art/natureza', {id: value, numero: this.$store.getters['art/getNumero']})
          .then(response => {
            this.$store.commit('art/setNatureza', response.data.data)
            this.getArt(this.$store.getters['art/getNumero'])
            this.$emit('atualizouNatureza', value)
          })
      } else {
        this.id = this.$store.getters['art/getNatureza'].id
      }
    },
    ehArtEmEdicao () {
      return this.numero !== null
    },
    async getArt (numero) {
      await this.$axios
        .get('/art/formulario/' + numero)
        .then(response => {
          this.$store.commit('art/setArt', response.data.data)
        })
    }
  },
  watch: {
    id: function (value, oldValue) {
      if (this.$store.getters['art/ehArtEmEdicao']) {
        if (this.$store.getters['art/getNatureza'] !== undefined) {
          if (this.$store.getters['art/getNatureza'].id !== value) {
            this.atualizaNatureza(value)
          }
        }
      }
    },
    natureza: function (value, oldValue) {
      if (value !== null && value !== undefined) {
        this.id = value.id
      }
    }
  }
}
</script>
