<template>
  <div id="wrapper" class="wrapper" :class="checkIsHomePage ? '' : 'not-home-page'">
    <AppHeader />
    <div class="magrin-top-mobile"></div>
    <slot />
    <AppFooter />
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
const $router = useRouter()

import { useUserStore } from "~/stores/user";

const checkIsHomePage = computed(() => $router.currentRoute.value.path.slice(1) === '')
</script>

<style lang="scss">
.wrapper.not-home-page {
  background-color: #f0f1f4;
}
@media (max-width: 560px) {
  .magrin-top-mobile {
    margin-top: 25px;
  }
}</style>