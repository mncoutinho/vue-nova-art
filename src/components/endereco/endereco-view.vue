<template>
  <div>
    <div v-if="enderecoView.cep !== '00000000'">
      <div class="row gutter-xs justify-between">
        <div class="col-md-3">
          <label id="internal-label">CEP: </label><span id="span-view" v-if="enderecoView.cep">{{enderecoView.cep}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">UF: </label><span id="span-view">{{enderecoView.uf.sigla}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">MUNICÍPIO: </label><span id="span-view">{{enderecoView.localidade.descricao}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">BAIRRO: </label><span id="span-view">{{enderecoView.bairro}}</span>
        </div>
      </div>
      <div class="row gutter-xs justify-between">
        <div class="col-md-3">
          <label id="internal-label">LOGRADOURO: </label><span id="span-view">{{enderecoView.tipoLogradouro.descricao}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">ENDEREÇO: </label><span id="span-view">{{enderecoView.logradouro}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">NÚMERO: </label><span id="span-view">{{enderecoView.numero}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">COMPLEMENTO: </label><span id="span-view">{{enderecoView.complemento}}</span>
        </div>
      </div>
      <div class="row gutter-xs justify-between">
        <div class="col-md-3" v-if="this.$store.getters['art/ehObraEServico']">
          <label id="internal-label">LATITUDE: </label><span id="span-view">{{enderecoView.latitude}}</span>
        </div>
        <div class="col-md-3" v-if="this.$store.getters['art/ehObraEServico']">
          <label id="internal-label">LONGITUDE: </label><span id="span-view">{{enderecoView.longitude}}</span>
        </div>
      </div>
    </div>
     <div v-if="enderecoView.cep === '00000000'">
      <div class="row gutter-xs justify-between">
        <div class="col-md-3">
          <label id="internal-label">PAÍS: </label><span id="span-view">{{enderecoView.uf.descricao}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">BAIRRO: </label><span id="span-view">{{enderecoView.bairro}}</span>
        </div>
      </div>
      <div class="row gutter-xs justify-between">
        <div class="col-md-3">
          <label id="internal-label">ENDEREÇO: </label><span id="span-view">{{enderecoView.logradouro}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">NÚMERO: </label><span id="span-view">{{enderecoView.numero}}</span>
        </div>
        <div class="col-md-3">
          <label id="internal-label">COMPLEMENTO: </label><span id="span-view">{{enderecoView.complemento}}</span>
        </div>
      </div>
      <div class="row gutter-xs justify-between">
        <div class="col-md-3" v-if="this.$store.getters['art/ehObraEServico']">
          <label id="internal-label">LATITUDE: </label><span id="span-view">{{enderecoView.latitude}}</span>
        </div>
        <div class="col-md-3" v-if="this.$store.getters['art/ehObraEServico']">
          <label id="internal-label">LONGITUDE: </label><span id="span-view">{{enderecoView.longitude}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['enderecoView']
}
</script>
