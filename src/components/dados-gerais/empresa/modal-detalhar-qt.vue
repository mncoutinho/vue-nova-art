<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '55vw', minHeight: '28vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          DETALHAR QT/RT: {{qtDetalhado ? qtDetalhado.profissional.nome : ''}}
        </q-toolbar-title>
        <q-btn flat round dense
               color="white" icon="clear"
               v-close-overlay />
      </q-toolbar>
      <div class="layout-padding">

        <q-card v-if="qtDetalhado">
          <q-card-title class="bg-grey-3" text-color="white">
            <label id="label-view">QUADRO TÉCNICO</label>
          </q-card-title>
          <q-card-main style="margin-top:10px" class="q-ml-sm">

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">REGISTRO: </label>
                <span id="span-view">{{this.$store.getters['user/getUserRegistro']}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">NOME PROFISIONAL: </label>
                <span id="span-view">{{this.$store.getters['user/getUserNome']}}</span>
              </div>
            </div>
            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">REGISTRO EMPRESA: </label>
                <span id="span-view">{{qtDetalhado.empresa.registro}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">RAZÃO SOCIAL: </label>
                <span id="span-view">{{qtDetalhado.empresa.nome}}</span>
              </div>
            </div>
            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">DATA INICIAL NO QUADRO TÉCNICO: </label>
                <span id="span-view">{{qtDetalhado.dataInicioQuadro}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">DATA FINAL NO QUADRO TÉCNICO: </label>
                <span id="span-view">{{qtDetalhado.dataFimQuadro}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">DATA DE ADMISSÃO: </label>
                <span id="span-view">{{qtDetalhado.dataAdmissao}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">DATA DE DESLIGAMENTO: </label>
                <span id="span-view">{{qtDetalhado.dataDesligamento}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">DATA DO CONTRATO: </label>
                <span id="span-view">{{qtDetalhado.dataContrato}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">DATA DE VALIDADE DO CONTRATO: </label>
                <span id="span-view">{{qtDetalhado.dataValidadeContrato}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">VÍNCULO: </label>
                <span id="span-view">{{qtDetalhado.vinculo ? qtDetalhado.vinculo.descricao : ''}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">JORNADA DE TRABALHO: </label>
                <span id="span-view">{{qtDetalhado.jornadaTrabalho}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">CPT: </label>
                <span id="span-view">{{qtDetalhado.cpt}}</span>
              </div>
            </div>
          </q-card-main>
        </q-card>

      <div v-if="qtDetalhado && qtDetalhado.ehResponsavelTecnico">
        <q-card v-for="rt in responsabilidadesTecnicas" :key="rt.id" class="q-mt-md">
          <q-card-title class="bg-grey-3" text-color="white">
            <label id="label-view">RESPONSÁVEL TÉCNICO - {{rt.ramo}}</label>
          </q-card-title>
          <q-card-main style="margin-top:10px" class="q-ml-sm">

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">REGISTRO/NOME: </label>
                <span v-if="qtDetalhado.profissional" id="span-view">{{qtDetalhado.profissional.id + ' - ' + qtDetalhado.profissional.nome}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">DATA INICIAL COMO RESPONSÁVEL TÉCNICO: </label>
                <span id="span-view">{{rt.dataInicioRT}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">DATA FINAL COMO RESPONSÁVEL TÉCNICO: </label>
                <span id="span-view">{{rt.dataFimRT}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">DATA DA APROVAÇÃO: </label>
                <span id="span-view">{{qtDetalhado.dataAprovacao}}</span>
              </div>
            </div>

            <div class="row gutter-sm">
              <div class="col-6">
                <label id="internal-label">RAMO: </label>
                <span id="span-view">{{rt.ramo}}</span>
              </div>

              <div class="col-6">
                <label id="internal-label">ATIVIDADE: </label>
                <span id="span-view">{{rt.atividade}}</span>
              </div>
            </div>
          </q-card-main>
        </q-card>
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
      qtDetalhado: null,
      responsabilidadesTecnicas: []
    }
  },
  methods: {
    async toggle (qt) {
      await this.getQtDetalhadoByIdProfissional(qt)
      this.opened = !this.opened
    },
    async getQtDetalhadoByIdProfissional (qt) {
      await this.$axios
        .get('cadastro/empresa/quadro-tecnico-detalhado/' + qt.id)
        .then(response => {
          this.qtDetalhado = response.data.data
          this.qtDetalhado.profissional = qt.profissional
          this.responsabilidadesTecnicas = this.qtDetalhado.responsaveis
        })
    }
  }
}
</script>
