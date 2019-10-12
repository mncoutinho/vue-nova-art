<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '70vw', minHeight: '45vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
          <q-toolbar-title align="center">
          Gerar Certidão
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
                  <div class="row justify-center full-height full-width text-center">
                      <div class="col-6" >
                        <q-radio
                          color="secondary"
                          v-model="online"
                          val="1"
                          label="ONLINE" />
                          <info-help tipo="certidaoOnline" />
                      </div>
                      <div class="col-6">
                        <q-radio
                          color="secondary"
                          v-model="online"
                          val="0"
                          label="PRESENCIAL" />
                          <info-help tipo="certidaoPresencial" />
                      </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
            <div class="col-12">
              <certidao-online @toggle="toggle" :listArts="listArts" :listEmpresas="listEmpresas" v-if="online === '1'" />
              <certidao-presencial @toggle="toggle" :listArts="listArts" :listEmpresas="listEmpresas" v-if="online === '0'" />
            </div>
        </div>
    </q-modal-layout>
  </q-modal>
</div>
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
      listArts: [],
      listEmpresas: [],
      opened: false,
      online: null
    }
  },
  methods: {
    async toggle () {
      this.getEmpresasCurriculo()
      this.getArtsAcervoTecnico()
      this.online = ''
      this.opened = !this.opened
    },
    getEmpresasCurriculo () {
      this.$axios
        .get('cadastro/empresa/curriculo')
        .then(response => {
          this.listEmpresas = response.data.data
        })
    },
    getArtsAcervoTecnico () {
      this.$axios
        .get('art/acervo')
        .then(response => {
          this.listArts = response.data.data
        })
    }
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
