import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueClipboard from "vue-clipboard2";
import router from "./routes";
import ApiAgent from "@/plugins/agents";
import store from "@/vuex";
import "./assets/tailwind.css";

Vue.use(VueRouter);
Vue.use(VueClipboard)

Vue.mixin({
  beforeCreate() {
    this.$http = new ApiAgent("/api");
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
