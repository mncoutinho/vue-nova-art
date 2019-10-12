<template>
    <q-modal v-model="opened" :content-css="{minWidth: '70vw', minHeight: '45vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">
          Impedimentos
          </q-toolbar-title>
          <q-btn
              flat
              round
              dense
              color="white"
              icon="clear"
              v-close-overlay/>
        </q-toolbar>
      <div class="layout-padding ">
        <div class="col-12">
              <q-card class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
                <q-card-main>
                </q-card-main>
              </q-card>
            </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import InfoHelp from '../../info/info-help'
import CertidaoOnline from './certidao-online'
import CertidaoPresencial from './certidao-presencial'
export default {
  components: {
    InfoHelp,
    CertidaoPresencial,
    CertidaoOnline
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
  }
}
</script>
<style>
span {
  font-size: 13px;
}
.q-modal{
  touch-action: none
}
</style>
