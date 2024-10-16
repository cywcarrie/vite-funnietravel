<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  mounted() {
    AOS.init()
  }
}
</script>
<template>
  <RouterView />
</template>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
