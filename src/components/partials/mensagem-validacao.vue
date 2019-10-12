<template>
  <div class="full-width">
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
    <q-card v-show="opened" class="q-ma" color="red-9" text-color="white" style="border-color: #B63730;">
      <q-card-title>
        Erros
        <q-icon color="white"   @click.native="fechar()" slot="right"  size="20px" name="clear" />
      </q-card-title>
      <q-card-main>
            <div class="row col-12" v-if="mensagensValidacoes.length >= 1" >
                <div v-for="mensagem in mensagensValidacoes" :key="mensagem" style="padding:2px 7px;">
                    <q-icon name="done" color="white" size="10px" />
                    &nbsp;<span>{{mensagem}}</span>
                </div>
            </div>
       </q-card-main>
      </q-card>
      </transition>
      <br>
  </div>
</template>
<script>
export default {
  data () {
    return {
      opened: false,
      mensagensValidacoes: []
    }
  },
  methods: {
    toggle (msg) {
      this.mensagensValidacoes = msg
      this.opened = true
    },
    fechar () {
      this.opened = false
    }
  }
}
</script>
