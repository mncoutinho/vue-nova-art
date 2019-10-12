<template>
  <div>
      <q-card >
        <q-card-title  class="bg-grey-3" text-color="white">
          <label  id="label-view">DADOS EMPRESA</label>
        </q-card-title>
        <q-card-main style="margin-top:10px" class="q-ml-sm">
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">RAZÃO SOCIAL: </label><span id="span-view">{{dadosCadastrais.nome}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">NOME FANTASIA: </label><span id="span-view">{{dadosCadastrais.nomeFantasia}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">CNPJ: </label><span id="span-view">{{dadosCadastrais.cnpj}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">REGISTRO: </label><span id="span-view">{{dadosCadastrais.id}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DATA REGISTRO:</label><span id="span-view">{{dadosCadastrais.dataRegistro}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">TIPO REGISTRO: </label><span id="span-view">{{dadosCadastrais.tipoCategoriaRegistro}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">TIPO EMPRESA: </label><span id="span-view">{{dadosCadastrais.tipoEmpresa}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DATA EXPEDIÇÃO: </label><span id="span-view">{{dadosCadastrais.dataExpRegistroFormatada}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DATA VALIDADE: </label><span id="span-view">{{dadosCadastrais.dataValidade}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">TIPO GRUPO: </label><span id="span-view">{{dadosCadastrais.tipoGrupo}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">OBSERVAÇÕES: </label><span id="span-view">{{dadosCadastrais.observacoes}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">SITUAÇÃO: </label><span id="span-view"></span>
            </div>
          </div>
          <div class="row gutter-xs ">
            <div class="col-md-9">
              <input-email :idPessoa="dadosCadastrais.id" />
            </div>
          </div>
        </q-card-main>
      </q-card>
      <br>
      <q-card>
        <q-card-title class="bg-grey-3" text-color="white">
          <label id="label-view">OBJETO SOCIAL  </label>
        </q-card-title>
        <q-card-main>
          <div class="col-md-4">
            <span id="span-view">{{dadosCadastrais.objetoSocial}}</span>
          </div>
        </q-card-main>
      </q-card>
  </div>
</template>
<script>
import InputEmail from '../../input/input-email'
export default {
  components: {
    InputEmail
  },
  props: ['dadosCadastrais']
}
</script>
