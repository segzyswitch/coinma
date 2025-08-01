<script setup lang="ts">
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
  <p class="text-center py-5 text-mid" v-if="loadReq">
    <i class="spinner-border"></i>
  </p>
  <section class="p-3 bg-dark round-15 mb-3" v-else>
    <h5 class="text-light mb-3">Top Markets</h5>
    <div class="w-100 overflow-auto d-flex gap-3 hidden-scroll">
      <div class="col-9 col-sm-5 pb-3 top-asset" v-for="(asset, idx) in allAssets.slice(0,3)" :key="idx">
        <div class="w-100 p-3 round-15 text-light"
          style="background:radial-gradient(transparent, rgba(0, 0, 0, 0.3));">
          <div class="d-flex gap-2 mb-3">
            <img :src="asset.icon" class="my-auto" width="40" alt="" />
            <div class="my-auto small">
              <p class="m-0">{{ asset.name }}</p>
              <small>{{ asset.unit }}</small>
            </div>
          </div>
          <p class="d-flex m-0 small">
            <small class="d-block">{{ Request.formatToCurrency(asset.price) }}</small>
            <small v-if="asset.rate_status=='up'" class="ms-auto text-green"><i class="bi bi-arrow-up"></i>{{ asset.rate_change }}%</small>
            <small v-else class="ms-auto text-danger"><i class="bi bi-arrow-down"></i>{{ asset.rate_change }}%</small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.top-asset:first-child > div {
  background-color: var(--thm-purple)!important;
}
.top-asset:nth-child(2) > div {
  background-color: var(--thm-teal)!important;
}
.top-asset:nth-child(3) > div {
  background-color: var(--thm-primary)!important;
}
</style>