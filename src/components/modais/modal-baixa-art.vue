<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '48vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          Baixa ART número: {{art.numero}}
        </q-toolbar-title>

        <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>

      <div class="layout-padding ">
          <select-tipo-baixa v-if="opened" v-model="art.baixaArt.id" />
          <br>
          <q-input v-model="art.motivoBaixaOutros"
             float-label="Descreva aqui o motivo da Baixa"
             type="textarea"
             rows="5"
             maxlength="1000"
        />
        <div class="row justify-end">
          <q-btn  style="margin-top:20px;"
                  dense rounded flat color="blue-9"
                  v-if="art.motivoBaixaOutros !== '' && art.baixaArt.id !== 0"
                  icon="vertical_align_bottom"
                  @click="baixarArt"
                  label="Baixar ART" />
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
import SelectTipoBaixa from '../selects/select-tipo-baixa'
export default {
  components: {
    SelectTipoBaixa
  },
  data () {
    return {
      opened: false,
      art: {
        numero: '',
        motivoBaixaOutros: '',
        baixaArt: {
          id: null
        }
      }
    }
  },
  methods: {
    async toggle (numero) {
      this.art.numero = numero
      // this.art.motivoBaixaOutros = ''
      // this.art.baixarArt.id = null
      this.opened = !this.opened
    },
    baixarArt () {
      this.$axios
        .put('art/baixa', this.art)
        .then(response => {
          this.$emit('botaoPesquisar')
          this.opened = !this.opened
        })
    }
  }
}
</script>
