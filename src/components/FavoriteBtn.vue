<template>
  <a href="#" title="我的最愛" @click.prevent="toggleFavorite()" class="ps-3 ps-md-0">
    <i class="bi bi-heart text-primary fs-3" v-if="!isFavorite"></i>
    <i class="bi bi-heart-fill text-primary fs-3" v-else></i>
  </a>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

export default {
  props: {
    productFavoriteId: {
      type: [String, Number]
    }
  },
  setup(props) {
    const favoriteStore = useFavoriteStore()
    const isFavorite = computed(() => favoriteStore.favoriteData.includes(props.productFavoriteId))

    function toggleFavorite() {
      favoriteStore.addFavorite(props.productFavoriteId)
    }
    onMounted(() => {
      favoriteStore.getFavorite()
    })

    return {
      isFavorite,
      toggleFavorite
    }
  }
}
</script>
