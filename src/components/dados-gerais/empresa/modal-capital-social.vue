<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '28vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          CAPITAL SOCIAL
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
            <label id="internal-label">TIPO CAPITAL SOCIAL: </label><span id="span-view">{{capitalSocial.tipoCapitalSocial}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">FAIXA CAPITAL: </label><span id="span-view">{{capitalSocial.faixaCapital}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">DATA JUNTA COMERCIAL: </label><span id="span-view">{{capitalSocial.dataJuntaComercial}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">DATA RECEITA FEDERAL: </label><span id="span-view">{{capitalSocial.dataReceitaFederal}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">VALOR DO CAPITAL: </label><span id="span-view">{{capitalSocial.valorCapital}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">DATA INCLUSÃO: </label><span id="span-view">{{capitalSocial.dataInclusao}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">CAPITAL INTEGRALIZADO:</label><span id="span-view">{{capitalSocial.valorCapitalIntegralizado}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">ÚLTIMA ALTERAÇÃO:</label><span id="span-view">{{capitalSocial.dataAlteracao}}</span>
          </div>
        </div>
        <div class="row gutter-xs justify-between">
          <div class="col-md-6">
            <label id="internal-label">DATA A INTEGRALIZAR:</label><span id="span-view">{{capitalSocial.dataIntegralizacao}}</span>
          </div>
          <div class="col-md-6">
            <label id="internal-label">CAPITAL A INTEGRALIZAR:</label><span id="span-view">{{capitalSocial.valorCapitalAIntegralizar}}</span>
          </div>
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
      opened: false,
      capitalSocial: ''
    }
  },
  methods: {
    toggle (capitalSocial) {
      this.capitalSocial = capitalSocial
      this.opened = !this.opened
    }
  }
}
</script>
