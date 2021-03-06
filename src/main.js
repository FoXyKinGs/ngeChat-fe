import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_KEY
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
