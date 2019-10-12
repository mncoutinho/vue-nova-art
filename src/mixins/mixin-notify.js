export const notify = {
  methods: {
    mostrarMensagem (mensagem, tipo, time) {
      this.$q.notify({ message: mensagem, type: tipo, position: 'center', timeout: time })
    }
  }
}
