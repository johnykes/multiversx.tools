import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// global css
import "@/style/GlobalStyle.vue";
import "@/style/GlobalButtonStyle.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import Vue3Lottie from "vue3-lottie";
// import "vue3-lottie/dist/style.css";

createApp(App)
  .use(store)
  .use(router)
  //.use(Vue3Lottie)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
