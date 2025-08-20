<script>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  setup() {
    onMounted(() => {
      AOS.init()
    })
  }
}
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
