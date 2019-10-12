<template>
  <div>
      <q-card >
        <q-card-title class="bg-grey-3" text-color="white">
            <label id="label-view">TÍTULOS</label>
        </q-card-title>
        <q-card-main class="q-mt-sm">
              <q-card class="q-ma-md" color="grey-2" text-color="grey-9" >
              <q-card-title>
                Título para representatividade da composição do plenário do CREA-RJ
              </q-card-title>
            </q-card>
          <q-table
            ref="table"
            color="primary"
            row-key="titulo"
            :data="dadosProfissionais.titulos"
            :columns="titulos"
            class="no-border-grid"
            :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
            rows-per-page-label="Títulos por página:"
          >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="habilitarTitulo" :props="props">
              <q-btn flat :disabled="props.row.opcaoVoto" rounded size="sm" color="green" @click="habilitarTitulo(props.row)" label="Habilitar"/>
            </q-td>
            <q-td key="opcaoVoto" :props="props">
              <q-chip dense v-if="props.row.opcaoVoto" color="green">&nbsp;&nbsp;&nbsp;</q-chip>
              <q-chip dense v-if="!props.row.opcaoVoto" color="red">&nbsp;&nbsp;&nbsp;</q-chip>
            </q-td>
            <q-td key="tituloCrea" :props="props">
            <small class="text-italic">{{ props.row.tituloCrea }}</small>
            </q-td>
            <q-td key="escolaDeObtencaoTitulo" :props="props">
            <small class="text-italic">{{ props.row.escolaDeObtencaoTitulo }}</small>
            </q-td>
            <q-td key="dataFormatura" :props="props">
            <small class="text-italic">{{ props.row.dataFormatura }}</small>
            </q-td>
            <q-td key="dataColacaoGrau" :props="props">
            <small class="text-italic">{{ props.row.dataColacaoGrau }}</small>
            </q-td>
            <q-td key="escolaridade" :props="props">
            <small class="text-italic">{{ props.row.escolaridade }}</small>
            </q-td>
            <q-td key="estadoEscolaObtencaoTitulo" :props="props">
            <small class="text-italic">{{ props.row.estadoEscolaObtencaoTitulo }}</small>
            </q-td>
            <q-td key="tipoTitulo" :props="props">
            <small class="text-italic">{{ props.row.tipoTitulo }}</small>
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
  data () {
    return {
      titulos: [
        { name: 'habilitarTitulo', align: 'center', label: 'HABILITAR TÍTULO', field: 'habilitarTitulo' },
        { name: 'opcaoVoto', align: 'center', label: 'OPÇÃO DE VOTO', field: 'opcaoVoto' },
        { name: 'tituloCrea', align: 'center', label: 'TÍTULO', field: 'tituloCrea', sortable: true },
        { name: 'escolaDeObtencaoTitulo', align: 'center', label: 'INSTITUIÇÃO', field: 'escolaDeObtencaoTitulo', sortable: true },
        { name: 'dataFormatura', align: 'center', label: 'DATA FORMATURA', field: 'dataFormatura', sortable: true },
        { name: 'dataColacaoGrau', align: 'center', label: 'DATA COLAÇÃO', field: 'dataColacaoGrau' },
        { name: 'escolaridade', align: 'center', label: 'NÍVEL', field: 'escolaridade', sortable: true },
        { name: 'estadoEscolaObtencaoTitulo', align: 'left', label: 'UF FORMAÇÃO', field: 'estadoEscolaObtencaoTitulo', sortable: true },
        { name: 'tipoTitulo', align: 'center', label: 'TIPO TÍTULO', field: 'tipoTitulo', sortable: true }
      ]
    }
  },
  methods: {
    habilitarTitulo (titulo) {
      delete titulo.__index
      this.$axios
        .post('cadastro/profissional/habilitar-titulo', titulo)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.mostrarMensagem('Seu título foi habilitado com sucesso', 'positive')
          } else {
            this.mostrarMensagem(response.data.messages[0], 'negative')
          }
        })
    }
  }
}
</script>
