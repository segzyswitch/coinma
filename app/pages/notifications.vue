<script setup lang="ts">
useHead({
  title: 'Account notifications - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

</script>

<template>
  <section class="p-3 bg-dark round-15 mb-4">
    <h4 class="mb-4 text-green"><i class="bi bi-bell"></i> Account notifications</h4>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Notifications</li>
      </ol>
    </nav>
  </section>

  <Notifications :is-page="true" />
</template>

<style scoped>

</style>