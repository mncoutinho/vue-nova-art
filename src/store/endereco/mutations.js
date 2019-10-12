export const setEndereco = (state, value) => {
  if (value.tipoEndereco === 'CONTRATANTE') {
    state.contrato.enderecoContratante = value
  } else if (value.tipoEndereco === 'CONTRATO') {
    state.contrato.enderecoContrato = value
  } else if (value.tipoEndereco === 'PROPRIETARIO') {
    state.contrato.enderecoProprietario = value
  }
}
