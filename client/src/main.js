import Vue from "vue";
import App from "./App.vue";
import vuetify from './plugins/vuetify';
import router from './router';
import Scrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueSessionStorage from "vue-sessionstorage"

Vue.config.productionTip = false;
Vue.use(VueSessionStorage)
Vue.use(Scrollbar, {
  name:'scrollbar'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");



