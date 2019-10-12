<template>
  <div>
    <q-modal v-if="opened" v-model="opened" :content-css="{minWidth: '90vw', minHeight: '60vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          CONTRATO: {{contrato.id}}
        </q-toolbar-title>
        <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>
        <div style="padding: 20px">
            <!-- Dados Iniciais -->
          <q-card >
            <q-card-main>
              <div class="row justify-between">
                <div class="col-md-4">
                  <label>NÚMERO: </label><span>{{contrato.id}}</span>
                </div>
                <div class="col-md-4">
                  <label>VALOR CONTRATO: </label><span>{{contrato.valorContrato}}</span>
                </div>
                <div class="col-md-4">
                  <label>DATA CELEBRAÇÃO: </label><span>{{contrato.dataCelebracaoFormatada}}</span>
                </div>
              </div>
              <div class="row justify-between">
                <div class="col-md-4">
                  <label>DATA INÍCIO: </label><span>{{contrato.dataInicioFormatada}}</span>
                </div>
                <div class="col-md-4">
                  <label>PRAZO EM MESES: </label><span>{{contrato.prazoMes}}</span>
                </div>
                <div class="col-md-4">
                  <label>PRAZO EM DIAS: </label><span>{{contrato.prazoDia}}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <br>
        <!-- Dados Técnicos -->
          <q-card class="bigger q-ma" color="white" text-color="dark" >
            <q-card-main>
              <div class="row justify-between">
                <div class="col-md-4">
                  <label>RAMOS: </label><span v-if="contrato.ramoART">{{contrato.ramoART.descricao}}</span>
                </div>
                <div class="col-md-4">
                  <label>CÓDIGO DA OBRA/SERVIÇO: </label><span>{{contrato.codigoObraServico}}</span>
                </div>
                <div class="col-md-4">
                  <label>HH / JT: </label><span>{{contrato.jornadaDeTrabalho}}</span>
                </div>
              </div>
              <div class="row justify-between">
                <div class="col-md-4">
                  <label>QUANTIFICAÇÃO: </label><span v-if="contrato.quantificacao">{{contrato.quantificacao.valor}}&nbsp;{{contrato.quantificacao.sigla}}</span>
                </div>
                <div class="col-md-4">
                  <label>FINALIDADE: </label><span v-if="contrato.finalidade">{{contrato.finalidade.descricao}}</span>
                </div>
                <div class="col-md-4">
                  <label>Nº PAVIMENTOS: </label><span>{{contrato.numeroDePavimentos}}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <br>
          <div class="row gutter-x-sm">
            <div class="col-4">
              <q-card>
                <q-card-title class="bg-grey-3" text-color="white">
                  <label>ATIVIDADES</label>
                </q-card-title>
                <q-card-main>
                  <div class="row gutter-x-sm gutter-y-sm">
                    <div class="col-12">
                      <p v-for="item in contrato.listAtividades" link :key="item.descricao" class="q-mt-md">
                        <!-- {{item}} -->
                        <label :title="item.descricao">{{item.descricao.substring(0, 18)}}{{item.descricao.length > 18 ? '...' : ''}}</label>
                        <br/>
                      </p>
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
            <div class="col-4">
              <q-card>
                <q-card-title class="bg-grey-3" text-color="white">
                  <label>ESPECIFICAÇÕES</label>
                </q-card-title>
                <q-card-main>
                  <div class="row gutter-x-sm gutter-y-sm">
                    <div class="col-12">
                      <p v-for="item in contrato.listEspecificacoes" link :key="item.descricao" class="q-mt-md">
                        <label :title="item.descricao">{{item.descricao.substring(0, 18)}}{{item.descricao.length > 18 ? '...' : ''}}</label>
                        <br/>
                      </p>
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
            <div class="col-4">
              <q-card>
                <q-card-title class="bg-grey-3" text-color="white">
                  <label>COMPLEMENTOS</label>
                </q-card-title>
                <q-card-main>
                  <div class="row gutter-x-sm gutter-y-sm">
                    <div class="col-12">
                      <p v-for="item in contrato.listComplementos" link :key="item.descricao" class="q-mt-md">
                        <label :title="item.descricao">{{item.descricao.substring(0, 18)}}{{item.descricao.length > 18 ? '...' : ''}}</label>
                        <br/>
                      </p>
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
        <!-- Contratante -->
          <br>
          <q-card >
            <q-card-title class="bg-grey-3" text-color="white">
              <label>CONTRATANTE</label>
            </q-card-title>
            <q-card-main>
              <br>
              <div class="col justify-between">
                <div class="col-md-6">
                  <label>NOME: </label><span>{{contrato.nomeContratante}}</span>
                </div>
                <div class="col-md-6">
                  <label>CPF / CNPJ: </label><span>{{contrato.cpfOuCnpjContratante}}</span>
                </div>
              </div>
              <br>
              <endereco-preview :enderecoView="contrato.enderecoContratante" v-if="contrato.enderecoContratante !== null"/>
            </q-card-main>
          </q-card>
        <!-- Proprietario -->
          <br>
          <q-card>
            <q-card-title class="bg-grey-3" text-color="white">
              <label>PROPRIETÁRIO</label>
            </q-card-title>
            <q-card-main>
              <br>
              <div class="col justify-between">
                <div class="col-md-6">
                  <label>NOME: </label><span>{{contrato.nomeProprietario}}</span>
                </div>
                <div class="col-md-6">
                  <label>CPF / CNPJ: </label><span>{{contrato.cpfOuCnpjProprietario}}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>
        <!-- Endereco -->
          <br>
          <q-card>
            <q-card-title class="bg-grey-3" text-color="white">
              <label>ENDEREÇO DA OBRA/SERVIÇO</label>
            </q-card-title>
            <q-card-main>
              <br>
              <endereco-preview :enderecoView="contrato.enderecoContrato" v-if="contrato.enderecoContrato !== null"/>
            </q-card-main>
          </q-card>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import EnderecoPreview from '../endereco/endereco-view'
export default {
  components: {
    EnderecoPreview
  },
  data () {
    return {
      contrato: {},
      opened: false
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    async getContratoDetalhado (idContrato) {
      await this.$axios
        .get('art/contratos/detalhado/' + idContrato)
        .then(response => {
          this.contrato = response.data.data
        })
      this.toggle()
    }
  }
}
</script>
