<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
        <q-breadcrumbs-el label="Guias" icon="fas fa-barcode" />
        <q-breadcrumbs-el label="Devolução / Transferência de Crédito" icon="far fa-handshake" />
    </q-breadcrumbs>
     <q-option-group
      class="q-mt-md"
      color="secondary"
      type="radio"
      inline
      v-model="devolucaoTransferencia"
      :options="[
        { label: 'DEVOLUÇÃO', value: 'dev', color: 'green' },
        { label: 'TRANSFERÊNCIA', value: 'transf', color: 'green' }
      ]" />
     <devolucao-credito v-if="devolucaoTransferencia === 'dev'" />
     <transferencia-credito v-if="devolucaoTransferencia === 'transf'" />
  </q-page>
</template>
<script>
import DevolucaoCredito from '../../components/financeiro/devolucao-transferencia-credito/devolucao-credito'
import TransferenciaCredito from '../../components/financeiro/devolucao-transferencia-credito/transferencia-credito'
export default {
  components: {
    DevolucaoCredito,
    TransferenciaCredito
  },
  data () {
    return {
      devolucaoTransferencia: 'dev'
    }
  }
}
</script>
