import Vue from 'vue'
import App from '@/App.vue'
import EventBus from '@/plugins/event-bus'
import VueRouter from 'vue-router'

import msToMm from '@/filters/ms-to-mm'
import blur from '@/directives/blur'
import routes from '@/routes'

import store from '@/store'

Vue.use(EventBus)
Vue.use(VueRouter)
Vue.use(msToMm)
Vue.use(blur)

// hacer que el router tenga history del navegador
const router = new VueRouter({ routes,
  mode: 'history' })

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
})
