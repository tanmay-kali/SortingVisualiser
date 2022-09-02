import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/index.css";

Vue.config.productionTip = false;
router.replace('/bubble-sort')
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
