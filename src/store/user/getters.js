export const getUser = (state) => {
  return state.user
}

export const authStatus = (state) => {
  return state.status
}

export const getUserRegistro = (state) => {
  if (state.user) {
    return state.user.registro
  }
}

export const getUserNome = (state) => {
  return state.user.nome || state.user.razaoSocial
}

export const ehProfissional = (state) => {
  if (state.user) {
    return state.user.tipoPessoa === 'PROFISSIONAL'
  }
}

export const ehEmpresa = (state) => {
  if (state.user) {
    return state.user.tipoPessoa === 'EMPRESA'
  }
}

export const getTipoPessoa = (state) => {
  return state.user.tipoPessoa
}

export const getUserRegistroEmpresa = (state) => {
  if (state.user) {
    if (state.user.tipoPessoa === 'EMPRESA') {
      return state.user.registro
    }
  }
}

export const getUserRegistroProfissional = (state) => {
  if (state.user) {
    if (state.user.tipoPessoa === 'PROFISSIONAL') {
      return state.user.registro
    }
  }
}

export const getUserCpfOuCnpj = (state) => {
  if (state.user) {
    return state.user.cpfOuCnpj
  }
}

export const getUserSituacao = (state) => {
  if (state.user) {
    return state.user.situacao.descricao
  }
}
