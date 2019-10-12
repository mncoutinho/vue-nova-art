<template>
  <div>
    <q-card>
        <q-card-title class="relative-position">
            <label id="label-view">PROPRIETÁRIO</label>
            <div slot="right" class="row items-center">
              <q-btn label="Excluir"
                     flat dense rounded color="red-9" size="10px"
                     @click="excluiProprietario" />
            </div>
        </q-card-title>
        <q-card-main>
          <label id="internal-label">CPF OU CNPJ: </label><span id="span-view">{{this.$store.getters['art/getCpfOuCnpjProprietario']}}</span>
          <p><label id="internal-label">NOME: </label><span id="span-view">{{this.$store.getters['art/getNomeProprietario']}}</span></p>
        </q-card-main>
    </q-card>
  </div>
</template>

<script>

export default {
  methods: {
    excluiProprietario () {
      let proprietario = {checked: true, codigo: 0, cpfOuCnpj: null, nome: null, numero: this.$store.getters['art/getId']}
      this.$axios
        .put('art/contratos/proprietario', proprietario)
        .then(response => {
          this.$store.commit('art/excluiProprietario')
          this.$emit('excluiProprietario')
        })
    }
  }
}
</script>
