<template>
  <LoadingVue
    :active="isLoading"
    :loader="'dots'"
    :color="'#336b87'"
    :width="70"
    :height="70"
    :opacity="0.6"
  ></LoadingVue>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isLoading = ref(false)

    return {
      isLoading
    }
  }
}
</script>
