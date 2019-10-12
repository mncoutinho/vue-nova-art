<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '30vw', minHeight: '30vh'}">
        <q-modal-layout>
            <q-toolbar slot="header" text-color="white" color="primary">
                <q-toolbar-title align="center">
                    Dados da Ocorrência
                </q-toolbar-title>
                <q-btn
                    flat
                    round
                    dense
                    color="white"
                    icon="clear"
                    v-close-overlay/>
                </q-toolbar>
                <div class="layout-padding overflow-hidden">
                  <div class="row gutter-y-lg">
                    <div class="col-12">
                      <label id="internal-label">Protocolo: </label><span id="span-view>">{{form.id !== null ? form.id : ''}}</span>
                      <br>
                      <label id="internal-label">Data do Atendimento: </label><span id="span-view">{{form.dataAtendimentoFormatada !== null ? form.dataAtendimentoFormatada : ''}}</span>
                      <br>
                      <label id="internal-label">Tipo de Demanda: </label><span id="span-view">{{form.tipoDemanda !== null ? form.tipoDemanda.descricao : ''}}</span>
                      <br>
                      <label id="internal-label">Assunto Geral: </label><span id="span-viewm">{{form.assuntoGeral !== null ? form.assuntoGeral.descricao : ''}}</span>
                      <br>
                      <label id="internal-label">Assunto Específico: </label><span id="span-view">{{form.assuntoEspecifico !== null ? form.assuntoEspecifico.descricao : ''}}</span>
                      <br>
                      <label id="internal-label">Número Protocolo:</label><span id="span-view">{{form.protocolo !== null ? form.protocolo.id : ''}}</span>
                      <br>
                      <label id="internal-label">Situação:</label><span id="span-view">{{form.situacao !== null ? form.situacao.descricao : ''}}</span>
                      <br>
                      <label id="internal-label">Providência: </label><span id="span-view">{{form.providencia !== null ? form.providencia : ''}}</span>
                      <br>
                      <label id="internal-label">Solução: </label><span id="span-view">{{form.solucao !== null ? form.solucao : ''}}</span>
                      <br>
                      <label style="min-width:450px;" id="internal-label">Descrição: </label><span id="span-view">{{form.descricao !== null ? form.descricao : '' }}</span>
                    </div>
                    </div>
                    <div class="col-12" style="margin: 10px" align="center">
                      <q-btn label="Fechar" rounded color="green" @click="fechar"/>
                    </div>
                  </div>
            </q-modal-layout>
        </q-modal>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        id: Number,
        providencia: String,
        descricao: String,
        solucao: String,
        tipoDemanda: {descricao: String, id: Number},
        assuntoGeral: {descricao: String, id: Number},
        assuntoEspecifico: {descricao: String, id: Number},
        situacao: {descricao: String, id: Number},
        protocolo: {id: Number}
      },
      loading: false,
      opened: false
    }
  },
  components: {},
  methods: {
    toggle (atendimento) {
      this.form = Object.assign({}, atendimento)
      this.opened = !this.opened
    },
    fechar () {
      this.opened = !this.opened
    }
  }
}
</script>
