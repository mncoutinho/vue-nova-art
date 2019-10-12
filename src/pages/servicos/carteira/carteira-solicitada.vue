<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Serviços" icon="fas fa-toolbox" />
      <q-breadcrumbs-el label="Carteira" icon="far fa-id-card" />
      <q-breadcrumbs-el label="Solicitada" icon="check" />
    </q-breadcrumbs>
    <q-jumbotron>
      <div class="q-display-1">Protocolo Número: <b>{{protocolo}}</b></div>
      <br>
      <div class="q-subheading">
        <div v-if="divida">
          O pedido só será tramitado após o pagamento da taxa.
        </div>
        <div v-if="!divida">
          Sua carteira foi solicitada com sucesso!
        </div>
      </div>
      <hr class="q-hr q-my-lg">
      <div v-if="!divida" class="row justify-center">
        <q-btn label="PDF para impressão"
              style="margin-top:40px;"
              flat size="xl"
              rounded inverted color="blue-9" icon="fas fa-file-download"
              @click="downloadProtocolo" />
        <br>
      </div>
      <div v-if="divida" class="row justify-center">
        <q-btn label="Boleto impressão"
              style="margin-top:40px;"
              flat size="xl"
              rounded inverted color="blue-9" icon="fas fa-barcode"
              @click="downloadBoleto" />
      </div>
    </q-jumbotron>
  </q-page>
</template>
<script>
export default {
  props: ['protocolo', 'divida'],
  methods: {
    downloadProtocolo () {
      window.open(process.env.SPRING + '/protocolo-api/protocolo/pdf/' + this.protocolo, '_blank')
    },
    downloadBoleto (painel) {
      window.open(process.env.SPRING + '/protocolo-api/protocolo/pdf/' + this.protocolo + '/' + this.divida, '_blank')
    }
  }
}
</script>
