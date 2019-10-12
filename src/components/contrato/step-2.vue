<template>
  <div>
    <q-step default name="dados-iniciais" :title="title">
      <mensagem-validacao ref="msgValida" />
      <div class="row gutter-x-sm gutter-y-sm">
        <div class="col-4" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <input-numero-contrato />
        </div>
        <div class="col-4" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <input-salario :temProlabore="temProlabore" />
        </div>
        <div class="col-4" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <input-valor-contrato />
        </div>
        <div class="col-4" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <pro-labore @validaProlabore="validaProlabore"/>
        </div>
        <div class="col-4" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <input-nhhjt/>
        </div>
        <div class="col-4" v-if="!this.$store.getters['art/ehDesempenhoDeCargoEFuncao']">
          <input-data-celebracao/>
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" style="margin-top: 10px">
        <div class="col-4">
          <select-tipo-unidade-administrativa @mostraEnderecoObra="mostraEnderecoObra" />
        </div>
        <div class="col-4">
          <prazo-determinado />
        </div>
        <div class="col-4">
          <select-tipo-vinculo />
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px">
        <div class="col-4">
          <input-data-inicio-contrato />
        </div>
        <div class="col-4">
          <input-data-fim-contrato v-if="this.$store.getters['art/exibePrazoMesDia']"  />
        </div>
        <div class="col-4" v-if="this.$store.getters['art/ehObraEServico']">
          <select-finalidade></select-finalidade>
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" style="margin-top: 10px">
        <div class="col-4" v-if="this.$store.getters['art/ehObraEServico']" >
          <input-numero-art-vinculada-contrato  />
        </div>
        <div class="col-4" v-if="this.$store.getters['art/ehObraEServico']">
          <input-codigo-obra-servico />
        </div>
      </div>
      <div class="row gutter-x-sm gutter-y-sm" v-if="this.$store.getters['art/ehDesempenhoDeCargoEFuncao']" style="margin-top: 10px">
        <div class="col-4">
          <select-tipo-cargo-funcao v-if="!this.$store.getters['art/temTipoFuncao']" />
        </div>
        <div class="col-4">
          <select-tipo-funcao v-if="!this.$store.getters['art/temTipoCargoFuncao']" />
          <input-descricao-cargo-funcao v-if="!this.$store.getters['art/temTipoFuncao'] && this.$store.getters['art/getTipoCargoFuncaoEhOutro']" />
        </div>
        <div class="col-4">
          <input-descricao-cargo-funcao v-if="!this.$store.getters['art/temTipoCargoFuncao'] && this.$store.getters['art/getTipoFuncaoEhOutro']" />
        </div>
      </div>
      <br>
      <q-stepper-navigation class="row justify-left">
        <botao :label="'Voltar'"
               :type="'secondary'"
               :icon="'reply'"
               class="q-mt-md q-mr-md"
               @emit="$emit('voltar')" />
        <botao :label="'Próximo'"
               :icon="'redo'"
               :loading="showLoadingBtn"
               class="q-mt-md"
               @emit="prosseguir()" />
      </q-stepper-navigation>
    </q-step>
  </div>
</template>

<script>
import Botao from '../../components/button/botao'
import MensagemValidacao from '../partials/mensagem-validacao'
import InputNumeroContrato from '../input/input-numero-contrato'
import InputSalario from '../input/input-salario'
import InputValorContrato from '../input/input-valor-contrato'
import InputDataCelebracao from '../input/input-data-celebracao'
import ProLabore from '../option-groups/pro-labore'
import InputDataInicioContrato from '../input/input-data-inicio-contrato'
import InputDataFimContrato from '../input/input-data-fim-contrato'
import SelectTipoUnidadeAdministrativa from '../selects/select-tipo-unidade-administrativa'
import PrazoDeterminado from '../option-groups/prazo-determinado'
import SelectTipoVinculo from '../selects/select-tipo-vinculo'
import InputPrazoMesContrato from '../input/input-prazo-mes-contrato'
import InputPrazoDiaContrato from '../input/input-prazo-dia-contrato'
import SelectTipoCargoFuncao from '../selects/select-tipo-cargo-funcao'
import SelectTipoFuncao from '../selects/select-tipo-funcao'
import InputDescricaoCargoFuncao from '../input/input-descricao-cargo-funcao'
import InputNhhjt from '../input/input-nhhjt'
import SelectFinalidade from '../selects/select-finalidade'
import InputCodigoObraServico from '../input/input-codigo-obra-servico'
import InputNumeroArtVinculadaContrato from '../input/input-numero-art-vinculada-contrato'
import { notify } from '../../mixins/mixin-notify'
import _ from 'lodash'
export default {
  mixins: [notify],
  components: {
    Botao,
    InputNumeroContrato,
    InputSalario,
    InputValorContrato,
    InputDataCelebracao,
    ProLabore,
    InputDataInicioContrato,
    InputDataFimContrato,
    SelectTipoUnidadeAdministrativa,
    PrazoDeterminado,
    SelectTipoVinculo,
    InputPrazoMesContrato,
    InputPrazoDiaContrato,
    SelectTipoCargoFuncao,
    SelectTipoFuncao,
    InputDescricaoCargoFuncao,
    MensagemValidacao,
    InputNhhjt,
    SelectFinalidade,
    InputCodigoObraServico,
    InputNumeroArtVinculadaContrato
  },
  created () {
    this.title = 'DADOS DO CONTRATO'
  },
  data () {
    return {
      showLoadingBtn: false,
      temProlabore: false,
      title: ''
    }
  },
  methods: {
    prosseguir: _.debounce(function (value) {
      this.showLoadingBtn = true
      this.validaPreenchimentoDadosIniciaisDoContrato()
    }, 1000),
    validaPreenchimentoDadosIniciaisDoContrato () {
      this.$axios
        .get('art/valida/contratos/preenchimento-dados-iniciais/' + this.$store.getters['art/getId'])
        .then(response => {
          this.calculaEAtualizaDataFim()
        })
        .catch(erro => {
          this.showLoadingBtn = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    validaProlabore (value) {
      this.temProlabore = value
    },
    calculaEAtualizaDataFim () {
      this.$axios
        .put('art/contratos/calcula-data-fim', { numero: this.$store.getters['art/getId'] })
        .then(response => {
          this.validaRegistrosProfissionalEEmpresaNoPeriodoDoContrato()
        })
    },
    validaRegistrosProfissionalEEmpresaNoPeriodoDoContrato () {
      this.$axios
        .get('art/valida/contratos/registros-periodo-contrato/' + this.$store.getters['art/getId'])
        .then(response => {
          this.$emit('prosseguir')
          this.showLoadingBtn = false
        })
        .catch(erro => {
          this.showLoadingBtn = false
          if (erro.response.data) {
            this.$refs.msgValida.toggle(erro.response.data.messages)
          } else {
            this.$refs.msgValida.toggle(erro.response.messages)
          }
        })
    },
    mostraEnderecoObra () {
      this.$emit('mostraEnderecoObra')
    }
  }
}
</script>
