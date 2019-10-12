<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Ouvidoria" icon="record_voice_over" />
    </q-breadcrumbs>
  <br>
    <q-card v-show="false" class="q-ma" style="border-color: #eeeeee;" color="white" text-color="dark">
        <q-card-main>
          <div class="q-subheading">
              A fim de facilitar o seu contato, informamos que a primeira instância de atendimento do Crea-RJ
              é a Unidade de Atendimento, através da sua Central de Relacionamento:
          </div>
          <p><div class="q-caption"><q-icon name="remove"/>&nbsp;Telefone: (21) 2179-2007</div>
          <p><div class="q-caption"><q-icon name="remove"/>&nbsp;E-mail: atendimento@crea-rj.org.br</div>
          <br>
          <div>
            Estes canais facilitarão o seu acesso às informações e orientações de procedimentos, envidando todos os esforços para resolver as demandas apresentadas pelos usuários dos serviços do Crea-RJ. A Ouvidoria funciona como última instância para o encaminhamento de manifestações. Sendo assim, caberá à Ouvidoria atuar apenas nos assuntos analisados e tratados originalmente pela Central de Relacionamento e/ou Unidades competentes, esgotadas as possibilidades de ação por parte delas.
          </div>
        </q-card-main>
      </q-card>
      <grid-ouvi-atendimento/>
    </q-page>
</template>
<script>
import GridOuviAtendimento from '../components/grids/grid-ouvi-atendimento'
export default {
  components: {
    GridOuviAtendimento
  },
  props: {
    cadastro: Object
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
