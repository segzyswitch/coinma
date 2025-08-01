<script setup lang="ts">
useHead({
  title: 'Dashboard - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

</script>

<template>
  <div>
    <DashHeader />

    <section class="p-3 bg-dark round-15 mb-3">
      <h5 class="text-light mb-3">Top Markets</h5>
      <div class="row">
        <div class="col-sm-4 pb-3">
          <div class="w-100 p-3 bg-purple round-15 text-light"
            style="background:radial-gradient(transparent, rgba(0, 0, 0, 0.3));">
            <div class="d-flex gap-2 mb-3">
              <img src="/img/assets/market-1.jpg" class="my-auto" width="40" alt="" />
              <div class="my-auto small">
                <p class="m-0">Bitcoin</p>
                <small>BTC</small>
              </div>
            </div>
            <p class="d-flex m-0 small">
              <small class="d-block">$122,343</small>
              <small class="ms-auto d-block text-green"><i class="bi bi-chevron-up"></i>1.12%</small>
            </p>
          </div>
        </div>
        <div class="col-sm-4 pb-3">
          <div class="w-100 p-3 bg-teal round-15 text-light"
            style="background:radial-gradient(transparent, rgba(0, 0, 0, 0.3));">
            <div class="d-flex gap-2 mb-3">
              <img src="/img/assets/market-3.jpg" class="my-auto" width="40" alt="" />
              <div class="my-auto small">
                <p class="m-0">Binance</p>
                <small>BNB</small>
              </div>
            </div>
            <p class="d-flex m-0 small">
              <small class="d-block">$22,000</small>
              <small class="ms-auto d-block text-green"><i class="bi bi-chevron-up"></i>3.05%</small>
            </p>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="w-100 p-3 bg-primary round-15 text-light"
            style="background:radial-gradient(transparent, rgba(0, 0, 0, 0.3));">
            <div class="d-flex gap-2 mb-3">
              <img src="/img/assets/market-2.jpg" class="my-auto" width="40" alt="" />
              <div class="my-auto small">
                <p class="m-0">Ethereum</p>
                <small>ETH</small>
              </div>
            </div>
            <p class="d-flex m-0 small">
              <small class="d-block">$22,000</small>
              <small class="ms-auto d-block text-danger"><i class="bi bi-chevron-down"></i>2.44%</small>
            </p>
          </div>
        </div>
      </div>
    </section>

    <AllAssets />
  </div>
</template>

<style scoped>

</style>