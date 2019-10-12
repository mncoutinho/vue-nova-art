<template>
  <div>
      <q-card >
        <q-card-title>
            <label id="label-view">CONTRATANTE <q-icon name="fas fa-asterisk" color="red-9" size="6px" /></label>
            <div slot="right" class="row items-center">
              <q-btn
                v-if="exibirBotao"
                slot="right"
                flat dense rounded
                color="red-9"
                size="10px"
                label="Excluir"
                @click="excluirContratante" />
            </div>
        </q-card-title>
        <q-card-main>
          <label id="internal-label">CPF OU CNPJ: </label><span id="span-view">{{this.$store.getters['art/getCpfOuCnpjContratante']}}</span>
          <label id="internal-label" v-if="this.$store.getters['art/getRegistroContratante']"> - REGISTRO: </label><span id="span-view">{{this.$store.getters['art/getRegistroContratante']}}</span>
          <p><label id="internal-label">NOME: </label><span id="span-view">{{this.$store.getters['art/getNomeContratante']}}</span></p>
        </q-card-main>
      </q-card>
  </div>
</template>

<script>
export default {
  methods: {
    excluirContratante () {
      let contratante = {checked: true, codigo: 0, cpfOuCnpj: null, nome: null, numero: this.$store.getters['art/getId']}
      this.$axios
        .put('art/contratos/contratante', contratante)
        .then(response => {
          this.$store.commit('art/excluiContratante')
          this.$emit('excluiContratante')
        })
    }
  },
  computed: {
    exibirBotao () {
      if (this.$store.getters['art/getIdTipo'] === 1 && this.$store.getters['art/getNumeroArtPrincipal'] !== '') {
        return false
      }
      return true
    }
  }
}
</script>
