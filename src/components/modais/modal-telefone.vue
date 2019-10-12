<template>
<div>
  <botao v-if="!modoEdicao"
         :label="'Novo Telefone'"
         :icon="'fas fa-phone'"
         @emit="toggle()" />
  <q-btn-dropdown v-if="modoEdicao" label="Ações"
         size="10px"
          flat rounded>
          <q-list link>
            <q-item v-close-overlay @click.native="toggle()">
              <q-item-side color="dark" icon="edit" />
              <q-item-main >
                Editar
              </q-item-main>
            </q-item>
            <q-item v-close-overlay @click.native="excluirTelefone()">
              <q-item-side color="dark" icon="far fa-trash-alt" />
              <q-item-main >
                Excluir
              </q-item-main>
            </q-item>
          </q-list>
      </q-btn-dropdown>
  <q-modal v-model="opened" :content-css="{minWidth: '23vw', minHeight: '36vh'}">
     <q-modal-layout>
       <q-toolbar slot="header" text-color="white" color="primary">
        <q-toolbar-title align="center">
          {{ modoEdicao ? 'Editar' : 'Adicionar' }} Telefone
        </q-toolbar-title>
        <q-btn
          flat round dense
          color="white"
          icon="clear"
          v-close-overlay />
      </q-toolbar>
      <div style="padding: 20px">
        <q-field class="icone" icon="place">
          <q-select
          @blur="$v.form.tipoTelefone.id.$touch"
          @keyup.enter="validaTelefone"
          :error="$v.form.tipoTelefone.id.$error"
          style="margin-top: 15px"
          color="secondary"
          float-label="Tipo"
          v-model="form.tipoTelefone.id"
          :options="listTipoTelefone"
          />
        </q-field>
        <q-field class="icone" icon="speaker_phone">
          <q-input
          v-model="form.ddd"
          float-label="DDD"
          style="margin-top: 15px"
          @blur="$v.form.numero.$touch"
          @keyup.enter="validaTelefone"
          :error="$v.form.numero.$error"
          />
        </q-field>
        <q-field class="icone" icon="smartphone">
          <q-input
          v-model="form.numero"
          float-label="Telefone"
          style="margin-top: 15px"
          @blur="$v.form.numero.$touch"
          @keyup.enter="validaTelefone"
          :error="$v.form.numero.$error"
          />
        </q-field>
      </div>
      <q-card-separator />
      <div class="row justify-end" style="padding: 20px">
        <botao
         :label="'Salvar'"
         :icon="'save'"
         @emit="validaTelefone()" />
      </div>
    </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
import Botao from '../../components/button/botao'
import { notify } from '../../mixins/mixin-notify'
import listTipoTelefone from 'assets/listTipoTelefone'
import { required, helpers } from 'vuelidate/lib/validators'
const dddValido = helpers.regex('dddValido', /^[0-9]{2}$/)
const telefoneValido = helpers.regex('telefoneValido', /^[0-9]{8,9}$/)
export default {
  components: { Botao },
  mixins: [notify],
  props: {
    modoEdicao: Boolean,
    telefone: Object,
    idPessoa: Number,
    index: Number
  },
  data () {
    return {
      opened: false,
      listTipoTelefone,
      form: {
        numero: '',
        ddd: '',
        tipoTelefone: { id: '', descricao: '' }
      }
    }
  },
  validations: {
    form: {
      numero: { required, telefoneValido }, ddd: { required, dddValido }, tipoTelefone: { id: { required } }
    }
  },
  methods: {
    toggle () {
      this.$v.$reset()
      this.opened = !this.opened
      if (this.modoEdicao) {
        this.form = Object.assign({}, this.telefone)
      } else {
        this.form = {numero: '', ddd: '', tipoTelefone: { id: '', descricao: '' }}
      }
    },
    salvarTelefone () {
      if (this.modoEdicao) {
        this.$axios
          .put('cadastro/telefone', { codigo: this.telefone.codigo, codPessoa: this.idPessoa, tipoTelefone: { id: this.form.tipoTelefone.id }, ddd: this.form.ddd, numero: this.form.numero })
          .then(response => {
            this.responseApi('atualiza', response.data.data)
          })
          .catch(() => { this.responseApi('error') })
      } else {
        this.$axios
          .post('cadastro/telefone', { codPessoa: this.idPessoa, tipoTelefone: { id: this.form.tipoTelefone.id }, ddd: this.form.ddd, numero: this.form.numero })
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              this.responseApi('adiciona', response.data.data)
            }
          })
          .catch(() => { this.responseApi('error') })
      }
    },
    excluirTelefone () {
      this.$axios
        .delete('cadastro/telefone/' + this.telefone.codigo)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.responseApi('exclui')
          }
        })
        .catch(() => { this.responseApi('error') })
    },
    responseApi (tipo, telefone) {
      if (tipo === 'error') {
        this.mostrarMensagem('Ocorreu um erro por favor tente novamente.', 'negative')
      } else {
        this.$emit(tipo, telefone, this.index)
        this.mostrarMensagem('Seu telefone foi atualizado com sucesso.', 'positive')
        this.opened = false
      }
    },
    validaTelefone () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.mostrarMensagem('Informe um formato válido.', 'negative')
      } else {
        this.salvarTelefone()
      }
    }
  }
}
</script>
