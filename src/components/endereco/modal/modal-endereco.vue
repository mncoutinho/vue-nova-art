<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '70vw', minHeight: tabSelecionada === 'nacional' ? '95vh' : '95vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="primary">
          <q-toolbar-title align="center">
            {{endereco.id ? 'Editar' : 'Adicionar'}} Endereço
          </q-toolbar-title>
          <q-btn icon="clear"
                 flat round dense
                 color="white"
                 v-close-overlay />
        </q-toolbar>
        <div style="padding: 20px">
          <q-tabs v-if="endereco.id === null && opened && (tipo === 'CONTRATANTE' || tipo === 'PROPRIETARIO' || tipo === 'CONTRATO')" v-model="tabSelecionada" inverted no-pane-border align="justify">
            <q-tab default slot="title" name="nacional" icon="place" size="9px" label="Nacional" color="green-9" />
            <q-tab slot="title" name="exterior" icon="fas fa-globe-americas" label="Exterior" color="green-9" />

            <q-tab-pane name="nacional">
              <endereco-edicao :tipo="tipo"
                               :ehArt="ehArt"
                               @atualizaEndereco="atualizaEndereco"
                               @getListEndereco="getListEndereco" />
            </q-tab-pane>
            <q-tab-pane name="exterior">
              <endereco-edicao-exterior :tipo="tipo"
                                        :ehArt="ehArt"
                                        @atualizaEndereco="atualizaEndereco" />
            </q-tab-pane>
          </q-tabs>
          <endereco-edicao v-if="endereco.id === null && opened && (tipo !== 'CONTRATANTE' && tipo !== 'PROPRIETARIO' && tipo !== 'CONTRATO')"
                           :tipo="tipo"
                           :ehArt="ehArt"
                           @atualizaEndereco="atualizaEndereco"
                           @getListEndereco="getListEndereco" />
          <endereco-edicao v-show="endereco.id && endereco.cep !== '00000000'"
                           ref="enderecoEdicao"
                           :tipo="tipo"
                           :ehArt="ehArt"
                           @atualizaEndereco="atualizaEndereco"
                           @getListEndereco="getListEndereco" />
          <endereco-edicao-exterior v-show="endereco.id && endereco.cep === '00000000'"
                                    ref="enderecoEdicaoExterior"
                                    :tipo="tipo"
                                    :ehArt="ehArt"
                                    :enderecoView="endereco"
                                    @atualizaEndereco="atualizaEndereco" />
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import Endereco from '../../models/Endereco.js'
import EnderecoEdicao from '../edicao/endereco-edicao'
import EnderecoEdicaoExterior from '../edicao/endereco-edicao-exterior'
export default {
  props: {
    tipo: String,
    ehArt: Boolean
  },
  components: { EnderecoEdicao, EnderecoEdicaoExterior },
  created () {
    this.endereco = new Endereco()
  },
  data () {
    return {
      opened: false,
      endereco: new Endereco(),
      tabSelecionada: null
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    atualizaEndereco (value) {
      this.$emit('atualizaEndereco', value)
      this.toggle()
    },
    getListEndereco (value) {
      this.$emit('getListEndereco', value)
      this.toggle()
    },
    verificaEndereco (enderecoView) {
      this.toggle()
      if (!enderecoView) {
        this.endereco = new Endereco()
        this.$refs.enderecoEdicao.verificaSeHaEndereco(enderecoView)
        this.$refs.enderecoEdicaoExterior.verifica(this.endereco)
      } else {
        this.endereco = enderecoView
        if (this.endereco.tipoLogradouro.id === 2024) {
          this.$refs.enderecoEdicaoExterior.verifica(enderecoView)
        } else {
          this.$refs.enderecoEdicao.verificaSeHaEndereco(enderecoView)
        }
      }
    },
    excluiEndereco (endereco) {
      if (endereco.postal === 'SIM') {
        this.$q.notify({ message: 'Para excluir esse endereço é necessário adicionar outro como postal.', type: 'negative', position: 'center', timeout: 1300 })
      } else {
        this.$axios
          .put('endereco/exclui-endereco/' + endereco.idString)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              this.$q.notify({ message: 'Excluído com sucesso', type: 'positive', position: 'center', timeout: 1000 })
              this.$emit('getListEndereco')
            }
          })
      }
    }
  }
}
</script>
