<template>
  <q-page class="layout-padding justify-center">
    <q-breadcrumbs>
        <q-breadcrumbs-el label="Guias" icon="fas fa-barcode" />
        <q-breadcrumbs-el label="Gerar Parcelamento" icon="far fa-handshake" />
    </q-breadcrumbs>
    <br>
    <br>
    <div v-if="exibeDivConsultaEParcelar" class="row gutter-x-lg">
      <br>
      <div class="col-6">
       <botao
            :class="'full-width'"
            :label="'Consultar Parcelamentos'"
            :icon="'find_replace'"
            @emit="getListaTermoParcelamentos()" />
      </div>
      <div class="col-6">
        <botao
            :class="'full-width'"
            :label="'Parcelar Anuidades'"
            :icon="'far fa-handshake'"
            @emit="getListaDividasParcelamento()" />
      </div>
      <!--
      <div class="col-3">
        <botao
            :label="'Parcelar Autos de Infração (Multas)'"
            :icon="'fas fa-file-alt'" />
      </div>
      -->
      <div class="col-3">

      </div>
    </div>
    <br>
    <mensagem-validacao ref="msgValida" />
    <br>
    <div v-if="exibeDivConcluirParcelamento">
      <q-table
        ref="table"
        color="secondary"
        class="no-border-grid"
        row-key="codigo"
        :data="parcelamentoResponseDto.listaDividasAnuidades"
        :columns="columns"
        :loading="loading"
        :pagination="{rowsPerPage: 100}"
        selection="multiple"
        :selected.sync="selected"
        no-data-label = "Nenhuma dívida para exibir."
        no-results-label="Nenhuma dívida para exibir."
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td auto-width>
          <q-checkbox color="primary" v-model="props.selected" />
        </q-td>
        <q-td key="identificadorDivida" :props="props">
        <small class="text-italic">{{ props.row.identificadorDivida }}</small>
        </q-td>
        <q-td key="fase" :props="props">
        <small class="text-italic">{{ props.row.fase }}</small>
        </q-td>
        <q-td key="valorOriginal" :props="props">
          <small class="text-italic">{{ props.row.valorOriginalFormatado }}</small>
        </q-td>
        <q-td key="juros" :props="props">
        <small class="text-italic">{{ props.row.jurosFormatado }}</small>
        </q-td>
        <q-td key="multa" :props="props">
        <small class="text-italic">{{ props.row.multaFormatada }}</small>
        </q-td>
        <q-td key="honorarios" :props="props">
        <small class="text-italic">{{ props.row.honorariosFormatado }}</small>
        </q-td>
        <q-td key="valorTotal" :props="props">
        <small class="text-italic">{{ props.row.valorAtualFormatado }}</small>
        </q-td>
      </q-tr>
      <q-tr slot="bottom-row" slot-scope="props" :props="props">
        <q-td colspan="100%">
          <span id="span-view">Valor total de todas as dívidas: {{parcelamentoResponseDto.totalValorAtualDivAnuid}}  </span>
        </q-td>
      </q-tr>
      </q-table>
      <br>
      <br>
      <div class="row">
        <div class="col-3">
          <span id="span-view">Tipo de Parcelamento:</span>
          <q-select
            v-model="tipoParcelamentoSelecionado"
            :options="tipoParcelamento"
            @input="verificaTipoParcelamento"
          />

        </div>
      </div>
      <span id="span-view">{{mensagemParcelamento}}</span>
      <br>
      <br>
      <div class="row">
        <div class="col-12">
          <q-checkbox color="primary" v-model="termoCofissao" /> <span id="span-view">Concordo com o Termo de Confissão de dívida - <a href="http://localhost:8080/creaOnLine/home/pdf/CondicoesParcelamentoDivida.pdf" target="_blank">Clique Aqui para visualizar</a></span>
        </div>
      </div>
      <br>
      <div class="row justify-end q-mt-lg">
          <botao
            :label="'Concluir parcelamento'"
            :icon="'far fa-handshake'"
            @emit="concluirParcelamento()" />
          <botao
            :label="'Voltar'"
            :type="'secondary'"
            :icon="'undo'"
            @emit="exibeDivConsultaERealizarParcelamento()" />
      </div>
    </div>
    <div v-if="exibeDivParcelamentoConcluido">
      <div class="row">
        <div class="col-12">
          Termo número: {{parcelamentoResponseDto.numeroTermo}}
        </div>
      </div>
      <q-table
        ref="tableParcelamentoConcluido"
        color="secondary"
        class="no-border-grid"
        row-key="codigo"
        :data="parcelamentoResponseDto.listaDividasParcelasCadastradas"
        :columns="columnsTableParcelamentoConcluido"
        :loading="loading"
        :pagination="{rowsPerPage: 100}"
        no-data-label = "Nenhuma dívida para exibir."
        no-results-label="Nenhuma dívida para exibir."
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="identificadorDivida" :props="props">
          <small class="text-italic">{{ props.row.identificadorDivida }}</small>
        </q-td>
        <q-td key="valorOriginal" :props="props">
          <small class="text-italic">{{ props.row.valorOriginalFormatado }}</small>
        </q-td>
        <q-td key="juros" :props="props">
          <small class="text-italic">{{ props.row.jurosFormatado }}</small>
        </q-td>
        <q-td key="valorReajustado" :props="props">
          <small class="text-italic">{{ props.row.valorReajustadoFormatado }}</small>
        </q-td>
        <q-td key="multa" :props="props">
          <small class="text-italic">{{ props.row.multaFormatada }}</small>
        </q-td>
        <q-td key="honorarios" :props="props">
          <small class="text-italic">{{ props.row.honorariosFormatado }}</small>
        </q-td>
        <q-td key="valorPago" :props="props">
          <small class="text-italic">{{ props.row.valorPagoFormatado }}</small>
        </q-td>
        <q-td key="parcela" :props="props">
          <small class="text-italic">{{ props.row.parcela }}</small>
        </q-td>
        <q-td key="valorAtual" :props="props">
          <div v-if="props.row.__index == 0">
            <div v-if="props.row.valorPago != null && props.row.valorPago > 0">
              <small class="text-italic">R$ {{props.row.valorAtual - props.row.valorPago + parcelamentoResponseDto.totalValorAtualTaxaScpc}}</small>
            </div>
            <div v-if="props.row.valorPago == null || props.row.valorPago == 0">
              <small class="text-italic">R$ {{props.row.valorAtual + parcelamentoResponseDto.totalValorAtualTaxaScpc}}</small>
            </div>
          </div>
          <div v-if="props.row.__index > 0">
            <div v-if="props.row.valorPago != null && props.row.valorPago > 0">
              <small class="text-italic">R$ {{props.row.valorAtual - props.row.valorPago}}</small>
            </div>
            <div v-if="props.row.valorPago == null || props.row.valorPago == 0">
              <small class="text-italic">{{ props.row.valorAtualFormatado }}</small>
            </div>
          </div>
        </q-td>
        <q-td key="dataVencimento" :props="props">
          <small class="text-italic">{{ props.row.dataVencimento }}</small>
        </q-td>
      </q-tr>
      <q-tr slot="bottom-row" slot-scope="props" :props="props">
        <q-td colspan="100%">
          <span id="span-view">Valor total : {{parcelamentoResponseDto.totalValorAtualParcAnuidFormatado}}  </span>
        </q-td>
      </q-tr>
      </q-table>
      <div class="row justify-end q-mt-lg">
          <botao
            :label="'Baixar Boleto'"
            :icon="'fas fa-barcode'"
            @emit="gerarDocumentoPdfTermoDeParcelamento()" />
          <botao
            :label="'Voltar'"
            :type="'secondary'"
            :icon="'undo'"
            @emit="exibeDivConsultaERealizarParcelamento()" />
      </div>
    </div>
    <div v-if="exibeDivListaTermoParcelamento">
      <span id="span-view">Lista de Termos de Confissão de Dívida (Parcelamento)</span>
      <q-table
        ref="tableConsultaParcelamento"
        color="secondary"
        class="no-border-grid"
        row-key="codigo"
        :data="parcelamentoResponseDto.listaTermosParcelamento"
        :columns="columnsTableConsultaParcelamento"
        :loading="loading"
        :pagination="{rowsPerPage: 100}"
        no-data-label = "Nenhum termo de parcelamento para exibir."
        no-results-label="Nenhum termo de parcelamento para exibir."
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="numeroTermo" :props="props">
          <small class="text-italic">{{ props.row.numeroTermo }}</small>
        </q-td>
        <q-td key="data" :props="props">
          <small class="text-italic">{{ props.row.data }}</small>
        </q-td>
        <q-td key="qtdParcelas" :props="props">
          <small class="text-italic">{{ props.row.qtdParcelas }}</small>
        </q-td>
        <q-td key="qtdParcelasPagas" :props="props">
          <small class="text-italic">{{ props.row.qtdParcelasPagas }}</small>
        </q-td>
        <q-td key="valorTotal" :props="props">
          <small class="text-italic">R$ {{ props.row.valorTotal + parcelamentoResponseDto.totalValorAtualTaxaScpc }}</small>
        </q-td>
        <q-td key="valorPagar" :props="props">
          <small class="text-italic">R$ {{ props.row.valorPagar + parcelamentoResponseDto.totalValorAtualTaxaScpc }}</small>
        </q-td>
        <q-td key="descricaoDaDivida" :props="props">
          <small class="text-italic">{{ props.row.descricaoDaDivida }}</small>
        </q-td>
        <q-td key="acao" :props="props">
            <q-btn v-if="props.row.codigoStatusDivida == 1" size="10px" flat color="dark" rounded icon="fas fa-barcode" class="q-mr-md" @click="props.row.codigoNaturezaDivida == 6 ? getListaBoletosParcelamento(props.row.numeroTermo) : props.row.codigoNaturezaDivida == 2 ? getListaBoletosParcelamentoAutoDeInfracao() : ''">
              &nbsp;&nbsp;Reimpressão de Boleto
            </q-btn>
          </q-td>
      </q-tr>
      </q-table>
      <div class="row justify-end q-mt-lg">
          <botao
            :label="'Voltar'"
            :type="'secondary'"
            :icon="'undo'"
            @emit="exibeDivConsultaERealizarParcelamento()" />
      </div>
    </div>
    <div v-if="exibeDivListaBoletoParcelamento">
      <span id="span-view">Termo número: {{parcelamentoResponseDto.numeroTermo}}</span>
      <br>
      <span id="span-view">Lista de Dívidas referentes ao Termo</span>
      <q-table
        ref="tableConsultaBoletoParcelamento"
        color="secondary"
        class="no-border-grid"
        row-key="codigo"
        :data="parcelamentoResponseDto.listaDividasTermoDeParcelamento"
        :columns="columnsTableConsultaBoletoParcelamento"
        :loading="loading"
        :pagination="{rowsPerPage: 100}"
        no-data-label = "Nenhum termo de parcelamento para exibir."
        no-results-label="Nenhum termo de parcelamento para exibir."
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="identificadorDivida" :props="props">
          <small class="text-italic">{{ props.row.identificadorDivida }}</small>
        </q-td>
        <q-td key="descricaoNatureza" :props="props">
          <small class="text-italic">{{ props.row.descricaoNatureza }}</small>
        </q-td>
        <q-td key="parcela" :props="props">
          <small class="text-italic">{{ props.row.parcela }}</small>
        </q-td>
        <q-td key="descricaoStatusDaDivida" :props="props">
          <small class="text-italic">{{ props.row.descricaoStatusDaDivida }}</small>
        </q-td>
        <q-td key="valorOriginalFormatado" :props="props">
          <small class="text-italic">{{ props.row.valorOriginalFormatado}}</small>
        </q-td>
        <q-td key="jurosFormatado" :props="props">
          <small class="text-italic">{{ props.row.jurosFormatado}}</small>
        </q-td>
        <q-td key="multaFormatada" :props="props">
          <small class="text-italic">{{ props.row.multaFormatada }}</small>
        </q-td>
        <q-td key="honorariosFormatado" :props="props">
          <small class="text-italic">{{ props.row.honorariosFormatado }}</small>
        </q-td>
        <q-td key="valorAtualFormatado" :props="props">
          <div v-if="parcelamentoResponseDto.totalValorAtualTaxaScpc != null && parcelamentoResponseDto.totalValorAtualTaxaScpc != 0">
            <div v-if="props.row.__index == 0">
              <small class="text-italic">R$ {{ props.row.valorAtual + parcelamentoResponseDto.totalValorAtualTaxaScpc}}</small>
            </div>
            <div v-if="props.row.__index > 0">
              <small class="text-italic">{{ props.row.valorAtualFormatado}}</small>
            </div>
          </div>
          <div v-if="parcelamentoResponseDto.totalValorAtualTaxaScpc == null || parcelamentoResponseDto.totalValorAtualTaxaScpc == 0">
            <small class="text-italic">{{ props.row.valorAtualFormatado}}</small>
          </div>

        </q-td>
        <q-td key="dataVencimento" :props="props">
          <small class="text-italic">{{ props.row.dataVencimento }}</small>
        </q-td>
        <q-td key="acao" :props="props">
          <div v-if="props.row.statusDividaQuitado != 1">
            <div v-if="parcelamentoResponseDto.menorParcelaEmAberto == props.row.parcela && parcelamentoResponseDto.menorExercicioAberto == props.row.identificadorDivida">
              <div v-if="props.row.dividaVencida">
                <span>DIVIDA VENCIDA</span>
              </div>
              <div v-if="props.row.dividaVencida == false">
                <q-btn size="10px" flat color="dark" rounded icon="fas fa-barcode" class="q-mr-md" @click="gerarBoleto(props.row.codigo)">
                  &nbsp;&nbsp;Gerar Boleto
                </q-btn>
              </div>
            </div>
            <div v-if="parcelamentoResponseDto.menorParcelaEmAberto != props.row.parcela || parcelamentoResponseDto.menorExercicioAberto != props.row.identificadorDivida">
              <span>PARCELA EM ABERTO</span>
            </div>
          </div>
          <div v-if="props.row.statusDividaQuitado == 4">
            <span>DÍVIDA QUITADA</span>
          </div>
        </q-td>
      </q-tr>
      </q-table>
      <div class="row">
          <botao
            :label="'Voltar'"
            :type="'secondary'"
            :icon="'undo'"
            @emit="exibeDivConsultaERealizarParcelamento()" />
      </div>
    </div>
  </q-page>
</template>
<script>
import Botao from '../../components/button/botao'
import MensagemValidacao from '../../components/partials/mensagem-validacao'
export default {
  components: { Botao, MensagemValidacao },
  created () {
  },
  data () {
    return {
      columns: [
        { name: 'identificadorDivida', align: 'left', label: 'Identificador', field: 'identificadorDivida' },
        { name: 'fase', align: 'left', label: 'Fase', field: 'fase' },
        { name: 'valorOriginal', align: 'left', label: 'Valor Original', field: 'valorOriginal' },
        { name: 'juros', align: 'left', label: 'Juros', field: 'juros' },
        { name: 'multa', align: 'left', label: 'Multa', field: 'multa' },
        { name: 'honorarios', align: 'left', label: 'Honorários', field: 'multa' },
        { name: 'valorTotal', align: 'left', label: 'Valor Total', field: 'valorTotal' }
      ],
      columnsTableParcelamentoConcluido: [
        { name: 'identificadorDivida', align: 'left', label: 'Identificador', field: 'identificadorDivida' },
        { name: 'valorOriginal', align: 'left', label: 'Valor Original', field: 'valorOriginal' },
        { name: 'juros', align: 'left', label: 'Juros', field: 'juros' },
        { name: 'valorReajustado', align: 'left', label: 'Correção', field: 'valorReajustado' },
        { name: 'multa', align: 'left', label: 'Multa', field: 'multa' },
        { name: 'honorarios', align: 'left', label: 'Honorários', field: 'honorarios' },
        { name: 'valorPago', align: 'left', label: 'Valor Pago', field: 'valorPago' },
        { name: 'parcela', align: 'left', label: 'Parcela', field: 'parcela' },
        { name: 'valorAtual', align: 'left', label: 'Valor Atual', field: 'valorAtual' },
        { name: 'dataVencimento', align: 'left', label: 'Data de Vencimento', field: 'dataVencimento' }
      ],
      columnsTableConsultaParcelamento: [
        { name: 'numeroTermo', align: 'left', label: 'Número', field: 'numeroTermo' },
        { name: 'data', align: 'left', label: 'Data de Inclusão', field: 'data' },
        { name: 'qtdParcelas', align: 'left', label: 'Qtde de Parcelas', field: 'qtdParcelas' },
        { name: 'qtdParcelasPagas', align: 'left', label: 'Qtde de Parcelas Pagas', field: 'qtdParcelasPagas' },
        { name: 'valorTotal', align: 'left', label: 'Valor Total', field: 'valorTotal' },
        { name: 'valorPagar', align: 'left', label: 'Valor Pagar', field: 'valorPagar' },
        { name: 'descricaoDaDivida', align: 'left', label: 'Situação', field: 'descricaoDaDivida' },
        { name: 'acao', align: 'center', label: '', field: 'acao' }
      ],
      columnsTableConsultaBoletoParcelamento: [
        { name: 'identificadorDivida', align: 'left', label: 'Ident.', field: 'identificadorDivida' },
        { name: 'descricaoNatureza', align: 'left', label: 'Natureza', field: 'descricaoNatureza' },
        { name: 'parcela', align: 'left', label: 'Parcela', field: 'parcela' },
        { name: 'descricaoStatusDaDivida', align: 'left', label: 'Situação', field: 'descricaoStatusDaDivida' },
        { name: 'valorOriginalFormatado', align: 'left', label: 'Valor Original', field: 'valorOriginalFormatado' },
        { name: 'jurosFormatado', align: 'left', label: 'Juros', field: 'jurosFormatado' },
        { name: 'multaFormatada', align: 'left', label: 'Multa', field: 'multaFormatada' },
        { name: 'honorariosFormatado', align: 'left', label: 'Encargos da Dívida Ativa', field: 'honorariosFormatado' },
        { name: 'valorAtualFormatado', align: 'left', label: 'Valor Atual', field: 'valorAtualFormatado' },
        { name: 'dataVencimento', align: 'left', label: 'Data Venc.', field: 'dataVencimento' },
        { name: 'acao', align: 'left', label: 'Ação', field: 'acao' }
      ],
      loading: false,
      selecionado: false,
      selected: [],
      termoCofissao: false,
      tipoParcelamentoSelecionado: 'Integral',
      tipoParcelamento: [{'value': 'Integral', 'label': 'Integral', 'selected': true}, {'value': 'Quota', 'label': 'Quota'}],
      exibeDivConsultaEParcelar: true,
      exibeDivConcluirParcelamento: false,
      exibeDivParcelamentoConcluido: false,
      exibeDivListaTermoParcelamento: false,
      exibeDivListaBoletoParcelamento: false,
      mensagemParcelamento: null,
      parcelamentoResponseDto: {},
      parcelamentoRequestDto: {}
    }
  },
  methods: {
    async getListaDividasParcelamento () {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde...Estamos buscando a lista das dívidas para parcelamento.'
      })
      this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
      // this.parcelamentoRequestDto.idProfissional = '2000100052'
      this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
      this.loading = true
      await this.$axios
        .post('/financeiro/parcelamento/dividas-a-parcelar', this.parcelamentoRequestDto)
        .then(response => {
          this.loading = false
          if (response.data.type === 'INFORMATION') {
            console.log(response.data.messages)
            this.$refs.msgValida.toggle(response.data.messages)
            this.exibeDivConsultaERealizarParcelamento()
          } else {
            this.parcelamentoResponseDto = response.data.data
            this.parcelamentoRequestDto = response.data.data
            this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
            this.exibeDivParaConcluirParcelamento()
          }
          this.$q.loading.hide()
        }).catch(erro => {
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivConsultaERealizarParcelamento()
        })
    },
    async verificaTipoParcelamento () {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos buscando validando o tipo de parcelamento.'
      })
      this.parcelamentoRequestDto.tipoParcelamento = this.tipoParcelamentoSelecionado
      await this.$axios
        .post('/financeiro/parcelamento/valida-tipo-parcelamento', this.parcelamentoRequestDto)
        .then(response => {
          console.log('Entrou no response')
          console.log(response)
          this.mensagemParcelamento = response.data.data.mensagem
          this.tipoParcelamentoSelecionado = response.data.data.tipoParcelamento
          this.parcelamentoRequestDto.tipoParcelamento = response.data.data.tipoParcelamento
          this.parcelamentoRequestDto.quota = response.data.data.quota
          this.exibeDivParaConcluirParcelamento()
          this.$q.loading.hide()
        }).catch(erro => {
          console.log('Entrou no erro')
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivConsultaERealizarParcelamento()
        })
    },
    async concluirParcelamento () {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos processando e calculando o parcelamento.'
      })

      if (!this.termoCofissao) {
        this.$refs.msgValida.toggle(['Favor concordar com o termo de confissão de dívida.'])
        this.$q.loading.hide()
      } else {
        this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
        this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
        this.parcelamentoRequestDto.listaDividasAnuidadesSelecionadas = this.selected.sort(function (a, b) {
          return (a.__index > b.__index) ? 1 : ((b.__index > a.__index) ? -1 : 0)
        })
        console.log(this.parcelamentoRequestDto.listaDividasAnuidadesSelecionadas)
        await this.$axios
          .post('/financeiro/parcelamento/concluir-parcelamento', this.parcelamentoRequestDto)
          .then(response => {
            this.loading = false
            this.$q.loading.hide()
            if (response.data.type === 'INFORMATION') {
              this.$refs.msgValida.toggle(response.data.messages)
              this.exibeDivParaConcluirParcelamento()
            } else {
              this.parcelamentoResponseDto = response.data.data
              this.exibeDivParaParcelamentoConcluido()
              this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
              this.gerarDocumentoPdfTermoDeParcelamento()
            }
          }).catch(erro => {
            this.loading = false
            this.$refs.msgValida.toggle(erro.response.data.messages)
            this.$q.loading.hide()
            this.exibeDivConsultaERealizarParcelamento()
          })
      }
    },
    async gerarDocumentoPdfTermoDeParcelamento () {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos gerando o documento de Termo do seu parcelamento.'
      })
      this.parcelamentoRequestDto = this.parcelamentoResponseDto
      this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
      this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
      await this.$axios
        .post('/financeiro/parcelamento/gerar-termo-parcelamento', this.parcelamentoRequestDto,
          {
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/pdf'
            }
          })
        .then(response => {
          this.$q.loading.hide()
          const blob = new Blob([response.data], {
            type: 'application/pdf'
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'termo-parcelamento.pdf')
          document.body.appendChild(link)
          link.click()
        }).catch(erro => {
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivParaParcelamentoConcluido()
        })
    },
    async getListaTermoParcelamentos () {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos buscando a lista de termos de parcelamento.'
      })
      this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
      this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
      this.loading = true
      await this.$axios
        .post('/financeiro/parcelamento/listar-termo-parcelamento', this.parcelamentoRequestDto)
        .then(response => {
          console.log(response)
          this.loading = false
          if (response.data.type === 'INFORMATION') {
            this.$refs.msgValida.toggle(response.data.messages)
          } else {
            this.parcelamentoResponseDto = response.data.data
            this.parcelamentoRequestDto = response.data.data
            this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
            console.log(this.parcelamentoResponseDto)
            this.exibeDivParaListaTermoParcelamento()
          }
          this.$q.loading.hide()
        }).catch(erro => {
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivConsultaERealizarParcelamento()
        })
    },
    async getListaBoletosParcelamento (numeroTermo) {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos buscando a lista de boletos do termo de parcelamento.'
      })
      this.parcelamentoRequestDto.numeroTermo = numeroTermo
      this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
      this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
      this.loading = true
      await this.$axios
        .post('/financeiro/parcelamento/listar-boleto-parcelamento', this.parcelamentoRequestDto)
        .then(response => {
          this.loading = false
          if (response.data.type === 'INFORMATION') {
            this.$refs.msgValida.toggle(response.data.messages)
          } else {
            this.parcelamentoResponseDto = response.data.data
            this.parcelamentoRequestDto = response.data.data
            this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
            this.exibeDivParaListaBoletoParcelamento()
          }
          this.$q.loading.hide()
        }).catch(erro => {
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivConsultaERealizarParcelamento()
        })
    },
    async gerarBoleto (codigoDivida) {
      this.$refs.msgValida.fechar()
      this.$q.loading.show({
        message: 'Aguarde. Estamos gerando o boleto do seu parcelamento.'
      })
      this.parcelamentoRequestDto.idProfissional = this.$store.getters['user/getUser'].registro
      this.parcelamentoRequestDto = this.parcelamentoResponseDto
      this.parcelamentoRequestDto.nomePessoa = this.$store.getters['user/getUser'].nome || this.$store.getters['user/getUser'].razaoSocial
      this.parcelamentoRequestDto.codigoDivida = codigoDivida
      await this.$axios
        .post('/financeiro/parcelamento/gerar-boleto', this.parcelamentoRequestDto,
          {
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/pdf'
            }
          })
        .then(response => {
          this.$q.loading.hide()
          const blob = new Blob([response.data], {
            type: 'application/pdf'
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'guia-reimpressao-boleto-parcelamento.pdf')
          document.body.appendChild(link)
          link.click()
        }).catch(erro => {
          this.loading = false
          this.$refs.msgValida.toggle(erro.response.data.messages)
          this.$q.loading.hide()
          this.exibeDivParaParcelamentoConcluido()
        })
    },
    getListaBoletosParcelamentoAutoDeInfracao () {
    },
    exibeDivConsultaERealizarParcelamento () {
      this.exibeDivConsultaEParcelar = true
      this.exibeDivConcluirParcelamento = false
      this.exibeDivParcelamentoConcluido = false
      this.exibeDivListaTermoParcelamento = false
      this.exibeDivListaBoletoParcelamento = false
      this.parcelamentoResponseDto = {}
      this.parcelamentoRequestDto = {}
    },
    exibeDivParaConcluirParcelamento () {
      this.exibeDivConsultaEParcelar = false
      this.exibeDivParcelamentoConcluido = false
      this.exibeDivListaTermoParcelamento = false
      this.exibeDivListaBoletoParcelamento = false
      this.exibeDivConcluirParcelamento = true
    },
    exibeDivParaParcelamentoConcluido () {
      this.exibeDivConsultaEParcelar = false
      this.exibeDivConcluirParcelamento = false
      this.exibeDivListaTermoParcelamento = false
      this.exibeDivListaBoletoParcelamento = false
      this.exibeDivParcelamentoConcluido = true
    },
    exibeDivParaListaTermoParcelamento () {
      this.exibeDivConsultaEParcelar = false
      this.exibeDivConcluirParcelamento = false
      this.exibeDivParcelamentoConcluido = false
      this.exibeDivListaBoletoParcelamento = false
      this.exibeDivListaTermoParcelamento = true
    },
    exibeDivParaListaBoletoParcelamento () {
      this.exibeDivConsultaEParcelar = false
      this.exibeDivConcluirParcelamento = false
      this.exibeDivParcelamentoConcluido = false
      this.exibeDivListaTermoParcelamento = false
      this.exibeDivListaBoletoParcelamento = true
    }
  }
}
</script>
