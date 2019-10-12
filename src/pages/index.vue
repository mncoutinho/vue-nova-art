<template>
  <q-page class="layout-padding justify-center">
    <!-- <img src="~assets/crea_logo_marcadagua-minerva.png" > -->
    <q-jumbotron>
      <div class="q-display-2">Novo Portal CREA Online 2.0</div>
      <br>
      <div class="q-subheading">
        Estamos atualizando o Portal CREA Online para uma nova plataforma com novos recursos e diversas melhorias.  Nessa primeira fase estamos disponibilizando as seguintes funcionalidades:
      </div>
    </q-jumbotron>
    <q-card  class="q-ma-sm" style="border-color: #eeeeee;">
      <q-card-title>
        Acesso Rápido
      </q-card-title>
      <q-list separator>
        <q-collapsible icon="fas fa-barcode" label="Guias em aberto" @show="$refs.gridDividas.carregaGrid()" @hide="$refs.gridDividas.limpaGrid()">
          <div>
            <grid-art-dividas-index ref="gridDividas"></grid-art-dividas-index>
          </div>
        </q-collapsible>

        <q-collapsible icon="no_sim" label="Arts em Exigência" @show="$refs.gridExigencia.carregaGrid()" @hide="$refs.gridExigencia.limpaGrid()">
          <div>
            <grid-art-exigencia-index ref="gridExigencia"></grid-art-exigencia-index>
          </div>
        </q-collapsible>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import GridArtExigenciaIndex from '../components/grids/grid-art-exigencia-index'
import GridArtDividasIndex from '../components/grids/grid-art-dividas-index'
export default {
  components: {
    GridArtExigenciaIndex,
    GridArtDividasIndex
  },
  name: 'Home',
  props: ['token'],
  data () {
    return {
      opened: false
    }
  },
  created () {
    if (this.token) {
      this.$axios
        .get('corporativo/usuario-sessao', {
          headers: {
            'Authorization': this.token
          }
        })
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            localStorage.setItem('token', this.token)
            this.$store.commit('user/setUser', response.data.data)
          } else {
          }
        })
    } else {
      // window.open(process.env.API + '/#/app/home', '_self')
    }
  }
}
</script>

<style>
</style>
