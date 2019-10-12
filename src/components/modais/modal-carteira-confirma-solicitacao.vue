<template>
  <div>
    <q-modal v-if="opened" v-model="opened" :content-css="{minWidth: '40vw', minHeight: '20vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          ATENÇÃO!
        </q-toolbar-title>
          <q-btn flat round dense
                 color="white" icon="clear"
                 v-close-overlay />
        </q-toolbar>
        <div padding>
          <mensagem-validacao ref="msgValida" />
          <div class="row gutter-a-lg">
            <div class="col-12 q-pa-md" >
              <p>Deseja realmente solicitar a carteira para {{ unidadeEscolhida ? unidadeEscolhida.nome : '' }}?</p>
            </div>
          </div>
          <div class="row justify-around q-pa-md">
            <botao :label="'NÃO'"
                    :type="'secondary'"
                    :icon="'reply'"
                    @emit="toggle()" />
            <botao :label="'SIM'"
                    :icon="'thumb_up'"
                    @emit="concordo()" />
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
import MensagemValidacao from '../partials/mensagem-validacao'
export default {
  components: { Botao, MensagemValidacao },
  data () {
    return {
      opened: false,
      unidadeEscolhida: null
    }
  },
  methods: {
    toggle (unidadeEscolhida) {
      this.unidadeEscolhida = unidadeEscolhida
      this.opened = !this.opened
    },
    concordo () {
      let dto = { enumTipoProtocolo: 'SEGUNDA_VIA_DE_CARTEIRA', idPessoa: this.$store.getters['user/getUserRegistro'], idUnidadeDeAtendimento: this.unidadeEscolhida.id, nomeUnidadeDeAtendimento: this.unidadeEscolhida.nome }
      this.$axiosProtocoloApi
        .post('protocolo', dto)
        .then(response => {
          this.opened = false
          this.$router.push('/servicos/carteira/solicitada/' + response.data.data.numero + '/' + response.data.data.divida)
        })
        .catch(erro => {
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    }
  }
}
</script>
