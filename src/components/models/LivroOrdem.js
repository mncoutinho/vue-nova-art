export default class Premio {
  constructor (numeroArt) {
    this.numeroArt = numeroArt
  }
  codigo = null
  numeroArt = null
  dataInicioDaEtapa = null
  dataConclusao = null
  relatoVisitaResponsavelTecnico = null
  orientacao = null
  acidentesDanosMateriais = null
  periodosInterrupcaoEMotivos = null
  outrosFatosEObservacoes = null
  idPessoa = null
  nomeContratado = null
  arquivo = { id: null, nomeOriginal: '', uri: '', modulo: 'ART', privado: true }
}
