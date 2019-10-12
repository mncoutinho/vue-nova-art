<template>
  <div>
    <q-field
        icon="fas fa-asterisk"
        icon-color="red-9"
        style="margin-top:20px;" >
      <div class="row">
          <div class="col-10">
            <q-select
              float-label="EMPRESA CONTRATADA"
              v-if="true"
              color="grey-1"
              filter
              filter-placeholder="Filtro"
              @input="edita"
              v-model="id"
              :options="listEmpresa" />
          </div>
          <div style="margin-top: 25px" class="col-2">
            <info-help v-model="showing" tipo="empresaContratadoSelect" />
          </div>
        </div>
    </q-field>
  </div>
</template>
<script>
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    this.idEmpresaContratado = this.$store.getters['art/getIdEmpresaContratado']
    if (this.idEmpresaContratado !== null) {
      this.id = this.idEmpresaContratado
    }
    this.tipoPessoa = this.$store.getters['user/getTipoPessoa']
    this.idPessoa = this.$store.getters['user/getUserRegistro']
    this.getEmpresasDoQuadroTecnico()
  },
  data () {
    return {
      listEmpresa: [],
      showing: false,
      id: '',
      idEmpresaContratado: null,
      idPessoa: null,
      tipoPessoa: null
    }
  },
  methods: {
    getEmpresasDoQuadroTecnico () {
      let listTemp = []
      listTemp.unshift({value: 0, label: 'AUTÔNOMO'})
      this.$axios
        .post('cadastro/profissional/quadro-tecnico', { idPessoa: this.idPessoa, tipoPessoa: this.tipoPessoa })
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            response.data.data.forEach(function (el) {
              listTemp.push({value: el.empresa.id, label: el.empresa.nome})
            })
          }
          this.listEmpresa = listTemp
          if (response.data.type === 'INFORMATION') {
            this.id = 0
          }
        })
    },
    edita (value) {
      this.$axios
        .put('art/empresa-contratado', {id: value, numero: this.$store.getters['art/getNumero']})
        .then(response => {
          this.$store.commit('art/setEmpresaContratado', {id: value})
        })
    },
    getEmpresaByValue () {
      let idEmpresa = this.id
      let empresa = this.listEmpresa.filter(function (el) { return el.value === idEmpresa })
      if (empresa[0] !== undefined && empresa[0] !== null) {
        return empresa[0].label
      }
    }
  }
}
</script>
