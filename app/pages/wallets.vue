<script setup lang="ts">
useHead({
  title: 'Wallets - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <div>
    <DashHeader />

    <Transactions />
  </div>
</template>