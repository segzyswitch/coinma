<script setup lang="ts">
// Use Pinia store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// Copy WalletId
function copyWalletId() {
  navigator.clipboard.writeText(user?.value?.wallet_id ?? '')
  .then(() => {
    alert('Copied!');
  })
  .catch(() => {
    alert('Failed to copy.')
  });
}

// Import API
import Request from '~/services/api';

</script>

<template>
  <header class="bg-dark round-15 p-3 mb-3 pt-4">
    <!-- <h4 class="text-green mb-3">My wallet</h4> -->
    <div class="w-100 d-flex gap-3 mb-4">
      <p class="my-auto d-none d-sm-block small">#WALLET ID</p>
      <div class="my-auto">
        <span class="btn rounded-3 bg-dark-focus btn-sm text-muted">{{ user?.wallet_id }}</span>
      </div>
      <button class="btn p-0" @click="copyWalletId"><i class="bi bi-copy text-green"></i></button>
    </div>
    <h2 class="text-light mb-4">{{ Request.formatToCurrency(user?.wallet_bal) }}</h2>
    <div class="w-100 d-flex justify-content-around header-icons">
      <router-link to="/market/" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-send"></i></span>
        <span class="text d-block">Send</span>
      </router-link>
      <router-link to="/market/" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-send" style="transform: rotate(180deg);"></i></span>
        <span class="text d-block">Recieve</span>
      </router-link>
      <router-link to="/market/" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-credit-card"></i></span>
        <span class="text d-block">Buy</span>
      </router-link>
      <router-link to="/history" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-clock-history"></i></span>
        <span class="text d-block">History</span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  color: #ccc;
}
.header-icons .button {
  color: #ccc;
  text-align: center;
}
.header-icons .icon {
  font-size: 1.5em;
  color: #ccc;
  display: flex;
  border-radius: 50%;
  width: 60px;
  aspect-ratio: 1;
  background-color: #000;
}
</style>