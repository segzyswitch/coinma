<script setup lang="ts">
useHead({
  title: 'Wallets - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// import user store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
</script>

<template>
  <div>
    <DashHeader />

    <AllAssets :showall="true" :myAssets="user?.id" />

    <Transactions />
  </div>
</template>