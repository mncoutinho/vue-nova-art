<template>
  <div>
  <q-page padding class="docs-table">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="ART" icon="library_books" />
        <q-breadcrumbs-el label="Consulta" icon="search" />
      </q-breadcrumbs>
    <div class="overflow-hidden q-mt-md">
    </div>
    <filtro-consultas @autocomplete="filtroAutocomplete" @pesquisar="filtroPesquisar" />
    <q-table class="no-border-grid q-mt-xs"
             style="margin-top:30px;"
             ref="table"
             color="secondary"
             v-show="arts.length > 0"
             row-key="numero"
             :data="arts"
             :columns="columns"
             :pagination.sync="serverPagination"
             :loading = loading
             :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
             @request="request"
             no-data-label = "NENHUMA ART PARA EXIBIR. UTILIZE O FILTRO ACIMA PARA PESQUISAR."
             no-results-label="NENHUMA ART PARA EXIBIR."
             rows-per-page-label="ARTS POR PÁGINA:">
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="numero" :props="props">
        <small class="text-italic">{{ props.row.numero }}</small>
        </q-td>
        <q-td key="natureza" :props="props">
        <small>{{ props.row.natureza }}</small>
        </q-td>
        <q-td key="situacao" :props="props">
          <q-chip v-if="props.row.temDivida" color="red-14" dense>Cadastrada e não paga</q-chip>
          <q-chip v-if="!props.row.temDivida" color="info" dense>Registrada e paga</q-chip>
        </q-td>
        <q-td key="temDivida" :props="props">
        <small><div>{{!props.row.temDivida ? 'Não Possui Divida' : 'Possui Divida'}}</div></small>
        </q-td>
        <q-td key="acao" :props="props">
        </q-td>
        <q-td key="acaoEditar" :props="props">
            <q-btn-dropdown label="Ações"
                color="dark" size="10px"
                flat rounded>
                <q-list link>
                  <q-item v-close-overlay @click.native="imprimirArt(props.row.numero)">
                    <q-item-side color="dark" icon="print" />
                    <q-item-main >
                      Imprimir
                    </q-item-main>
                  </q-item>

                   <q-item v-close-overlay @click.native="$refs.modalPreview.toggle(props.row)" >
                  <!-- <q-item v-close-overlay @click.native="getArtPreview(props.row)" > -->
                    <q-item-side color="dark" icon="visibility" />
                    <q-item-main>
                      Visualizar
                    </q-item-main>
                  </q-item>
                  <q-item v-if="props.row.natureza === 'OBRA OU SERVICO' && !props.row.temDivida" v-close-overlay @click.native="$refs.modalLivroDeOrdem.toggle(props.row.numero)" >
                    <q-item-side color="dark" icon="book" />
                    <q-item-main >
                      Livro de Ordem
                    </q-item-main>
                  </q-item>
                  <!-- <q-item v-if="props.row.temDivida" v-close-overlay @click.native="$refs.modalDividas.toggle(props.row.numero)" > -->
                  <q-item v-if="props.row.temDivida" v-close-overlay @click.native="$refs.modalDividas.toggle(props.row.numero)" >
                    <q-item-side color="dark" icon="monetization_on" />
                    <q-item-main >
                      Mostrar Dívida
                    </q-item-main>
                  </q-item>
                  <q-item v-if="(props.row.dataPagamento !== '' || props.row.acaoOrdinaria) && props.row.idBaixa !== 8" v-close-overlay @click.native="$refs.modalBaixa.toggle(props.row.numero)" >
                    <q-item-side color="dark" icon="done_all" />
                    <q-item-main >
                      Dar Baixa
                    </q-item-main>
                  </q-item>
                  <q-item v-if="props.row.temExigencia" v-close-overlay @click.native="$refs.modalArtExigencias.toggle(props.row.numero)" >
                    <q-item-side color="dark" icon="no_sim" />
                    <q-item-main >
                      Exigências
                    </q-item-main>
                  </q-item>
                  <q-item v-if="false" v-close-overlay  @click.native="copiarArt(props.row.numero)">
                    <q-item-side color="dark" icon="file_copy" />
                    <q-item-main >
                      Copiar ART
                    </q-item-main>
                  </q-item>
                  <q-item v-if="props.row.numero.includes('OL') || props.row.numero.includes('IN')" v-close-overlay @click.native="cartaResposta()" >
                    <q-item-side color="dark" icon="visibility" />
                    <q-item-main>
                      Carta Resposta
                    </q-item-main>
                  </q-item>
                </q-list>
            </q-btn-dropdown>
        </q-td>
      </q-tr>
    </q-table>
    <modal-preview-art ref="modalPreview" />
    <modal-art-exigencias ref="modalArtExigencias" />
    <modal-dividas-art ref="modalDividas" />
    <modal-baixa-art ref="modalBaixa" @botaoPesquisar="botaoPesquisar" />
    <modal-livro-ordem ref="modalLivroDeOrdem" />
  </q-page>
  </div>
</template>
<script>
import ModalPreviewArt from '../../components/modais/modal-preview-art'
import ModalArtExigencias from '../../components/modais/modal-art-exigencias'
import ModalBaixaArt from '../../components/modais/modal-baixa-art'
import ModalDividasArt from '../../components/modais/modal-dividas-art'
import PesquisaConsultaArt from '../../components/models/PesquisaConsultaArt'
import ModalLivroOrdem from '../../components/modais/modal-livro-ordem'
import { filter } from 'quasar'
import { dialog } from '../../mixins/mixin-dialog'
import FiltroConsultas from '../../components/consultas/filtro-consultas'
export default {
  mixins: [dialog],
  components: {
    ModalPreviewArt,
    ModalBaixaArt,
    ModalDividasArt,
    ModalArtExigencias,
    ModalLivroOrdem,
    FiltroConsultas
  },
  created () {
    this.$q.notify({icon: 'info', message: 'Caso o boleto tenha sido vencido há mais de 15 dias, a ART será cancelada após 15 dias do comunicado do e-mail.', color: 'black', position: 'bottom-left'})
    this.user = this.$store.getters['user/getUser']
    this.pesquisa = new PesquisaConsultaArt(this.user.registro, this.user.tipoPessoa)
    console.log(this.user)
  },
  data () {
    return {
      user: this.$store.getters['user/getUser'],
      arts: [],
      pesquisaArt: {},
      contratos: [],
      pesquisa: {},
      serverPagination: {
        page: 1,
        rowsNumber: 5
      },
      columns: [
        { name: 'numero', align: 'center', label: 'NÚMERO', field: 'numero' },
        { name: 'natureza', align: 'center', label: 'NATUREZA', field: 'natureza' },
        { name: 'situacao', align: 'center', label: 'SITUAÇÃO', field: 'situacao' },
        { name: 'temDivida', align: 'center', label: 'DÍVIDA', field: 'temDivida' },
        { name: 'acaoEditar', align: 'center', label: '', field: 'acaoEditar' },
        { name: 'acao', align: 'center', label: '', field: 'acao' }
      ],
      options: [
        {label: 'Número ART', value: 'numeroART'},
        {label: 'Número ART Principal', value: 'numeroArtPrincipal'},
        {label: 'Natureza', value: 'natureza'},
        {label: 'Tipo', value: 'tipo'},
        {label: 'Data Contrato', value: 'dataContrato'},
        {label: 'Data Cadastro', value: 'dataCadastro'},
        {label: 'Data Pagamento', value: 'dataPagamento'},
        {label: 'Exigencia', value: 'exigencia'},
        {label: 'Nome contratante', value: 'nomeContratante'}
      ],
      loading: false
    }
  },
  methods: {
    async filtroAutocomplete (autocomplete) {
      this.pesquisa = autocomplete.pesquisa
      if (autocomplete.tipo === 'numeroArt') {
        this.pesquisa.numero = autocomplete.terms
      } else if (autocomplete.tipo === 'numeroArtPrincipal') {
        this.pesquisa.numeroArtPrincipal = autocomplete.terms
      } else if (autocomplete.tipo === 'nomeContratante') {
        this.pesquisa.nomeContratante = autocomplete.terms
      }
      await this.getArts()
      autocomplete.done(filter(autocomplete.terms, {field: 'value', list: []}))
    },
    filtroPesquisar (pesquisa) {
      this.pesquisa = pesquisa
      this.pesquisa.page = 1
      this.getArts()
    },
    botaoPesquisar () {
      this.pesquisa.page = 1
      this.getArts()
    },
    async copiarArt (numeroART) {
      if (await this.dialogGeneric('Atenção', 'A natureza da ART será alterada, os campos incompatíveis com a natureza selecionada serão apagados, deseja prosseguir?')) {
        this.$router.push('/art/editar/' + numeroART)
      }
    },
    imprimirArt (numero) {
      window.open(process.env.URL_LEGADO + '/creaOnLine/home/realizarAtendimentoPublico.do?funcao=imprimirARTpdfPortal&art=' + numero + '&id=' + this.$store.getters['user/getUser'].registro, '_blank')
    },
    editar (art) {
      this.$router.push('/art/editar/' + art.numero)
    },
    async getArts () {
      this.arts = []
      await this.$axios
        .post('art/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.data) {
            this.arts = response.data.data
            if (this.pesquisa.page === 1) {
              this.serverPagination.rowsNumber = response.data.total_count
            }
          } else {
            this.$q.notify({icon: 'fas fa-eye-slash', message: 'Nenhum resultado para seu filtro, tente novamente.', type: 'negative', position: 'center'})
          }
        })
    },
    request (props) {
      this.pesquisa.rows = props.pagination.rowsPerPage
      this.serverPagination = props.pagination
      this.pesquisa.page = props.pagination.page
      this.contratos = this.getArts()
    },
    async getArtPreview (art) {
      this.$axios
        .get('art/' + art.numero)
        .then(response => {
          this.pesquisaArt.art = response.data.data
        })
      await this.getPreview()
    },
    getPreview () {
      this.pesquisaArt.template = 'ART_PREVIEW_CARGO_FUNCAO'
      this.$axios
        .post('commons/report/preview-art', this.pesquisaArt)
        .then(response => {
          let wnd = window.open()
          wnd.document.write(response.data)
        })
    },
    cartaResposta () {
      window.open('https://portalservicos.crea-rj.org.br/arquivos/cartaresposta.pdf', '_blank')
    }
  }
}
</script>
