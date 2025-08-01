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

    <TopMarkets />

    <AllAssets />
  </div>
</template>

<style scoped>

</style>