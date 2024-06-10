import { defineNuxtPlugin } from "#app";
import { createVfm } from 'vue-final-modal'
import "vue-toastification/dist/index.css";
import "vue-loading-overlay/dist/css/index.css";
import * as vt from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  const vfm = createVfm()
  nuxtApp.vueApp.use(vfm)
  nuxtApp.vueApp.use(vt.default);
});
