<template>
  <NavBar />
  <RouterView />
  <UserFooter />
  <button
    type="button"
    class="btn btn-secondary top rounded-circle"
    v-show="scY > 500"
    @click="goTop"
  >
    <i class="bi bi-caret-up-fill"></i>
  </button>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/UserNavbar.vue'
import UserFooter from '@/components/FooterComponent.vue'

export default {
  components: {
    NavBar,
    RouterView,
    UserFooter
  },
  setup() {
    const scTimer = ref(0)
    const scY = ref(0)

    function handleScroll() {
      if (scTimer.value) return
      scTimer.value = setTimeout(() => {
        scY.value = window.scrollY
        clearTimeout(scTimer.value)
        scTimer.value = 0
      }, 100)
    }
    function goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    return {
      scY,
      goTop
    }
  }
}
</script>
