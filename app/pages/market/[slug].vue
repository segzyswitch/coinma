<script setup lang="ts">
useHead({
  title: 'All Markets - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// Use Pinia store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
// Inport router
import { useRoute } from 'vue-router';
// Use the router instance
const route = useRoute();
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

const sendType:any = ref(null);
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
const Asset:any = ref({});
const loadReq = ref(true);
const otp = ref('');

async function getAsset() {
  loadReq.value = true;
  try {
    const response = await Request.assetBySlug(route.params.slug);
    // console.log(response.data);
    Asset.value = response.data.data;    
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

function maskEmail(email: string): string {
  const [local, domain]:any = email.split('@')
  if (!domain) return email // invalid email, return as is
  // Show first 2 characters and last 2 characters, mask the rest
  const visibleStart = local.slice(0, 2)
  const visibleEnd = local.slice(-2)
  const masked = '*'.repeat(Math.max(local.length - 4, 0))

  return `${visibleStart}${masked}${visibleEnd}@${domain}`
}

onMounted(() => {
  getAsset();
});
</script>

<template>
  <section class="p-3 mb-3 pb-4">
    <!-- <p class="text-light">{{ Asset }}</p> -->
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
          <img :src="Asset.icon" class="w-100 rounded-circle" alt="BTC" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-center mx-auto">
          <h4 class="text-mid mb-1">{{ Asset.name }} <span v-if="Asset.shortname!=Asset.unit">({{ Asset.shortname }})</span></h4>
          <h2 class="text-light mb-1">{{ Request.formatToCurrency(Asset.volume_price) }}</h2>
          <p class="text-muted">{{ `${Asset.volume} ${Asset.unit}` }}</p>
          <div class="w-100 d-flex justify-content-around py-4">
            <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid" data-bs-toggle="modal" data-bs-target="#sendModal">
              <i class="bi bi-send d-block h4"></i>
              <small class="d-block" style="padding:0 3px;">Send</small>
            </button>
            <button class="btn p-2 round-15 bg-dark-mid text-mid" data-bs-toggle="modal" data-bs-target="#recieveModal">
              <i class="bi bi-send d-block h4" style="transform: rotate(180deg);"></i>
              <small class="d-block" style="padding:0 2px;">Recieve</small>
            </button>
            <button class="btn p-2 px-4 round-15 bg-dark-mid text-mid">
              <i class="bi bi-credit-card d-block h4"></i>
              <small class="d-block">Buy</small>
            </button>
            <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid">
              <i class="bi bi-arrow-left-right d-block h4"></i>
              <small class="d-block">Swap</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="col-sm-9 mx-auto py-4 mb-4" v-if="loadReq==false">
    <div class="w-100 d-flex p-3 gap-2 bg-dark round-15">
      <div class="my-auto text-start">
        <h5 class="text-light mb-3">{{ `${Asset.name}` }}</h5>
        <p class="m-0 text-mid">{{ `${Asset.unit}` }}</p>
      </div>
      <div class="m-auto text-end text-muted ps-3">
        <p class="mb-3 text-mid">{{ Request.formatToCurrency(Asset.price) }}</p>
        <p v-if="Asset.rate_status=='up'" class="text-teal m-0"><i class="bi bi-arrow-up"></i>{{ Asset.rate_change }}%</p>
        <p v-else class="text-danger m-0"><i class="bi bi-arrow-down"></i>{{ Asset.rate_change }}%</p>
      </div>
      <div class="my-auto ms-auto overflow-hidden">
        <div style="max-width:100%;max-height:120px;"><LineChart :rate-drop="Asset.rate_status" /></div>
      </div>
    </div>
  </section>

  <AllAssets />

  
  <!-- Send Modal -->
  <SendModal :Asset="Asset" :maskEmail="maskEmail" :user="user" />
  
  <!-- Recieve Modal -->
  <depositModal :Asset="Asset" :maskEmail="maskEmail" :user="user" />
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
</style>