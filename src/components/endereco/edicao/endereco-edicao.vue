<template>
  <div>
    <div style="padding: 20px">
      <div>
        <cep v-model="endereco" :idEndereco="endereco.id" :disabled="ehEdicao && !ehArt" /><br/>
        <!-- <logradouro-osm v-model="endereco" /><br/> -->
        <br/><q-card-separator/><br/><br/>
        <div v-if="endereco.cep">
          <div class="row gutter-sm">
            <div class="col-md-3">
              <uf v-model="endereco" @atualizou="atualizouUf" :disabled="ehEdicao && !ehArt" />
            </div>
            <div class="col-md-9">
              <municipio ref="municipio" v-model="endereco" :disabled="ehEdicao && !ehArt" />
            </div>
          </div>
          <div class="row gutter-sm" style="margin-top: 6px;">
            <div class="col-md-3">
              <tipo-logradouro v-model="endereco.tipoLogradouro" :disabled="ehEdicao && !ehArt" />
            </div>
            <div class="col-md-9">
              <q-field icon="fas fa-asterisk"
                       icon-color="red-8">
                <q-input v-model="endereco.logradouro" :disabled="ehEdicao && !ehArt" float-label="Endereço" placeholder="Primeiro de Março" maxlength="100" />
              </q-field>
            </div>
          </div>
          <div class="row gutter-sm" style="margin-top: 6px;">
            <div class="col-md-3">
              <q-field icon="fas fa-asterisk"
                       icon-color="red-9">
                <q-input v-model="endereco.bairro" :disabled="ehEdicao && !ehArt" float-label="Bairro" placeholder="Centro" maxlength="70" />
              </q-field>
            </div>
            <div class="col-md-3">
              <q-field icon="fas fa-asterisk"
                       icon-color="red-9">
                <q-input v-model="endereco.numero" float-label="Número" placeholder="40" maxlength="15" />
              </q-field>
            </div>
            <div class="col-md-6">
              <q-input v-model="endereco.complemento" float-label="Complemento" placeholder="Exemplo: 9º andar, sala 908" maxlength="30" />
            </div>
          </div>
          <div class="row gutter-sm" v-if="ehArt">
            <div class="col-md-6">
              <input-latitude v-model="endereco.latitude" />
            </div>
            <div class="col-md-6">
              <input-longitude v-model="endereco.longitude" />
            </div>
          </div>
          <div v-if="tipo === 'GRID'" class="row gutter-sm q-mt-xs">
            <div class="col-md-3">
              <q-field icon="fas fa-asterisk"
                       icon-color="red-9">
                <q-select color="primary"
                          float-label="Tipo"
                          v-model="endereco.tipoEndereco.id"
                          :options="listTipoEndereco" />
              </q-field>
            </div>
            <div class="col-md-4 q-ml-lg">
              <span class="caption">Postal <q-icon name="fas fa-asterisk" color="red-9" size="7px" /></span>
              <q-option-group color="secondary"
                              type="radio"
                              inline
                              float-label="Postal"
                              v-model="endereco.postal"
                              :options="[
                                { label: 'SIM', value: 'SIM', color: 'secondary' },
                                { label: 'NÃO', value: 'NAO', color: 'negative' }]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-end q-mt-md" style="padding: 20px">
        <botao
         :label="'Salvar'"
         :icon="'save'"
         :loading="showLoandingBtn"
         @emit="validaForm()" />
    </div>
  </div>
</template>
<script>
import Botao from '../../button/botao'
import Endereco from '../../models/Endereco.js'
import listTipoEnderecos from '../../../assets/listTipoEndereco.js'
import Cep from '../busca/cep'
import LogradouroOsm from '../busca/logradouro-osm'
import TipoLogradouro from '../campos/tipo-logradouro'
import InputLongitude from '../campos/input-longitude'
import InputLatitude from '../campos/input-latitude'
import Municipio from '../campos/municipio'
import Uf from '../campos/uf'
export default {
  props: {
    tipo: String,
    ehArt: Boolean
  },
  components: { Municipio, Uf, TipoLogradouro, Cep, LogradouroOsm, Endereco, InputLongitude, InputLatitude, Botao },
  created () {
    this.endereco = new Endereco()
  },
  data () {
    return {
      listTipoEndereco: listTipoEnderecos,
      ehEdicao: false,
      showLoandingBtn: false,
      endereco: {}
    }
  },
  methods: {
    verificaSeHaEndereco (endereco) {
      if (!endereco) {
        this.endereco = new Endereco()
        this.ehEdicao = false
      } else {
        this.endereco = Object.assign({}, endereco)
        this.ehEdicao = true
      }
    },
    validaForm () {
      this.showLoandingBtn = true
      if (this.endereco.numero !== '' && this.endereco.numero !== null && this.endereco.uf.id !== '' && this.endereco.tipoLogradouro.id !== '' && this.endereco.localidade.id !== '' && this.endereco.bairro !== '' && this.endereco.bairro !== null && this.endereco.logradouro !== '' && this.endereco.cep !== '') {
        if (!this.ehArt) {
          if (this.endereco.postal !== null && this.endereco.tipoEndereco.id !== null) {
            this.ehEdicao ? this.editaEndereco() : this.adicionaEndereco()
          } else {
            this.showLoandingBtn = false
            this.$q.notify({ message: 'Preencher os campos obrigatorios', type: 'negative', position: 'center', timeout: 1000 })
          }
        } else {
          this.ehEdicao ? this.editaEnderecoArt() : this.adicionaEnderecoArt()
        }
      } else {
        this.showLoandingBtn = false
        this.$q.notify({ message: 'Preencher os campos obrigatorios', type: 'negative', position: 'center', timeout: 1000 })
      }
    },
    adicionaEndereco () {
      this.endereco.codPessoa = this.$store.getters['user/getUserRegistro']
      this.$axios
        .post('endereco/pessoa', this.endereco)
        .then(response => {
          this.$emit('getListEndereco')
          this.showLoandingBtn = false
          this.$q.notify({ message: 'Salvo com sucesso', type: 'positive', position: 'center', timeout: 1000 })
        })
    },
    adicionaEnderecoArt () {
      this.defineTipoEnderecoART()
      this.recuperarLongitudeELatitudeDoEndereco(true)
    },
    editaEndereco () {
      this.endereco.codPessoa = this.$store.getters['user/getUserRegistro']
      delete this.endereco.__index
      this.$axios
        .put('endereco', this.endereco)
        .then(response => {
          if (response.data.type === 'INFORMATION') {
            this.$q.notify({ message: response.data.messages[0], type: 'negative', position: 'center', timeout: 1500 })
          } else {
            this.$q.notify({ message: 'Editado com sucesso', type: 'positive', position: 'center', timeout: 1000 })
          }
          this.$emit('getListEndereco')
        })
    },
    editaEnderecoArt () {
      this.defineTipoEnderecoART()
      this.recuperarLongitudeELatitudeDoEndereco(false)
    },
    defineTipoEnderecoART () {
      if (this.tipo === 'CONTRATANTE' || this.tipo === 'PROPRIETARIO') {
        this.endereco.tipoEndereco.id = 7
      } else if (this.tipo === 'CONTRATO') {
        this.endereco.tipoEndereco.id = 8
      }
    },
    recuperarLongitudeELatitudeDoEndereco (inserindo) {
      if (this.endereco.latitude && this.endereco.longitude) {
        if (this.endereco.latitude.length >= 9 && this.endereco.longitude.length >= 9) {
          inserindo ? this.gravarEnderecoNoBackEnd() : this.atualizarEnderecoNoBackEnd()
        } else {
          this.$q.notify({ message: 'A Latitude e Longitude devem estar no padrão sugerido, -43,123456', type: 'negative', position: 'center', timeout: 1000 })
          this.showLoandingBtn = false
        }
      } else {
        let source = this.$axiosApiExterna.CancelToken.source()
        setTimeout(() => {
          source.cancel()
        }, 3000)

        let enderecoFormatado = this.endereco.tipoLogradouro.descricao + ' ' + this.endereco.logradouro + ' ' + this.endereco.numero + ' ' + this.endereco.uf.descricao
        this.$axiosApiExterna
          .get('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=' + enderecoFormatado, {cancelToken: source.token})
          .then(response => {
            this.endereco.latitude = response.data[0].lat.replace(/\./g, ',')
            this.endereco.longitude = response.data[0].lon.replace(/\./g, ',')
            inserindo ? this.gravarEnderecoNoBackEnd() : this.atualizarEnderecoNoBackEnd()
          })
          .catch(() => {
            inserindo ? this.gravarEnderecoNoBackEnd() : this.atualizarEnderecoNoBackEnd()
          })
      }
    },
    gravarEnderecoNoBackEnd () {
      this.$axios
        .post('endereco', this.endereco)
        .then(response => {
          this.$emit('atualizaEndereco', response.data.data)
          this.$q.notify({ message: 'Salvo com sucesso', type: 'positive', position: 'center', timeout: 1000 })
        })
        .finally(() => {
          this.showLoandingBtn = false
        })
    },
    atualizarEnderecoNoBackEnd () {
      this.$axios
        .put('endereco/art', this.endereco)
        .then(response => {
          this.$emit('atualizaEndereco', response.data.data)
          this.$q.notify({ message: 'Editado com sucesso', type: 'positive', position: 'center', timeout: 1000 })
        })
        .finally(() => {
          this.showLoandingBtn = false
        })
    },
    atualizouUf () {
      this.$refs.municipio.buscaMunicipio(this.endereco.uf)
    }
  }
}
</script>
