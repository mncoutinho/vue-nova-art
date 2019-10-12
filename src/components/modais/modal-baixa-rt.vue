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
               <q-select
                stack-label="Ramo RT"
                color="secondary"
                v-model="id"
                :options="listOptions"
              /><br/>
              <p>A baixa de RT é irreversível, para voltar a fazer parte do RT será necessário reiniciar o processo de inclusão como RT, <br/>
                entregando a documentação necessária e aguardando o prazo de conclusão do processo.<br/>
                {{'A baixa de RT NÃO efetua a baixa do QT.'}}
                </p>
              <p>Deseja realmente realizar a baixa de RT?</p>
            </div>
          </div>
          <div class="row justify-around q-pa-md">
            <q-btn label="VOLTAR" size="sm"
                   rounded outline color="red-9" icon="reply"
                   @click="toggle" />
            <q-btn label="CONFIRMAR" size="sm"
                   rounded color="green" icon="thumb_up"
                   @click="concordo" />
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import MensagemValidacao from '../partials/mensagem-validacao'
export default {
  components: { MensagemValidacao },
  data () {
    return {
      quadroTecnico: {},
      listOptions: [],
      id: null,
      opened: false
    }
  },
  methods: {
    toggle (dados) {
      if (this.$store.getters['user/ehProfissional']) {
        this.quadroTecnico = dados
      } else {
        this.quadroTecnico.idQuadroTecnico = dados.id
        this.quadroTecnico.idProfissional = dados.profissional.id
        this.quadroTecnico.idEmpresa = dados.empresa.id
      }
      this.getQtDetalhadoByIdProfissional(dados)
      delete dados.__index
      this.opened = !this.opened
    },
    concordo () {
      if (this.id) {
        this.$axios
          .post('cadastro/profissional/baixar-rt', { idResponsavelTecnico: this.id })
          .then(response => {
            let dto = { enumTipoProtocolo: 'BAIXA_RT', idPessoa: this.quadroTecnico.idEmpresa, tipoPessoa: 'EMPRESA', idPessoaCointeressado: this.quadroTecnico.idProfissional }
            this.$axiosProtocoloApi
              .post('protocolo', dto)
              .then(response => {
                this.$emit('atualizaGrid')
                this.$q.notify({message: 'Baixa efetuada com sucesso!', type: 'positive', position: 'center'})
                this.opened = false
              })
          })
          .catch(erro => {
            if (erro.response.data) {
              this.$refs.msgValida.toggle(erro.response.data.messages)
            } else {
              this.$refs.msgValida.toggle(erro.response.messages)
            }
          })
      } else {
        this.$q.notify({message: 'Favor selecionar um ramo!', type: 'negative', position: 'center'})
      }
    },
    async getQtDetalhadoByIdProfissional (qt) {
      let listTemp = []
      await this.$axios
        .get('cadastro/empresa/quadro-tecnico-detalhado/' + qt.id)
        .then(response => {
          response.data.data.responsaveis.forEach(function (el) {
            listTemp.push({value: el.id, label: el.ramo || el.ramoDescricao})
          })
          this.listOptions = listTemp
        })
    }
  }
}
</script>
