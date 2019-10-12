export const getArt = (state) => {
  return state.art
}

export const getNatureza = (state) => {
  return state.art.natureza
}

export const getIdNatureza = (state) => {
  if (state.art.natureza) {
    return state.art.natureza.id
  } else {
    return undefined
  }
}

export const getProfissionalContratado = (state) => {
  return state.art.profissional
}

export const getIdProfissional = (state) => {
  if (state.art.profissional) {
    return state.art.profissional.id
  } else {
    return undefined
  }
}

export const getEmpresaContratado = (state) => {
  return state.art.empresa
}

export const getEntidadeClasse = (state) => {
  return state.art.entidadeClasse
}

export const getTipo = (state) => {
  return state.art.tipo
}

export const getParticipacaoTecnica = (state) => {
  return state.art.participacaoTecnica
}

export const getIdTipo = (state) => {
  if (state.art.tipo) {
    return state.art.tipo.id
  }
}

export const getIdParticipacaoTecnica = (state) => {
  if (state.art.participacaoTecnica) {
    return state.art.participacaoTecnica.id
  }
}

export const getNumeroArtPrincipal = (state) => {
  if (state.art.numeroArtPrincipal) {
    return state.art.numeroArtPrincipal
  } else {
    return ''
  }
}

export const getNumeroArtParticipacaoTecnica = (state) => {
  if (state.art.numeroArtParticipacaoTecnica) {
    return state.art.numeroArtParticipacaoTecnica
  } else {
    return ''
  }
}

export const getFatoGerador = (state) => {
  return state.art.fatoGerador
}

export const getNumero = (state) => {
  return state.art.numero
}

export const ehArtEmEdicao = (state) => {
  if (state.art.numero) {
    return true
  } else {
    return false
  }
}

export const ehDesempenhoDeCargoEFuncao = (state) => {
  if (state.art.natureza) {
    if (state.art.natureza.id === 2) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const ehReceituarioAgronomico = (state) => {
  if (state.art.natureza) {
    if (state.art.natureza.id === 3) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const ehObraEServico = (state) => {
  if (state.art.natureza) {
    return state.art.natureza.id === 1
  }
  return false
}

export const ehMultipla = (state) => {
  if (state.art.natureza) {
    if (state.art.natureza.id === 5) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const getListTiposArt = (state) => {
  return state.listTipoArt
}

export const getListFatoGerador = (state) => {
  return state.listFatoGerador
}

export const getListUFs = (state) => {
  return state.listUFs
}

export const getDataCadastroFormatada = (state) => {
  let dataCadastroFormatada = new Date(state.art.dataCadastro)
  return dataCadastroFormatada.toLocaleDateString()
}

export const getValorArt = (state) => {
  if (state.art.valorReceber !== null) {
    return state.art.valorReceber
  } else {
    return '0,00'
  }
}

export const getId = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.id
  } else {
    return undefined
  }
}

export const getNumeroContrato = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.numero
  }
}

export const getSalario = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.salario
  }
}

export const getProLabore = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.prolabore
  }
}

export const getValorContrato = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.valorContrato
  }
}

export const getNhhjt = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.jornadaDeTrabalho
  }
}

export const getDataInicio = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataInicio
  }
}

export const getDataInicioFormatada = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataInicioFormatada
  }
}

export const getDataInicioFormatadaYYYYMMDD = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataInicioFormatadaYYYYMMDD
  }
}

export const getDataFim = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataFim
  }
}

export const getDataFimFormatada = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataFimFormatada
  }
}

export const getDataFimFormatadaYYYYMMDD = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataFimFormatadaYYYYMMDD
  }
}

export const getPrazoDeterminado = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.prazoDeterminado
  }
}

export const getPrazoMes = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.prazoMes
  }
}

export const getPrazoDia = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.prazoDia
  }
}

export const getRamo = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.ramoART
  }
}

export const getIdRamo = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.ramoART) {
      return state.art.contratoArt.ramoART.id
    } else {
      return ''
    }
  }
}

export const atividade = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.listAtividades
  }
}

export const especificacao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.listEspecificacoes
  }
}

export const complemento = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.listComplementos
  }
}

export const getQuantificacao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.quantificacao
  }
}

export const getUnidadeMedida = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.unidadeMedida
  }
}

export const getNumeroPavimentos = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.numeroDePavimentos
  }
}

export const getConvenioPublico = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.convenioPublico
  }
}

export const getDescricaoComplementar = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.descricaoComplementares
  }
}

export const getAcessibilidade = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.acessibilidade
  }
}

export const getArbitragem = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.arbitragem
  }
}

export const getTipoUnidadeAdministrativa = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoUnidadeAdministrativa
  }
}

export const unidadeAdministrativaEhSede = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.tipoUnidadeAdministrativa) {
      return state.art.contratoArt.tipoUnidadeAdministrativa.id === 1
    }
  }
}

export const getTipoAcaoInstitucional = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoAcaoInstitucional
  }
}

export const getTipoContratante = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoContratante
  }
}

export const getTipoVinculo = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoVinculo
  }
}

export const getTipoCargoFuncao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoCargoFuncao
  }
}

export const getTipoCargoFuncaoEhOutro = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.tipoCargoFuncao) {
      return state.art.contratoArt.tipoCargoFuncao.id === 1
    }
  }
}

export const getTipoFuncao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoFuncao
  }
}

export const getTipoFuncaoEhOutro = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.tipoFuncao) {
      return state.art.contratoArt.tipoFuncao.id === 1
    }
  }
}

export const getDescricaoCargoFuncao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.descricaoCargoFuncao
  }
}

export const temTipoCargoFuncao = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.tipoCargoFuncao) {
      return state.art.contratoArt.tipoCargoFuncao.id !== 0
    } else {
      return false
    }
  }
}

export const temTipoFuncao = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.tipoFuncao) {
      return state.art.contratoArt.tipoFuncao.id !== 0
    } else {
      return false
    }
  }
}

export const getFinalidade = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.finalidade
  }
}

export const getDataCelebracao = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataCelebracao
  }
}

export const getDataCelebracaoFormatada = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.dataCelebracaoFormatada
  }
}

export const getCodigoObraServico = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.codigoObraServico
  }
}

export const getIdPessoaContratante = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.idPessoaContratante
  }
}

export const getNomeContratante = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.nomeContratante
  }
}

export const getCpfOuCnpjContratante = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.cpfOuCnpjContratante) {
      return state.art.contratoArt.cpfOuCnpjContratante.replace(/\./g, '').replace(/-/g, '')
    }
  }
}

export const getTipoPessoaContratante = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.tipoPessoaContratante
  }
}

export const getRegistroContratante = (state) => {
  return state.art.contratoArt.registroContratante
}

export const getIdPessoaProprietario = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.idPessoaProprietario
  }
}

export const getNomeProprietario = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.nomeProprietario
  }
}

export const getCpfOuCnpjProprietario = (state) => {
  if (state.art.contratoArt) {
    if (state.art.contratoArt.cpfOuCnpjProprietario) {
      return state.art.contratoArt.cpfOuCnpjProprietario.replace(/\./g, '').replace(/-/g, '')
    }
  }
}

export const getEnderecoContrato = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.enderecoContrato
  }
}

export const getEnderecoContratante = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.enderecoContratante
  }
}

export const getEnderecoProprietario = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.enderecoProprietario
  }
}

export const getPathFinaliza = (state) => {
  if (state.art.natureza) {
    if (state.art.natureza.id === 1) {
      return 'obra-servico'
    } else if (state.art.natureza.id === 2) {
      return 'desempenho-cargo-funcao'
    } else if (state.art.natureza.id === 3) {
      return 'receituario-agronomico'
    } else if (state.art.natureza.id === 5) {
      return 'multipla'
    }
  }
}

export const getIdEmpresaContratado = (state) => {
  if (state.art.empresa) {
    return state.art.empresa.id
  }
}

export const exibePrazoMesDia = (state) => {
  if (state.art.natureza) {
    if (state.art.natureza.id === 2) {
      if (state.art.contratoArt) {
        return state.art.contratoArt.prazoDeterminado
      }
    }
  }
  return true
}

export const getPossuiContratoCadastrado = (state) => {
  return state.art.possuiContratoCadastrado
}

export const getDescricaoFatoGerador = (state) => {
  return state.art.descricaoFatoGerador
}

export const getSequencialContrato = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.sequencial
  }
}

export const ehModelo = (state) => {
  if (state.art.modelo) {
    return state.art.modelo
  } else {
    return false
  }
}

export const getDescricaoModelo = (state) => {
  return state.art.descricaoModelo
}

export const possuiDescricaoModelo = (state) => {
  if (state.art.descricaoModelo) {
    return state.art.descricaoModelo !== ''
  }
  return false
}

export const getNumeroArtVinculadaContrato = (state) => {
  if (state.art.contratoArt) {
    return state.art.contratoArt.numeroArtVinculadaAoContrato
  }
}

export const getPrimeiraParticipacaoTecnica = (state) => {
  return state.art.primeiraParticipacaoTecnica
}
