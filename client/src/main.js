import Vue from "vue";
import App from "./App.vue";
import router from "./Router";
import vuetify from './plugins/vuetify';

export const bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
