<template>
  <a href="#" title="我的最愛" @click.prevent="toggleFavorite()" class="ps-3 ps-md-0">
    <i
      class="bi bi-heart text-primary fs-3"
      v-if="favoriteData.indexOf(productFavoriteId) === -1"
    ></i>
    <i class="bi bi-heart-fill text-primary fs-3" v-else></i>
  </a>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'

export default {
  props: ['productFavoriteId'],
  methods: {
    ...mapActions(favoriteStore, ['getFavorite', 'addFavorite']),
    toggleFavorite() {
      this.addFavorite(this.productFavoriteId)
    }
  },
  computed: {
    ...mapState(favoriteStore, ['favoriteData'])
  }
}
</script>
