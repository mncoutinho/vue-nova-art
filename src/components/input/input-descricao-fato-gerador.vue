<template>
  <div>
    <span>
      <q-popover style="border-radius: 2px; opacity: 0.9" anchor="top middle" self="bottom left" v-model="showing">
        <q-card>
          <q-card-main>
            <label>DESCRIÇÃO FATO GERADOR:</label>
          </q-card-main>
        </q-card>
      </q-popover>
    </span>
    <q-field
          icon="fas fa-asterisk"
          icon-color="red-9"
          >
      <q-input v-model.trim="descricaoFatoGerador" @input="edita" float-label="Preencha o Número:" maxlength="40" />
    </q-field>
  </div>
</template>
<script>
import _ from 'lodash'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  created () {
    this.descricaoFatoGerador = this.$store.getters['art/getDescricaoFatoGerador']
    if (this.descricaoFatoGerador) {
      this.$emit('atualizaDescricaoFatoGerador', this.descricaoFatoGerador.descricao)
    }
  },
  data () {
    return {
      showing: false,
      descricaoFatoGerador: null
    }
  },
  methods: {
    edita: _.debounce(function (value) {
      this.$axios
        .put('art/descricao-fato-gerador', { descricao: value, numero: this.$store.getters['art/getNumero'] })
        .then(response => {
          this.$store.commit('art/setDescricaoFatoGerador', response.data.data)
          this.$emit('input', value)
        })
        .catch(() => {
          this.mostrarMensagem('Erro ao atualizar descrição do fato gerador, o tamanho do texto não deve ultrapassar 40 caracteres, favor tentar novamente', 'negative', 2000)
        })
    }, 1000)
  }
}
</script>
