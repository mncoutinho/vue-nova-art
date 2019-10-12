export const setArt = (state, value) => {
  state.art = value
}

export const deleteArt = (state, value) => {
  state.art = {}
}

export const setNatureza = (state, value) => {
  state.art.natureza = value
}

export const setTipo = (state, value) => {
  state.art.tipo = value
}

export const setParticipacaoTecnica = (state, value) => {
  state.art.participacaoTecnica = value
}

export const setNumeroArtPrincipal = (state, value) => {
  state.art.numeroArtPrincipal = value
}

export const setNumeroArtParticipacaoTecnica = (state, value) => {
  state.art.numeroArtParticipacaoTecnica = value
}

export const setFatoGerador = (state, value) => {
  state.art.fatoGerador = value
}

export const setDescricaoFatoGerador = (state, value) => {
  state.art.descricaoFatoGerador = value
}

export const setEntidadeClasse = (state, value) => {
  state.art.entidadeClasse = value
}

export const setEmpresaContratado = (state, value) => {
  state.art.empresa = value
}

export const setProfissionalContratado = (state, value) => {
  state.art.profissional = value
}

export const setContrato = (state, value) => {
  state.art.contratoArt = value
}

export const setNumeroContrato = (state, value) => {
  state.art.contratoArt.numero = value
}

export const setSalario = (state, value) => {
  state.art.contratoArt.salario = value
}

export const setProLabore = (state, value) => {
  state.art.contratoArt.prolabore = value
}

export const setValorContrato = (state, value) => {
  state.art.contratoArt.valorContrato = value
}

export const setNhhjt = (state, value) => {
  state.art.contratoArt.jornadaDeTrabalho = value
}

export const setDataInicio = (state, value) => {
  state.art.contratoArt.dataInicio = value
}

export const setDataInicioFormatada = (state, value) => {
  state.art.contratoArt.dataInicioFormatada = value
}

export const setDataInicioFormatadaYYYYMMDD = (state, value) => {
  state.art.contratoArt.dataInicioFormatadaYYYYMMDD = value
}

export const setDataFim = (state, value) => {
  state.art.contratoArt.dataFim = value
}

export const setDataFimFormatada = (state, value) => {
  state.art.contratoArt.dataFimFormatada = value
}

export const setDataFimFormatadaYYYYMMDD = (state, value) => {
  state.art.contratoArt.dataFimFormatadaYYYYMMDD = value
}

export const setPrazoDeterminado = (state, value) => {
  state.art.contratoArt.prazoDeterminado = value
}

export const setPrazoMes = (state, value) => {
  state.art.contratoArt.prazoMes = value
}

export const setPrazoDia = (state, value) => {
  state.art.contratoArt.prazoDia = value
}

export const setRamo = (state, value) => {
  state.art.contratoArt.ramoART = value
}

export const setIdRamo = (state, value) => {
  state.art.contratoArt.ramoART.id = value
}

export const atividade = (state, value) => {
  state.art.contratoArt.listAtividades = value
}

export const especificacao = (state, value) => {
  state.art.contratoArt.listEspecificacoes = value
}

export const complemento = (state, value) => {
  state.art.contratoArt.listComplementos = value
}

export const setQuantificacao = (state, value) => {
  if (state.art.contratoArt.quantificacao) {
    state.art.contratoArt.quantificacao.valor = value
  } else {
    state.art.contratoArt.quantificacao = {valor: value}
  }
}

export const setUnidadeMedida = (state, value) => {
  if (state.art.contratoArt.quantificacao) {
    state.art.contratoArt.quantificacao.codigo = value
  } else {
    state.art.contratoArt.quantificacao = {codigo: value}
  }
}

export const setNumeroPavimentos = (state, value) => {
  state.art.contratoArt.numeroDePavimentos = value
}

export const setConvenioPublico = (state, value) => {
  state.art.contratoArt.convenioPublico = value
}

export const setDescricaoComplementar = (state, value) => {
  state.art.contratoArt.descricaoComplementares = value
}

export const setAcessibilidade = (state, value) => {
  state.art.contratoArt.acessibilidade = value
}

export const setArbitragem = (state, value) => {
  state.art.contratoArt.arbitragem = value
}

export const setTipoTaxa = (state, value) => {
  state.art.tipoTaxa = value
}

export const setTipoUnidadeAdministrativa = (state, value) => {
  state.art.contratoArt.tipoUnidadeAdministrativa = value
}

export const setTipoAcaoInstitucional = (state, value) => {
  state.art.contratoArt.tipoAcaoInstitucional = value
}

export const setTipoContratante = (state, value) => {
  state.art.contratoArt.tipoContratante = value
}

export const setTipoVinculo = (state, value) => {
  state.art.contratoArt.tipoVinculo = value
}

export const setTipoCargoFuncao = (state, value) => {
  state.art.contratoArt.tipoCargoFuncao = value
}

export const setTipoFuncao = (state, value) => {
  state.art.contratoArt.tipoFuncao = value
}

export const setDescricaoCargoFuncao = (state, value) => {
  state.art.contratoArt.descricaoCargoFuncao = value
}

export const setFinalidade = (state, value) => {
  state.art.contratoArt.finalidade = value
}

export const setDataCelebracao = (state, value) => {
  state.art.contratoArt.dataCelebracao = value
}

export const setDataCelebracaoFormatada = (state, value) => {
  state.art.contratoArt.dataCelebracaoFormatada = value
}

export const setCodigoObraServico = (state, value) => {
  state.art.contratoArt.codigoObraServico = value
}

export const setContratante = (state, value) => {
  state.art.contratoArt.idPessoaContratante = value.codigo
  state.art.contratoArt.nomeContratante = value.nome
  state.art.contratoArt.cpfOuCnpjContratante = value.cpfOuCnpj
  state.art.contratoArt.registroContratante = value.registro
}

export const setTipoPessoaContratante = (state, value) => {
  state.art.contratoArt.tipoPessoaContratante = value
}

export const excluiContratante = (state) => {
  state.art.contratoArt.idPessoaContratante = null
  state.art.contratoArt.nomeContratante = null
  state.art.contratoArt.cpfOuCnpjContratante = null
  state.art.contratoArt.tipoContratante = null
  state.art.contratoArt.registroContratante = null
}

export const setProprietario = (state, value) => {
  state.art.contratoArt.idPessoaProprietario = value.codigo
  state.art.contratoArt.nomeProprietario = value.nome
  state.art.contratoArt.cpfOuCnpjProprietario = value.cpfOuCnpj
}

export const excluiProprietario = (state) => {
  state.art.contratoArt.idPessoaProprietario = null
  state.art.contratoArt.nomeProprietario = null
  state.art.contratoArt.cpfOuCnpjProprietario = null
}

export const setEnderecoContrato = (state, value) => {
  state.art.contratoArt.enderecoContrato = value
}

export const setEnderecoContratante = (state, value) => {
  state.art.contratoArt.enderecoContratante = value
}

export const setEnderecoProprietario = (state, value) => {
  state.art.contratoArt.enderecoProprietario = value
}

export const excluiContrato = (state) => {
  state.art.contratoArt = null
}

export const setPossuiContratoCadastrado = (state, value) => {
  state.art.possuiContratoCadastrado = value
}

export const setValorArt = (state, value) => {
  state.art.valorReceber = value
}

export const setModelo = (state, value) => {
  state.art.modelo = value
}

export const setDescricaoModelo = (state, value) => {
  state.art.descricaoModelo = value
}

export const setNumeroArtVinculadaContrato = (state, value) => {
  state.art.contratoArt.numeroArtVinculadaAoContrato = value
}

export const setPrimeiraParticipacaoTecnica = (state, value) => {
  state.art.primeiraParticipacaoTecnica = value
}
