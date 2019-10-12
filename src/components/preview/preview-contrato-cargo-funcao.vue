<template>
  <div>

    <div class="q-mt-sm">
      <fieldset>
        <legend>2. Contratante</legend>
        <div class="row gutter-sm">
          <div class="col-5">
            <label class="preview">Contratante: </label> <span v-if="contrato">{{contrato.nomeContratante}}</span><br/>
            <br/>
            <label class="preview">Complemento: </label> <span v-if="contrato && contrato.enderecoContratante">{{contrato.enderecoContratante.complemento}}</span><br/>
            <label class="preview">Cidade: </label> <span v-if="contrato && contrato.enderecoContratante && contrato.enderecoContratante.localidade">{{contrato.enderecoContratante.localidade.descricao}}</span><br/>
            <label class="preview">Contrato: </label> <span v-if="contrato && contrato.enderecoContratante">{{contrato.numero}}</span><br/>
            <label class="preview">Tipo Contratante: </label> <span v-if="contrato && contrato.tipoContratante">{{contrato.tipoContratante.descricao}}</span><br/>
          </div>
          <div class="col-3">
            <br/>
            <br/>
            <br/>
            <label class="preview">Bairro: </label> <span v-if="contrato && contrato.enderecoContratante">{{contrato.enderecoContratante.bairro}}</span><br/>
            <label class="preview">UF: </label> <span v-if="contrato && contrato.enderecoContratante && contrato.enderecoContratante.uf">{{contrato.enderecoContratante.uf.sigla}}</span><br/>
            <label class="preview">Valor do Contrato: </label> <span v-if="contrato">{{contrato.valorContratoFormatado}}</span><br/>
          </div>
          <div class="col-3">
            <label class="preview">CPF/CNPJ: </label> <span v-if="contrato">{{contrato.cpfOuCnpjContratante}}</span><br/>
            <br/>
            <label class="preview">Nº: </label> <span v-if="contrato && contrato.enderecoContratante">{{contrato.enderecoContratante.numero}}</span><br/>
            <br/>
            <label class="preview">CEP: </label> <span v-if="contrato && contrato.enderecoContratante">{{contrato.enderecoContratante.cep}}</span><br/>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="q-mt-sm">
      <fieldset>
        <legend>3. Vínculo contratual</legend>
        <div class="row gutter-sm">
          <div class="col-5">
            <label class="preview">Unidade administrativa: </label>  <span v-if="contrato && contrato.tipoUnidadeAdministrativa">{{contrato.tipoUnidadeAdministrativa.descricao}}</span><br/>
            <span v-if="contrato && contrato.enderecoContrato">{{contrato.enderecoContrato.logradouro}}</span><br/>
            <label class="preview">Complemento: </label> <span v-if="contrato && contrato.enderecoContrato">{{contrato.enderecoContrato.complemento}}</span><br/>
            <label class="preview">Cidade: </label> <span v-if="contrato && contrato.enderecoContrato && contrato.enderecoContrato.localidade">{{contrato.enderecoContrato.localidade.descricao}}</span><br/>
            <label class="preview">Data Início: </label> <span v-if="contrato">{{contrato.dataInicioFormatada}}</span><br/>
            <label class="preview">Tipo de Vínculo: </label> <span v-if="contrato && contrato.tipoVinculo">{{contrato.tipoVinculo.descricao}}</span><br/>
          </div>
          <div class="col-3">
            <br/>
            <br/>
            <label class="preview">Bairro: </label> <span v-if="contrato && contrato.enderecoContrato">{{contrato.enderecoContrato.bairro}}</span><br/>
            <label class="preview">UF: </label> <span v-if="contrato && contrato.enderecoContrato && contrato.enderecoContrato.uf">{{contrato.enderecoContrato.uf.sigla}}</span><br/>
            <label class="preview">Previsão de término: </label> <span v-if="contrato">{{contrato.dataFimFormatada}}</span><br/>
            <label class="preview">Identificação do Cargo ou Função: </label> <span v-if="contrato && contrato.tipoCargoFuncao">{{contrato.tipoCargoFuncao.descricao}}</span><br/>
          </div>
          <div class="col-2">
            <br/>
            <label class="preview">Nº: </label> <span v-if="contrato && contrato.enderecoContrato">{{contrato.enderecoContrato.numero}}</span><br/>
            <br/>
            <label class="preview">CEP: </label> <span v-if="contrato && contrato.enderecoContrato">{{contrato.enderecoContrato.cep}}</span><br/>
            <label class="preview">Salário: </label> <span v-if="contrato && contrato.salario">R$ {{contrato.salario}}</span><br/>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="q-mt-sm">
      <fieldset>
        <legend>4. Atividade técnica</legend>
        <div class="row gutter-sm">
          <div class="col-8"></div>
          <div class="col-4">
            <div class="row gutter-sm">
              <div class="col-6">
                <label class="preview">Quantidade</label><br/>
                <span v-if="contrato">{{contrato.jornadaDeTrabalho}}</span>
              </div>
              <div class="col-6">
                <label class="preview">Unidade</label><br/>
                <span v-if="contrato.jornadaDeTrabalho">Hrs/Dia</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row gutter-sm q-mt-xs">
          <div class="col-4">
            <label class="preview">ATIVIDADES:</label><br/>
            <span v-if="contrato && contrato.listAtividades">
              <span v-for="atividade in contrato.listAtividades" :key="atividade.id">
                {{atividade.id}} - {{atividade.descricao}}<br/>
              </span>
            </span>
          </div>
          <div class="col-4">
            <label class="preview">COMPLEMENTOS:</label><br/>
            <span v-if="contrato && contrato.listComplementos">
              <span v-for="complemento in contrato.listComplementos" :key="complemento.id">
                {{complemento.id}} - {{complemento.descricao}}<br/>
              </span>
            </span>
          </div>
        </div>
        <div class="row gutter-sm q-mt-sm">
          <div class="col-12 text-center">
            <label class="preview">A mudança de cargo ou função exige o registro de nova ART</label>
          </div>
        </div>
        <div class="row gutter-sm">
          <div class="col-12 text-center">
            <label class="preview">Após a conclusão das atividades técnicas o profissional deverá proceder a baixa desta ART</label>
          </div>
        </div>
      </fieldset>
    </div>

  </div>
</template>

<script>
export default {
  props: ['contrato']
}
</script>

<style>
fieldset {
  border-width: 1px;
}
label.preview {
  color:black;
  font-weight: normal;
}
</style>
