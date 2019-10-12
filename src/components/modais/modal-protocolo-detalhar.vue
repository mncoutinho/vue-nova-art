<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '70vw', minHeight: '40vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          PROTOCOLO: {{protocolo.numeroProtocolo}}
        </q-toolbar-title>
        <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>
      <div class="layout-padding">
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">NÚMERO PROTOCOLO: </label><span id="span-view">{{protocolo.numeroProtocolo}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">NÚMERO PROCESSO: </label><span id="span-view">{{protocolo.numeroProcesso}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">ASSUNTO: </label><span v-if="protocolo.assunto" id="span-view">{{protocolo.assunto.descricao}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">SITUAÇÃO: </label><span v-if="protocolo.ultimoMovimento" id="span-view">{{protocolo.ultimoMovimento.situacao.descricao}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">INTERESSADO: </label><span v-if="protocolo.interessado" id="span-view">{{protocolo.interessado.nome}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">REGISTRO: </label><span v-if="protocolo.interessado" id="span-view">{{protocolo.interessado.id}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">LOCAL DE ENTREGA DO DOCUMENTO:</label><span id="span-view">{{protocolo.unidadeAtendimento}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-12">
            <label id="internal-label">DATA EMISSÂO: </label><span id="span-view">{{protocolo.emissao ? protocolo.emissao.toUpperCase() : '' }}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-12">
            <label id="internal-label">OBSERVAÇÕES:</label><span id="span-view">{{protocolo.observacao ? protocolo.observacao.toUpperCase(): ''}}</span>
          </div>
        </div>
        <br><br>
      <!-- Tabela -->
        <q-card >
          <q-card-title class="bg-grey-3" text-color="white">
            <label id="label-view">HISTÓRICO DE MOVIMENTOS </label>
          </q-card-title>
          <q-card-main>
            <q-table
              ref="table"
              class="no-border-grid"
              color="primary"
              row-key="codigo"
              :data="listaMovimentos"
              :columns="columns"
              :loading = loading
              :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
              rows-per-page-label="Histórico de movimentos por página:"
              no-data-label = "Não possui nenhum movimento."
            >
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="acoes" :props="props">
                <q-btn dense flat rounded size="sm" color="blue-10" @click="$refs.modalMovimentosObservacoes.toggle(props.row)" icon="visibility"/>
              </q-td>
              <q-td key="situacao" :props="props">
                <small class="text-italic">{{ props.row.situacao.nome}}</small>
              </q-td>
              <q-td key="dataEnvioFormatada" :props="props">
                <small class="text-italic">{{ props.row.dataEnvioFormatada}}</small>
              </q-td>
              <q-td key="departamentoOrigem" :props="props">
                <small class="text-italic">{{ props.row.departamentoOrigem.sigla + ' : ' + props.row.departamentoOrigem.nome}}</small>
              </q-td>
              <q-td key="dataRecebimentoFormatada" :props="props">
                <small class="text-italic">{{ props.row.dataRecebimentoFormatada}}</small>
              </q-td>
              <q-td key="departamentoDestino" :props="props">
                <small class="text-italic">{{ props.row.departamentoDestino.sigla + ' : ' + props.row.departamentoDestino.nome}}</small>
              </q-td>
            </q-tr>
          </q-table>
          </q-card-main>
        </q-card>
      </div>
       <spinner :showSpinner="showSpinner"></spinner>
      </q-modal-layout>
    </q-modal>
    <modal-movimentos-observacoes ref="modalMovimentosObservacoes" />
  </div>
</template>
<script>
import _ from 'lodash'
import Spinner from '../../components/partials/spinner'
import ModalMovimentosObservacoes from './modal-movimentos-observacoes'
export default {
  components: {
    ModalMovimentosObservacoes,
    Spinner
  },
  data () {
    return {
      loading: false,
      opened: false,
      protocolo: {},
      showSpinner: '',
      listaMovimentos: [],
      columns: [
        { name: 'acoes', align: 'left', label: '', field: 'acoes' },
        { name: 'situacao', align: 'left', label: 'SITUAÇÃO', field: 'situacao' },
        { name: 'dataEnvioFormatada', align: 'left', label: 'DATA ENVIO', field: 'dataEnvioFormatada' },
        { name: 'departamentoOrigem', align: 'left', label: 'ORIGEM', field: 'departamentoOrigem' },
        { name: 'dataRecebimentoFormatada', align: 'left', label: 'DATA RECEBIMENTO', field: 'dataRecebimentoFormatada' },
        { name: 'departamentoDestino', align: 'left', label: 'DESTINO', field: 'departamentoDestino' }
      ]
    }
  },
  methods: {
    toggle (protocolo) {
      this.showSpinner = true
      this.getProtocoloDetalhado(protocolo.numeroProtocolo)
      this.getListaMovimentos(protocolo.numeroProtocolo)
      this.opened = !this.opened
    },
    pararSpinner: _.debounce(function (value) {
      this.showSpinner = false
    }, 1000),
    getProtocoloDetalhado (idProtocolo) {
      this.$axios
        .get('protocolo/' + idProtocolo)
        .then(response => {
          this.protocolo = response.data.data
          this.pararSpinner()
        })
    },
    getListaMovimentos (idProtocolo) {
      this.$axios
        .get('protocolo/movimentos/' + idProtocolo)
        .then(response => {
          this.listaMovimentos = response.data.data
          this.pararSpinner()
        })
    }
  }
}
</script>
