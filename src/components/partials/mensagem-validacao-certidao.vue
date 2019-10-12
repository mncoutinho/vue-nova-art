<template>
  <div class="full-width">
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
    <q-card v-show="opened" class="q-ma" color="info" text-color="white">
      <q-card-title >
        <span style="font-size: 17px;">Impedimentos para Emissão de Certidão</span>
        <q-icon color="white"   @click.native="fechar()" slot="right"  size="20px" name="clear" />
      </q-card-title>
      <q-card-main>
        <div class="row col-12">
            <div v-for="mensagem in mensagensValidacoes" :key="mensagem" style="padding:2px 7px;">
                <q-icon name="done" color="white" size="10px" />
                &nbsp;<span>{{mensagem}}</span>
            </div>
        </div>
        <div class="row col-12 q-pa-md" v-if="mostrarTodasMensagens" >
          <q-btn>Listar todos</q-btn>
        </div>
       </q-card-main>
      </q-card>
      </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mostrarTodasMensagens: false,
      opened: false,
      mensagensValidacoes: []
    }
  },
  methods: {
    toggle (msg, opened) {
      if (msg.length <= 10) {
        this.mensagensValidacoes = msg
      } else {
        this.mostrarTodasMensagens = true
      }
      this.opened = opened
    },
    fechar () {
      this.opened = false
    }
  }
}
</script>
