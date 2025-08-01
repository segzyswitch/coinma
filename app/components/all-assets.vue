<script setup lang="ts">
// Define props
const props = defineProps({
  showall: {
    type: Boolean,
    required: false,
    default: false,
  },
  myAssets: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

const allAssets:Ref<Array<any>> = ref([]);
const loadReq = ref(true);

async function getAssets() {
  loadReq.value = true;
  try {
    const response = await Request.allAssets();
    // console.log(response.data);
    allAssets.value = response.data.data;    
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
  getAssets();
});
</script>

<template>
  <section class="p-3 bg-dark round-15 mb-3 small">
    <h5 class="text-light mb-4">{{ `${myAssets ? 'My assets' : 'All assets'}` }}</h5>

    <p class="text-center py-5 text-mid" v-if="loadReq">
      <i class="spinner-border"></i>
    </p>
    <div class="w-100" v-else>
      <router-link :to="`/market/${asset.slug}`" class="btn w-100 asset-item p-2 d-flex gap-2 mb-2" v-for="(asset, idx) in allAssets" :key="idx">
        <img :src="asset.icon" width="50" :alt="asset.shortname" class="my-auto" />
        <div class="my-auto text-start ps-1">
          <p class="mb-1" :class="{'text-light':!myAssets}">{{ `${asset.name}` }}</p>
          <small class="m-0 text-light" v-if="myAssets">{{ `${asset.volume} ${asset.unit}` }}</small>
          <small class="m-0" v-else>{{ `${asset.unit}` }}</small>
        </div>
        <div class="ms-auto my-auto text-end text-muted" v-if="myAssets">
          <h5 class="m-0 text-mid">{{ Request.formatToCurrency(asset.volume_price) }}</h5>
        </div>
        <div class="ms-auto my-auto text-end text-muted" v-else>
          <p class="mb-1 text-mid">{{ Request.formatToCurrency(asset.price) }}</p>
          <small v-if="asset.rate_status=='up'" class="text-teal"><i class="bi bi-arrow-up"></i>{{ asset.rate_change }}%</small>
          <small v-else class="text-danger"><i class="bi bi-arrow-down"></i>{{ asset.rate_change }}%</small>
        </div>
      </router-link>
    </div>

    <p class="m-0 text-center pt-3" v-if="!showall">
      <router-link to="/market/" class="btn btn-sm btn-success bg-teal px-3">See more</router-link>
    </p>
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