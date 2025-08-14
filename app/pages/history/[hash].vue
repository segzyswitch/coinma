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
// Inport route
import { useRoute } from 'vue-router';
// Use the router instance
const route = useRoute();
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

// Copy wallet address
function copyText(text: string) {
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Copied!');
  })
  .catch(() => {
    alert('Failed to copy.');
  });
}
;
const Reciept:any = ref({});
const loadReq = ref(true);

async function getReciept() {
  loadReq.value = true;
  try {
    const response = await Request.historyByHash(route.params.hash);
    // console.log(response.data);
    Reciept.value = response.data.data;    
    loadReq.value = false;
  } catch (err:any) {
    console.log(err);
    loadReq.value = false;
    $swal.fire({
      title: 'Error!',
      icon: 'warning',
      text: err?.response?.data?.message ?? 'Error occurred, try again',
    });
  }
}

onMounted(() => {
  getReciept();
});
</script>

<template>
  <section class="p-3 mb-4 pb-4">
    <p class="mb-4">
      <button class="btn p-1 me-0 text-light" @click="router.back" aria-label="Close">
        <i class="bi bi-arrow-left"></i> <span class="ps-2">back</span>
      </button>
    </p>
    <p class="text-center py-5 text-mid" v-if="loadReq">
      <i class="spinner-border"></i>
    </p>
    <div class="w-100" v-else>
      <div class="row">
        <div class="col-3 col-sm-1 mx-auto mb-3 rounded-circle overflow-hidden mb-4 p-0">
          <img :src="Reciept.icon" class="w-100 rounded-circle" alt="BTC" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-center mx-auto">
          <h4 class="text-mid mb-3">{{ Reciept.name }}</h4>
          <p class="text-mid mb-2">{{ `${Reciept.units} ${Reciept.unit}` }}</p>
          <h4 class="text-light mb-2">{{ Request.formatToCurrency(Reciept.amount) }}</h4>
        </div>
      </div>
    </div>
  </section>

  <section class="container-fluid bg-dark round-15 reciept py-4" v-if="!loadReq">
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Coin</div>
      <div class="my-auto">{{ Reciept.name }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Unit</div>
      <div class="my-auto text-green">{{ `${Reciept.units} ${Reciept.unit}` }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Amount</div>
      <div class="my-auto text-green">{{ Request.formatToCurrency(Reciept.amount) }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Address</div>
      <div class="my-auto">{{ Request.shortenAddress(Reciept.send_from) }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Confirmation</div>
      <div class="my-auto">{{ Reciept.confirmation }} <i class="bi bi-check"></i></div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Status</div>
      <div class="my-auto text-green" v-if="Reciept.trx_status=='completed'">{{ Reciept.trx_status }}</div>
      <div class="my-auto text-warning" v-else-if="Reciept.trx_status=='pending'">{{ Reciept.trx_status }}</div>
      <div class="my-auto text-danger" v-else>{{ Reciept.trx_status }}</div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Date</div>
      <div class="my-auto text-end">
        <span class="d-block">{{ Request.formatSqlDatetime(Reciept.createdat).substring(0,10) }}</span>
        <small class="d-block">{{ Request.formatSqlDatetime(Reciept.createdat).substring(10,18) }}</small>
      </div>
    </div>
    <div class="w-100 p-3 d-flex justify-content-between text-mid border-bottom reciept-item">
      <div class="my-auto">Transaction ID</div>
      <div class="my-auto">#{{ Reciept.trx }}</div>
    </div>
  </section>
</template>

<style scoped>
.send-options {
  display: block;
  position: relative;
}
.send-options .check {
  position: absolute;
  right: 15px;
  top: 38%;
  scale: 1.3;
  opacity: 0;
}
.send-options .check:checked + .button {
  border-color: var(--thm-green);
  background-color: var(--thm-dark-focus)!important;
}
.send-options .button:hover {
  background-color: var(--thm-dark-focus)!important;
}

.reciept-item {
  border-color: var(--thm-dark-focus)!important;
}
.reciept-item:last-child {
  border: none!important;
}
</style>