export default class CertidaoProtocolo {
  constructor (certidaoForm, tipo, finalidade) {
    this.finalidade = finalidade
    this.certidao = this.preencheCertidao(certidaoForm)
    this.tipoPessoa = certidaoForm.tipoPessoa
    this.tipoAssuntoProtocolo = this.preencheTipoAssuntoCertidao(tipo)
    this.enumTipoProtocolo = 'CERTIDAO'
    this.idUnidadeDeAtendimento = 99999
    this.idPessoa = certidaoForm.idPessoa
  }
  preencheCertidao (certidaoForm) {
    console.log(certidaoForm)
    if (certidaoForm.selectedArts.length > 0) {
      return {
        arts: certidaoForm.selectedArts,
        acervoComAtestado: certidaoForm.temAtestado }
    } else if (certidaoForm.selectedEmpresas.length > 0) {
      return {
        empresas: certidaoForm.selectedEmpresas,
        acervoComAtestado: certidaoForm.temAtestado }
    } else {
      return { acervoComAtestado: certidaoForm.temAtestado }
    }
  }
  preencheTipoAssuntoCertidao (tipo) {
    if (tipo === '1') {
      return 'CERTIDAO_DE_REGISTRO'
    } else if (tipo === '2') {
      return 'CERTIDAO_DE_ATRIBUICOES_PROFISSIONAIS'
    } else if (tipo === '4') {
      return 'CERTIDAO_DE_CURRICULO'
    } else {
      return 'CERTIDAO_DE_ACERVO_TECNICO'
    }
  }
}
