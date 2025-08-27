<script setup lang="ts">
useHead({
  title: 'Profile Settings - Cratobyte',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// import user store
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
</script>

<template>
  <div class="w-100 text-center text-mid py-5">
    <p><img src="/img/avt1.jpg" width="100" alt="Photo" /></p>
    <h3>{{ user?.name }} <!--sup class="bi bi-check-circle text-green"></sup--></h3>
    <small class="d-block">{{ user?.email }}</small>
  </div>
    
  <section class="container-fluid bg-dark round-15 reciept py-2 px-0">
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Wallet ID</div>
      <button @click="copyWalletId" class="btn p-0 my-auto text-muted">{{ user?.wallet_id }} <i class="bi bi-copy"></i></button>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Name</div>
      <div class="my-auto text-muted">{{ user?.name }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Email</div>
      <div class="my-auto text-muted">{{ user?.email }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Phone number</div>
      <div class="my-auto text-muted">{{ user?.phone }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Address</div>
      <button class="btn p-0 my-auto text-muted">{{ (user?.address)? user?.address : 'add' }} <b>></b></button>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Country</div>
      <div class="my-auto text-muted">{{ user?.country }}</div>
    </div>
    <!-- <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Account status</div>
      <div class="my-auto text-success">Verified</div>
    </div> -->
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Account activities</div>
      <router-link to="/notifications" class="btn p-0 my-auto text-muted">view <b>></b></router-link>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Password</div>
      <button class="btn p-0 my-auto text-muted">change <b>></b></button>
    </div>
  </section>
  <p class="text-center pt-4"><button class="btn text-danger"><i class="bi bi-box-arrow-right"></i> Logout</button></p>
</template>

<style scoped>
.reciept-item {
  border-color: var(--thm-dark-focus)!important;
}
.reciept-item:last-child {
  border: none!important;
}
</style>