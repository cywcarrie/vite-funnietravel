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
export default {
  data() {
    return {
      isLoading: false
    }
  }
}
</script>
