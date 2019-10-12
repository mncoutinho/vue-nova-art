export default class PesquisaConsultarOuvidoria {
  constructor (idAtendimento, idPessoa) {
    this.idPessoa = idPessoa
    this.idAtendimento = idAtendimento
    this.dataEntrada = ''
    this.dataMudanca = ''
    this.situacao = ''
    this.descricao = ''
    this.tipoDemanda = ''
    this.assunto = ''
    this.nomeResponsavel = ''
    this.page = 1
    this.rows = 5
  }
}
