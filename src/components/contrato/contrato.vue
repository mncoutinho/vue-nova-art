<template>
  <div>
    <br>
    <grid-contrato @openModal="openModal"
                  @irParaNatureza="'irParaNatureza'"
                  ref="gridContratos"/>

    <q-modal v-model="opened" :content-css="{minWidth: '75vw', minHeight: '85vh'}" >
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title align="center">
            Cadastro de Contrato
          </q-toolbar-title>
          <q-btn icon="clear" color="white" v-close-overlay flat round dense @click="fecharModal" />
        </q-toolbar>
        <div>
          <div class="row justify-end" style="margin-top: 15px; margin-right: 15px;">
            <q-field icon="fas fa-asterisk"
                     icon-color="red-9">
              <span class="text-bg-color-red">campos obrigatórios</span>
            </q-field>
          </div>
          <q-stepper class="q-ml-md q-mr-md" no-header-navigation vertical ref="stepper" color="blue-9">

            <step-1 v-if="opened" @prosseguir="prosseguir" />

            <step-2 v-if="opened && !this.$store.getters['art/ehReceituarioAgronomico']" @prosseguir="prosseguir" @voltar="voltar" @mostraEnderecoObra="mostraEnderecoObra" />

            <step-4 v-if="opened && !this.$store.getters['art/ehReceituarioAgronomico']" @prosseguir="prosseguir" @voltar="voltar" ref="endereco" />

            <step-3 v-if="opened && !this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" @prosseguir="prosseguir" @voltar="voltar" />

            <step-5 v-if="opened && !this.$store.getters['art/ehReceituarioAgronomico']" @prosseguir="prosseguir" @voltar="voltar" />

            <step-6 v-if="opened" @prosseguir="prosseguir" @voltar="voltar" @concluir="concluir" />

          </q-stepper>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import step1 from './step-1'
import step2 from './step-2'
import step3 from './step-3'
import step4 from './step-4'
import step5 from './step-5'
import step6 from './step-6'
import GridContrato from './grid-contrato'
export default {
  components: {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    GridContrato
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    openModal () {
      this.opened = !this.opened
      this.$refs.stepper.goToStep('contratante')
    },
    prosseguir () {
      this.$refs.stepper.next()
    },
    voltar () {
      this.$refs.stepper.previous()
    },
    concluir () {
      this.opened = false
      this.getContratos()
      this.$emit('atualizaArt')
    },
    fecharModal () {
      this.$q.notify({message: 'É importante finalizar seu contrato, para o mesmo ser considerado no valor de sua ART.', type: 'negative', position: 'center'})
      this.$refs.gridContratos.getContratos({page: 1, rows: 3, numeroArt: this.$store.getters['art/getNumero'], tipo: '1'})
    },
    getTotalContratos () {
      return this.$refs.gridContratos.totalContratos()
    },
    getContratos () {
      this.$refs.gridContratos.getContratos({page: 1, rows: 3, numeroArt: this.$store.getters['art/getNumero'], tipo: '1'})
    },
    mostraEnderecoObra () {
      this.$refs.endereco.mostraEndereco()
    }
  }
}
</script>
