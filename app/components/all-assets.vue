<script setup lang="ts">

// Define props
const props = defineProps({
  showall: {
    type: Boolean,
    required: false,
    default: false,
  },
});

</script>

<template>
  <section class="p-3 bg-dark round-15 mb-3 small">
      <h5 class="text-light mb-4">Top Markets</h5>

      <router-link to="/market/bitcoin" class="btn w-100 asset-item p-2 d-flex gap-2" v-for="i in 5" :key="i">
        <img :src="`/img/assets/${i}.jpg`" width="45" alt="BTC" class="my-auto" />
        <div class="my-auto">
          <p class="m-0">$112,000.00</p>
          <small class="text-danger">-0.03%</small>
        </div>
        <div class="ms-auto my-auto text-end text-muted">
          <p class="m-0">0.00000000 BTC</p>
          <small>$0.00</small>
        </div>
      </router-link>

      <p class="m-0 text-center pt-3" v-if="!showall">
        <router-link to="/market/" class="btn btn-sm btn-success bg-teal px-3">See more</router-link>
      </p>
    </section>
</template>

<style scoped>
/* Asets */
.asset-item {
  color: #aaa;
}
.asset-item:hover {
  background-color: var(--thm-dark-mid);
  color: #ccc;
}
</style>