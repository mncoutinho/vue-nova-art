<template>
  <div>

    <div class="col-12 q-mt-sm" style="max-width: 800px;">
      <fieldset>
        <legend>5. Observações</legend>
          <span v-if="art.contratoArt" style="word-break: break-all">{{art.contratoArt.descricaoComplementares}}</span>
        <br/><br/><br/>
      </fieldset>
    </div>

    <div class="q-mt-sm">
      <fieldset>
        <legend>6. Declarações</legend>
        <span style="font-size: 7px;">
          <span v-if="art.contratoArt.arbitragem">{{'Cláusula compromissória: qualquer conflito ou litígio originado do presente contrato, bem como sua interpretação ou execução,'}}<br/>
          {{'será resolvido por arbitragem, de acordo com a Lei nº 9.307, de 23 de setembro de 1996, por meio do Centro de Mediação e Arbitragem'}}<br/>
          {{' - CMA vinculado ao CREA-RJ, nos termos do respectivo regulamento por arbitragem que, expressamente, as partes declaram concordar.'}}<br/><br/></span>
          <span v-if="art.contratoArt.acessibilidade">{{'Acessibilidade: Declara a aplicabilidade das regras de acessibilidade previstas nas normas técnicas da ABNT, na legislação específica e'}}<br/>
          {{'no Decreto nº 5.296, de 2 de dezembro de 2004, às atividades profissionais acima relacionadas.'}}</span>
        </span>
      </fieldset>
    </div>

    <div class="q-mt-sm">
      <div class="row gutter-sm">
        <div class="col-5">
          <fieldset>
            <legend>7. Entidade de Classe</legend>
            <span style="font-size: 7px;">
              <span v-if="art.entidadeClasse">{{art.entidadeClasse.nome}}</span>
            </span>
          </fieldset>
          <fieldset class="q-mt-xs">
            <legend>8. Assinaturas</legend>
            <span style="font-size: 7px;">
              {{'Declaro serem verdadeiras as informações acima'}}<br/>
              {{'_____________________, ______ de _________________ de _________'}}<br/>
              {{'_____________________________________________________________'}}<br/>
              <span v-if="art.profissional"><small>{{art.profissional.nome}} - {{art.profissional.cpf}}</small></span><br/>
              {{'_____________________________________________________________'}}<br/>
              <span v-if="art.contratoArt"><small>{{art.contratoArt.nomeContratante}} <span v-if="art.contratoArt.cpfOuCnpjContratante">-</span> {{art.contratoArt.cpfOuCnpjContratante}}</small></span>
            </span>
          </fieldset>
        </div>
        <div class="col-7">
          <fieldset>
            <legend>9. Informações</legend>
            <span style="font-size: 8px;">
              <ul style="list-style-type: square;">
                <li>
                  {{'A ART é válida somente quando quitada, mediante a apresentação do'}}<br/>
                  {{'comprovante do pagamento ou conferência no site do CREA-RJ:'}}<br/>
                  {{'www.crea-rj.org.br/servicos/autenticidade'}}<br/>
                </li>
                <li>
                  {{'A autenticidade deste documento pode ser verificada no site'}}<br/>
                  {{'www.crea-rj.org.br/servicos/autenticidade'}}<br/>
                </li><br/>
                <li>
                  {{'A guarda da via assinada da ART será de responsabilidade do profissional'}}<br/>
                  {{'e do contratante com o objetivo de documentar o vínculo contratual'}}<br/>
                </li>
              </ul>
              <div class="row gutter-xs" style="font-weight: normal; font-size: 8px">
                <div>
                  www.crea-rj.org.br<br/>
                  Tel: (21) 2179-2007
                </div>
                <div>
                  atendimento@crea-rj.org.br<br/>
                  Rua Buenos Aires, 40 - Rio de Janeiro - RJ
                </div>
                <div>
                  <img src="~assets/crea_logo.png" width="58px" />
                </div>
              </div>
            </span>
          </fieldset>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['art']
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
