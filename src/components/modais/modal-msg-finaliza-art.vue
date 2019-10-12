<template>
  <div>
    <q-modal v-if="opened" v-model="opened" maximized :content-css="{minWidth: '40vw', minHeight: '20vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">
            ATENÇÃO!
          </q-toolbar-title>
          <q-btn :disabled="showLoadingBtn"
                 flat round dense
                 color="white"
                 icon="clear"
                 v-close-overlay />
        </q-toolbar>
          <div class="row gutter-a-lg">
            <div class="col-12 q-pa-md" >
              <p> 1. O registro da ART será somente efetivado por meio de quitação do valor correspondente, mediante o pagamento de boleto bancário.</p>
              <p>2. A data de registro da ART será a data de quitação bancária do valor. Somente o pagamento identificado no sistema do Crea validará eletronicamente o registro da ART e possibilitará sua impressão definitiva.</p>
              <p>3. No caso de agendamento eletrônico, o registro da ART somente será efetivado após a conclusão da transação bancária.</p>
              <p>4. O início da atividade técnica sem a quitação do valor da ART está sujeito as sanções legais cabíveis.</p>
            </div>
          </div>
        <div class="row justify-center q-pa-md">
          <botao :label="'OK'"
                :icon="'thumb_up'"
                :size="'md'"
                :loading="showLoadingBtn"
                @emit="concordo()" />
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
export default {
  components: { Botao },
  data () {
    return {
      showLoadingBtn: false,
      opened: false
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    concordo () {
      this.showLoadingBtn = true
      this.$emit('validaCalculaFinaliza')
    },
    pararSpinnerBtn () {
      this.showLoadingBtn = false
      this.opened = false
    }
  }
}
</script>
