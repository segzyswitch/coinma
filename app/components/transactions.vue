<template>
  <section class="p-3 bg-dark round-15 mb-3">
    <h5 class="text-light mb-3">Recent Transactions</h5>

    <div class="w-100 asset-item p-2 d-flex gap-2 rounded-3" v-for="i in 5" :key="i">
      <img :src="`/img/assets/${i}.jpg`" width="40" alt="" class="my-auto" />
      <div class="my-auto">
        <p class="m-0">Bitcoin</p>
        <small><span class="text-danger">-</span>$2,400.00</small>
      </div>
      <div class="ms-auto my-auto text-end text-muted">
        <p class="m-0"><span class="text-success">+</span>0.{{1028 * i}} BTC</p>
        <small>11:25 AM</small>
      </div>
    </div>
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