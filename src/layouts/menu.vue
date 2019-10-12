<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Crea Online 2.0
          <span style="color: #cc0000; font-size: 18px; font-weight: bold;">{{homologacao}}</span>
          <div slot="subtitle">O CREA-RJ a um clique</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" >
        <q-card style="border-color: #eeeeee;">
          <q-item v-if="this.$store.getters['user/getUser']">
            <q-item-side v-if="this.$store.getters['user/getUser'].base64 !== null && this.$store.getters['user/getUser'].base64 !== ''">
              <img :src="this.$store.getters['user/getUser'].base64" round style=" width: 65px; height: auto; border-radius: 6px;" />
            </q-item-side>
            <q-item-main
              class="text-bold"
              style="font-size: 14px"
              :label="this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial"
            >
              <q-item-tile stamp color="dark">Registro: {{this.$store.getters['user/getUser'].registro}}</q-item-tile>
              <q-item-tile stamp color="dark">Situação: {{situacao}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-card>
        <br />
      <q-btn size="15px" class="full-width" align="left" @click.native="home" color="grey-8" flat>
        <q-icon size="18px" color="dark" name="home"/>&nbsp;&nbsp;<q-item>&nbsp;&nbsp;Página Inicial</q-item>
      </q-btn>
      <q-collapsible v-for="m in listaMenu" :key="m.id" :icon="m.icon" :label="m.label">
        <q-item color="dark" v-for="c in m.children" link :to="c.router" :key="c.label">
          {{c.label}}
        </q-item>
        <q-item v-if="m.id === 1 && $store.getters['user/getTipoPessoa'] === 'EMPRESA'" color="dark"  link to="/dados-gerais/curriculo" >
          Dados Empresa
        </q-item>
        <q-item v-if="m.id === 1 && $store.getters['user/getTipoPessoa'] !== 'EMPRESA'" color="dark"  link to="/dados-gerais/curriculo">
          Dados Profissionais
        </q-item>
      </q-collapsible>
      <q-btn size="15px" class="full-width" align="left" color="grey-8" @click.native="faleConosco" flat>
        <q-icon size="18px" color="dark" name="fas fa-headset" />
        &nbsp;&nbsp;&nbsp;&nbsp;<q-item>Fale Conosco</q-item>
      </q-btn>
      <q-btn size="15px" class="full-width" align="left" color="grey-8" @click.native="ouvidoria" flat>
        <q-icon size="18px" color="dark" name="record_voice_over" />
        &nbsp;&nbsp;&nbsp;&nbsp;<q-item>Ouvidoria</q-item>
      </q-btn>
      <q-btn size="15px" class="full-width" align="left" color="grey-8" @click="sair()" flat>
        <q-icon size="18px" color="dark" name="lock" />
        &nbsp;&nbsp;&nbsp;&nbsp;<q-item>SAIR</q-item>
      </q-btn>
      <br>
      <q-card style="position: relative; bottom: 0; left: 0; border-color: #eeeeee;  top: 30px;">
        <q-item>
          <small class="text-grey-6">©2019 - Conselho Regional de Engenharia e Agronomia do Rio de Janeiro, todos os direitos reservados.</small>
        </q-item>
      </q-card>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
import listMenu from 'assets/menu'
export default {
  name: 'LayoutDefault',
  async created () {
    await this.getSituacaoRegistro()
    this.situacao = this.$store.getters['user/getUserSituacao']
  },
  data () {
    return {
      listaMenu: listMenu,
      user: {},
      leftDrawerOpen: this.$q.platform.is.desktop,
      selected: null,
      situacao: '',
      homologacao: process.env.AMBIENTE !== 'PROD' ? ' - AMBIENTE DE TESTES' : ''
    }
  },
  methods: {
    openURL,
    home () {
      this.$router.push('/')
    },
    faleConosco () {
      this.$router.push('/fale-conosco')
    },
    ouvidoria () {
      this.$router.push('/ouvidoria')
    },
    async getSituacaoRegistro () {
      if (this.$store.getters['user/getUserRegistro']) {
        await this.$axios
          .get('pessoa/situacao-registro/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.situacao = response.data.data.descricao
          })
      }
    },
    sair () {
      this.$store.commit('user/offUser')
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('ART')
      this.$store.commit('art/deleteArt')
      this.$router.push('/login')
      this.$q.notify({message: 'Usuário saiu do Crea Online', type: 'positive'})
    }
  }
}
</script>
