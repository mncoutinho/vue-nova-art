export default class PesquisaConsultaArt {
  constructor (idPessoa, tipoPessoa) {
    this.page = 1
    this.rows = 5
    this.tipoPessoa = tipoPessoa
    this.idPessoa = idPessoa
    this.numero = ''
    this.numeroArtPrincipal = ''
    this.idNatureza = null
    this.idTipo = null
    this.rascunho = false
    this.dataInicioContrato = ''
    this.dataFimContrato = ''
    this.dataInicioCadastro = ''
    this.dataFimCadastro = ''
    this.dataInicioPagamento = ''
    this.dataFimPagamento = ''
    this.exigencia = false
    this.nomeContratante = ''
  }
}
