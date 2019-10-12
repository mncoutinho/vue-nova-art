<template>
  <q-page class="layout-padding justify-center">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="ART" icon="library_books" />
        <q-breadcrumbs-el label="Finaliza"/>
      </q-breadcrumbs>
      <q-jumbotron>
      <div class="q-display-2">ART Número: &nbsp;&nbsp;<b>{{numero}}</b></div>
      <br>
      <div class="q-subheading">
        Sua ART foi cadastrada com sucesso!  Segue abaixo os links da impressão e do boleto bancário.
      </div>
      <div v-if="temTaxaDeIncorporacao === 'true'" class="q-subheading q-mt-md">
        A ART cadastrada registra atividade concluída, para inclusão da mesma no seu acervo técnico, além do pagamento das taxas deverá ser cumprido o procedimento enviado para o seu e-mail.
      </div>
      <hr class="q-hr q-my-lg">
      <div class="row justify-center">
        <q-btn label="PDF para impressão"
              style="margin-top:40px;"
              flat
              size="xl"
              rounded inverted  color="blue-9"  icon="fas fa-file-download"
              @click="downloadArt"  />
        <br>
       </div>
      <div class="row justify-center">
        <q-btn label="Boleto impressão"
              style="margin-top:40px;"
              flat
              size="xl"
              rounded inverted  color="blue-9"  icon="fas fa-barcode"
              @click="downloadBoleto"  />
       </div>
    </q-jumbotron>

  </q-page>
</template>
<script>
export default {
  props: ['numero', 'codigoDivida', 'temTaxaDeIncorporacao'],
  methods: {
    downloadArt () {
      window.open(process.env.URL_LEGADO + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=imprimirARTpdfPortal&art=' + this.numero + '&id=' + this.$store.getters['user/getUser'].registro, '_blank')
    },
    downloadBoleto (painel) {
      window.open(process.env.URL_LEGADO + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=guiaAnuidade&codigoDivida=' + this.codigoDivida, '_blank')
    }
  }
}
</script>
