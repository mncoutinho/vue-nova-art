<template>
  <q-card >
    <q-card-title class="bg-grey-3" text-color="white">
      <label id="label-view" >DESCRIÇÃO</label><info-help v-model="showing" :tipo="tipoDescricaoComplementar" />
    </q-card-title>
    <q-card-main>
      <q-field :count="200">
        <q-input v-model="descricaoComplementar"
              float-label="Informações complementares"
              type="textarea"
              maxlength="200"
              rows="4"
              @input="atualiza"
              @focus="info"/>
      </q-field>
    </q-card-main>
  </q-card>
</template>
<script>
import _ from 'lodash'
import InfoHelp from '../info/info-help'
export default {
  components: {InfoHelp},
  created () {
    this.descricaoComplementar = this.$store.getters['art/getDescricaoComplementar']
    if (this.$store.getters['art/ehDesempenhoDeCargoEFuncao']) {
      this.textoDescricaoComplementar = 'Este campo é para descrever a designação do seu cargo ou função e não atividades exercidas em decorrência do cargo. Estas atividades devem ser objeto de ART de obra ou serviço específica ou múltiplas. Quando preenchido, este campo será submetido obrigatoriamente à análise do Crea.'
      this.tipoDescricaoComplementar = 'descricaoComplementarCargoOuFuncao'
    } else {
      this.textoDescricaoComplementar = 'Este campo não tem como objetivo descrever detalhadamente o contrato,  nem seu objeto, que deverá constar do atestado emitido pelo contratante. Campo para descrição de alguma especificidade necessária a delimitação de sua responsabilidade técnica, ou quando não houver codificação para atividade técnica (código outros) esclarecer o serviço realizado compatível com suas atribuições profissionais. Quando preenchido, este campo será submetido obrigatoriamente à análise do Crea.'
      this.tipoDescricaoComplementar = 'descricaoComplementar'
    }
  },
  data () {
    return {
      descricaoComplementar: null,
      showing: false,
      textoDescricaoComplementar: null,
      tipoDescricaoComplementar: null
    }
  },
  methods: {
    atualiza: _.debounce(function (value, oldValue) {
      this.$axios
        .put('art/contratos/descricao-complementar', { descricao: value, numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.$store.commit('art/setDescricaoComplementar', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar a descrição complementar, favor tentar novamente', 'negative', 1500)
        })
    }, 2000),
    info () {
      this.showing = !this.showing
    }
  }
}
</script>
