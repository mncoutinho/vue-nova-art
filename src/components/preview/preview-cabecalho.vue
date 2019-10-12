<template>
  <div>

    <div>
       <div class="row gutter-sm">
          <div class="col-2">
            <img src="~assets/brazil.jpg" width="50px" />
          </div>
          <div class="col-7">
            <div class="row gutter-xs">
              <div class="col-8">
                <span class="row">Anotação de Responsabilidade Técnica - ART</span>
                <span class="row q-mt-xs">Lei nº 6.496, de 7 de dezembro de 1977</span>
              </div>
              <div class="col-4">
                <span style="font-size: 18px;">CREA-RJ</span>
              </div>
            </div>
            <span class="row q-mt-xs">Conselho Regional de Engenharia e Agronomia do Rio de Janeiro</span>
          </div>
          <div class="col-3">
            <span v-if="art.natureza.id === 1">ART de Obra ou Serviço</span>
            <span v-if="art.natureza.id === 2">ART de Cargo ou Função</span>
            <span v-if="art.natureza.id === 5">ART Múltipla</span>
            <br/>
          </div>
        </div>
    </div>

    <div class="q-mt-sm">
      <fieldset>
        <legend>1. Responsável técnico</legend>
        <div class="row gutter-sm">
          <div class="col-8">
            <p><span v-if="art.profissional">{{art.profissional.nome}}</span></p>
            <p><label class="preview">Título profissional:</label><br/>
              <span v-if="art.profissional">{{art.profissional.titulo}}</span>
            </p>
          </div>
          <div class="col-4">
            <p><label class="preview">RNP: </label> <span v-if="art.profissional">{{art.profissional.numeroRNP}}</span></p>
            <p><label class="preview">Registro: </label> <span v-if="art.profissional">{{art.profissional.id}}</span></p>
          </div>
        </div>
      </fieldset>
    </div>

  </div>
</template>

<script>
export default {
  props: ['art']
}
</script>
