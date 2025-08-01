<script setup lang="ts">
useHead({
  title: 'Transactions History - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

</script>

<template>
  <section class="p-3 bg-dark round-15 mb-3">
    <h4 class="mb-4 text-green"><i class="bi bi-clock-history"></i> Transactions history</h4>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">History</li>
      </ol>
    </nav>
  </section>

  <Transactions />
</template>

<style scoped>

</style>