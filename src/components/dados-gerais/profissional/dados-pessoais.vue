<template>
  <div>
      <q-card>
        <q-card-title  class="bg-grey-3" text-color="white">
          <label  id="label-view">DADOS PESSOAIS  </label>
        </q-card-title>
        <q-card-main style="margin-top:10px" class="q-ml-sm" >
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">NOME: </label><span id="span-view">{{dadosCadastrais.pessoa.nome}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">CPF: </label><span id="span-view"> {{dadosCadastrais.pessoa.cpf}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DATA NASCIMENTO: </label><span id="span-view">{{dadosCadastrais.dataNascimento}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">NOME DA MÃE: </label><span id="span-view">{{dadosCadastrais.nomeMae}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">NOME DO PAI: </label><span id="span-view">{{dadosCadastrais.nomePai}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">NACIONALIDADE: </label><span id="span-view">{{dadosCadastrais.nacionalidade}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">NATURALIDADE: </label><span id="span-view">{{dadosCadastrais.naturalidade}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">SEXO: </label><span id="span-view">{{dadosCadastrais.sexo}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">ESTADO CIVIL: </label><span id="span-view">{{dadosCadastrais.estadoCivil}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">PIS/PASEP: </label><span id="span-view">{{dadosCadastrais.pisPasep}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DOADOR: </label><span id="span-view">{{dadosCadastrais.doador}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">FATOR RH: </label><span id="span-view">{{dadosCadastrais.tipoSanguineo}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">NECESSIDADE ESPECIAL: </label><span id="span-view">{{dadosCadastrais.portadorDeficiencia}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">IDENTIDADE: </label><span id="span-view">{{dadosCadastrais.identidade}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">ORGÃO EMISSOR: </label><span id="span-view">{{dadosCadastrais.emissorIdentidade}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">DATA EMISSÃO: </label><span id="span-view">{{dadosCadastrais.dataEmissaoIdentidade}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">TÍTULO ELEITOR: </label><span id="span-view">{{dadosCadastrais.tituloEleitoral}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">ZONA ELEITORAL: </label><span id="span-view">{{dadosCadastrais.zonaEleitoral}}</span>
            </div>
            <div class="col-md-4">
              <label id="internal-label">SEÇÃO ELEITORAL:</label><span id="span-view">{{dadosCadastrais.secaoEleitoral}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-4">
              <label id="internal-label">UF ELEITORAL: </label><span id="span-view">{{dadosCadastrais.localidadeEleitoral}}</span>
            </div>
          </div>
          <div class="row gutter-xs ">
            <div class="col-md-9">
              <input-email :email="dadosCadastrais.pessoa.email"
                           :idPessoa="dadosCadastrais.pessoa.id" >
              </input-email>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label id="internal-label">ASSINOU O TERMO DE RESPONSABILIDADE E ACEITE EM:</label><span id="span-view">{{dadosCadastrais.pessoa.dataCriacaoLogin}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label id="internal-label">ASSINATURA:</label><span id="span-view">
                <img  :src="assinatura" round style="margin-top:20px; width: 180px; height: auto; border-radius: 6px;" /></span>
            </div>
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
  props: ['dadosCadastrais', 'assinatura']
}
</script>
