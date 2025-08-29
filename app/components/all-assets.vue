<script setup lang="ts">
// Define props
const props = defineProps({
  showall: {
    type: Boolean,
    required: false,
    default: false,
  },
  myAssets: {
    type: String,
    required: false,
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
    const response:any = ref(null);
    if(props.myAssets) response.value = await Request.userAssets(props.myAssets);
    else response.value = await Request.allAssets();
    // console.log(response.value.data);
    allAssets.value = response.value.data.data;    
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
        <img :src="asset.icon"
          height="50"
          :alt="asset.shortname"
          class="my-auto rounded-circle"
        />
        <div class="my-auto text-start ps-1">
          <p class="mb-1" :class="{'text-light':!myAssets}">{{ `${asset.name}` }} <small v-if="asset.shortname!=asset.unit">({{ asset.shortname }})</small></p>
          <small class="m-0 text-light" v-if="myAssets">{{ `${asset.volume} ${asset.unit}` }}</small>
          <small class="m-0" v-else>{{ `${asset.unit}` }}</small>
        </div>
        <div class="ms-auto my-auto text-end text-muted" v-if="myAssets">
          <p class="m-0 text-mid">{{ Request.formatToCurrency(asset.volume_price) }}</p>
        </div>
        <div class="ms-auto my-auto text-end text-muted" v-else>
          <p class="mb-1 text-mid">{{ Request.formatToCurrency(asset.price) }}</p>
          <small v-if="asset.rate_status=='up'" class="text-teal"><i class="bi bi-arrow-up"></i>{{ asset.rate_change }}%</small>
          <small v-else class="text-danger"><i class="bi bi-arrow-down"></i>{{ asset.rate_change }}%</small>
        </div>
      </router-link>

      <!-- Empty assets -->
      <div class="w-100 text-center py-4 text-muted" v-if="myAssets && allAssets?.length==0">
        <i class="bi bi-database-x display-4 mb-4 d-block"></i>
        <p>You have not purchased any assets so far</p>
        <router-link to="/market" class="btn btn-success btn-sm px-4">Boy now</router-link>
      </div>
    </div>

    <p class="m-0 text-center pt-3" v-if="!showall && allAssets.length>5">
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