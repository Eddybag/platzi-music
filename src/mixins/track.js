// mixins son la solucion
const trackMixin = {
  methods: {
    // se emite el evento al componente padre
    selectTrack () {
      if (!this.track.preview_url) { return }
      // atraves del atributo select se envía el id del track
      this.$store.commit('setTrack', this.track)
    }
  }
}

export default trackMixin
