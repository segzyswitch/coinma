<script setup lang="ts">
useHead({
  title: 'All Markets - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
</script>

<template>
  <section class="p-3 bg-dark round-15 mb-3 pb-4">
    <p class="mb-4">
      <button class="btn p-1 me-0 text-light" @click="router.back" aria-label="Close">
        <i class="bi bi-arrow-left"></i> <span class="ps-2">back</span>
      </button>
    </p>
    <div class="row">
      <div class="col-2 col-sm-1 mx-auto mb-3 rounded-circle overflow-hidden mb-4">
        <img src="/img/assets/2.jpg" class="w-100" alt="BTC" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 text-center mx-auto">
        <h4 class="text-mid mb-">Bitcoin (BTC)</h4>
        <h2 class="text-light mb-0">$0.00</h2>
        <p class="text-muted">0.00000 BTC</p>
        <div class="w-100 d-flex justify-content-around py-4">
          <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid">
            <i class="bi bi-send d-block h4"></i>
            <small class="d-block">Send</small>
          </button>
          <button class="btn p-2 round-15 bg-dark-mid text-mid">
            <i class="bi bi-send d-block h4"></i>
            <small class="d-block">Recieve</small>
          </button>
          <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid">
            <i class="bi bi-credit-card d-block h4"></i>
            <small class="d-block">Buy</small>
          </button>
          <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid">
            <i class="bi bi-arrow-left-right d-block h4"></i>
            <small class="d-block">Swap</small>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="col-sm-9 mx-auto py-4 mb-4">
    <div class="w-100 d-flex gap-3 p-3 bg-dark round-15">
      <img src="/img/assets/2.jpg" width="60" alt="BTC" class="rounded-circle my-auto" />
      <div class="my-auto">
        <h5 class="text-mid">Bitcoin (BTC)</h5>
        <p class="text-muted mb-0">$112,402.03</p> 
      </div>
      <div class="my-auto ms-auto">
        <small class="bg-teal text-light d-block px-2 py-1 rounded-3">+0.34%</small>
      </div>
    </div>
  </section>

  <AllAssets />
</template>

<style scoped>

</style>