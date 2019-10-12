<template>
  <div class="row gutter-x-xs q-mt-xs">
    <div>
      <label id="internal-label">E-MAIL:</label>
      <span v-if="!editando" id="span-view">{{form.email}}</span>
    </div>
    <div v-if="!editando">
      <q-btn @click.native="toggle()" label="Editar" icon="edit" color="green-9" dense rounded flat size="9px"/>
    </div>
    <info-help v-if="!editando" v-model="showing" tipo="email" style="margin-top: -3px;" />
    <div v-if="editando">
      <q-input style="margin-top: -3px;"
               id="input-view"
               type="email"
               color="green-1"
               inverted-light
               v-model.trim="form.email"
               @blur="$v.form.email.$touch"
               :error="$v.form.email.$error" />
    </div>
    <div v-if="editando">
      <q-btn @click="validaEmail" label="Salvar" icon="save" color="green-9" dense rounded flat size="sm" />
    </div>
    <div v-if="editando">
      <q-btn @click="toggle()" icon="clear" round flat dense color="negative" size="xs"/>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import InfoHelp from '../info/info-help'
export default {
  props: ['idPessoa'],
  components: {
    InfoHelp
  },
  created () {
    this.getEmail()
  },
  data () {
    return {
      showing: false,
      editando: false,
      form: {
        email: null
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    toggle () {
      this.getEmail()
      this.editando = !this.editando
    },
    getEmail (idPessoa) {
      this.$axios
        .get('commons/email/pessoa/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          let dto = response.data.data[0]
          if (dto !== undefined) {
            this.form.email = dto.descricao
          }
        })
    },
    validaEmail () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify({message: 'Informe um e-mail válido.', type: 'negative', position: 'center'})
      } else {
        this.atualizarEmail()
      }
    },
    atualizarEmail () {
      this.$axios
        .put('commons/email', { descricao: this.form.email, idPessoa: this.idPessoa })
        .then(response => {
          if (response.data.type === 'INFORMATION') {
            this.$q.notify({message: response.data.messages[0], type: 'negative', position: 'center'})
          } else {
            this.toggle()
          }
        })
    }
  }
}
</script>
