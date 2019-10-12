<template>
  <div class="row gutter-x-xs q-mt-xs">
    <div>
      <label id="internal-label">PIS/PASEP:</label>
      <span v-if="!editando" id="span-view">{{form.pisPasep}}</span>
    </div>
    <div v-if="!editando">
      <q-btn @click.native="toggle()" label="Editar" icon="edit" color="green-9" dense rounded flat size="9px" />
    </div>
    <info-help v-if="!editando" v-model="showing" tipo="pisPasep" style="margin-top: -3px;" />
    <div v-if="editando">
      <q-input style="margin-top: -3px;"
               placeholder="Preencha o PIS/PASEP"
               id="input-view"
               color="green-1"
               maxlength="11"
               inverted-light
               v-mask="'###.#####.##-#'"
               v-model.trim="form.pisPasep"
               @blur="$v.form.pisPasep.$touch"
               @keyup.enter="validaPisPasep"
               :error="$v.form.pisPasep.$error" />
    </div>
    <div v-if="editando">
      <q-btn @click="validaPisPasep" label="Salvar" icon="save" color="green-9" dense rounded flat size="sm" />
    </div>
    <div v-if="editando">
      <q-btn @click="deleta()" icon="clear" round flat dense color="negative" size="xs" />
    </div>
  </div>
</template>
<script>
import {mask} from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'
import InfoHelp from '../info/info-help'
export default {
  components: {
    InfoHelp
  },
  created () {
    this.getPisPasep()
  },
  data () {
    return {
      showing: false,
      editando: false,
      form: {
        pisPasep: null
      }
    }
  },
  directives: {mask},
  validations: {
    form: {
      pisPasep: {
        required
      }
    }
  },
  methods: {
    toggle () {
      this.$v.form.$reset()
      this.getPisPasep()
      this.editando = !this.editando
    },
    getPisPasep (idPessoa) {
      if (this.$store.getters['user/getUserRegistro'] !== undefined) {
        this.$axios
          .get('cadastro/pessoa-fisica/pis-pasep/' + this.$store.getters['user/getUserRegistro'])
          .then(response => {
            this.form.pisPasep = response.data.data.descricao
          })
      }
    },
    validaPisPasep () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify({message: 'Informe um PIS/PASEP válido.', type: 'negative', position: 'center'})
      } else {
        this.atualizarPisPasep()
      }
    },
    atualizarPisPasep () {
      this.$axios
        .put('cadastro/pessoa-fisica/pis-pasep/', { descricao: this.form.pisPasep, id: this.$store.getters['user/getUserRegistro'] })
        .then(response => {
          if (response.data.type === 'INFORMATION') {
            this.$q.notify({message: response.data.messages[0], type: 'negative', position: 'center'})
          } else {
            this.form.pisPasep = response.data.data.descricao
            this.toggle()
          }
        })
    },
    deleta () {
      this.form.pisPasep = null
      this.atualizarPisPasep()
    }
  }
}
</script>
