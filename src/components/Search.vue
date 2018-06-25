<template lang="pug">
  main
    transition(name="move")
      pm-notification(:typeNotification="success", v-show="showNotification")
        p(v-if="!success" slot="body").has-text-centered No se encontraron resultados
        p(v-else slot="body").has-text-centered {{ searchMessage }}

    section.section
      nav.nav
        .container
          input.input.is-large(
            type="type",
            placeholder="Buscar Canciones"
            v-model="searchQuery",
            @keyup.enter="search" 
          )
          // ejemplo de modifier con la tecla enter
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      transition(name="move")
        pm-loader(v-show="isLoading")
      .container.results(v-show="!isLoading")
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pm-track(
            v-blur="t.preview_url"
            :class="{'is-active': t.id === selectedTrack }"
            :track="t",
            @select="setSelectedTrack")  

</template>

<script>
import trackService from '@/services/track'

import PmTrack from '@/components/Track.vue'

import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'app',
  components: {
    PmTrack,
    PmLoader,
    PmNotification
  },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      showNotification: false,
      selectedTrack: '',
      success: false
    }
  },
  // objeto computed: dejar funciones pesadas que necesiten cache, aquí.
  computed: {
    // Cuantos tracks se encontraron
    searchMessage () {
      return `Se encontraron: ${this.tracks.length}`
    }
  },
  // objeto methods: dejar funciones necesaria para interactuar con otros componentes, ó de caracter útil.
  methods: {
    search () {
      if (!this.searchQuery) { return }
      this.isLoading = true
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
          this.isLoading = false
          this.showNotification = true
          this.success = res.tracks.total !== 0
        })
    },
    // metodo que asigna el id del componente track hijo al componente padre.
    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  },
  // objecto watch: es necesario que el nombre de la funcion tenga el mismo que el atributo que se desea observar.
  watch: {
    // si la notificacion es true, se procese a cerrarla en 3000
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">

  .results {
    margin-top: 50px
  }

  .is-active {
    border: 3px #23d160 solid
  }
</style>
