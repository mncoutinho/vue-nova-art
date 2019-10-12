<template>
  <div>
      <q-card >
        <q-card-title class="bg-grey-3" text-color="white">
            <label id="label-view">ENTIDADES FILIADAS</label>
        </q-card-title>
        <q-card-main class="q-mt-sm">

          <q-card class="q-ma-md" color="grey-2" text-color="grey-9" >
              <q-card-title>
                Entidade para representatividade junto ao plenário do CREA-RJ.
              </q-card-title>
            </q-card>
          <q-table
            ref="table"
            color="primary"
            row-key="titulo"
            :data="listaEntidadesFiliadas"
            :columns="entidade"
            class="no-border-grid"
            no-data-label="NENHUMA ENTIDADE PARA EXIBIR"
            no-results-label="NENHUMA ENTIDADE PARA EXIBIR"
            :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
            rows-per-page-label="Entidades por página:"
          >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td v-if="podeHabilitar" key="habilitarEntidade" :props="props">
              <q-btn flat rounded size="sm" color="green" @click="habilitarEntidade(props.row)" label="Habilitar"/>
            </q-td>
            <q-td key="opcaoVoto" :props="props">
              <q-chip dense v-if="props.row.opcaoVoto" color="green">&nbsp;&nbsp;&nbsp;</q-chip>
              <q-chip dense v-if="!props.row.opcaoVoto" color="red">&nbsp;&nbsp;&nbsp;</q-chip>
            </q-td>
           <q-td key="entidade" :props="props">
            <small class="text-italic" v-if="props.row.entidadeClasse.empresa" >{{props.row.entidadeClasse.empresa.nomeFantasia}}</small>
            </q-td>
            <q-td key="dataOpcao" :props="props">
            <small class="text-italic">{{props.row.dataOpcao}}</small>
            </q-td>
            <q-td key="dataFiliacao" :props="props">
            <small class="text-italic">{{props.row.dataFiliacao}}</small>
            </q-td>
          </q-tr>
          </q-table>
        </q-card-main>
      </q-card>
  </div>
</template>
<script>
import { notify } from '../../../mixins/mixin-notify'
export default {
  mixins: [notify],
  props: ['dadosProfissionais'],
  created () {
    this.getListaEntidadesFiliadas()
  },
  data () {
    return {
      podeHabilitar: false,
      listaEntidadesFiliadas: [],
      entidade: [
        { name: 'habilitarEntidade', align: 'center', label: 'HABILITAR OPÇÃO DE VOTO', field: 'habilitarEntidade' },
        { name: 'opcaoVoto', align: 'center', label: 'OPÇÃO DE VOTO', field: 'opcaoVoto' },
        { name: 'entidade', align: 'center', label: 'ENTIDADE', field: 'entidade' },
        { name: 'dataOpcao', align: 'center', label: 'DATA DE OPÇÃO', field: 'dataOpcao', sortable: true },
        { name: 'dataFiliacao', align: 'center', label: 'DATA DE FILIAÇÃO', field: 'dataFiliacao', sortable: true }
      ]
    }
  },
  methods: {
    getListaEntidadesFiliadas () {
      this.$axios
        .get('cadastro/profissional/valida-entidade-filiada/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          this.podeHabilitar = response.data.data.podeHabilitarEntidadesClasse
          this.listaEntidadesFiliadas = response.data.data.listaEntidade
        })
    },
    habilitarEntidade (titulo) {
      delete titulo.__index
      this.$axios
        .post('cadastro/profissional/habilitar-opcao-voto', titulo)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.mostrarMensagem('Foi habilitado com sucesso', 'positive')
          } else {
            this.mostrarMensagem(response.data.messages[0], 'negative')
          }
        })
    }
  }
}
</script>
