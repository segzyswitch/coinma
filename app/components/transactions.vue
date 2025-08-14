<script setup lang="ts">
// Define props
const props = defineProps({
  showall: {
    type: Boolean,
    required: false,
    default: false,
  }
});
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

const allHistory:Ref<Array<any>> = ref([]);
const loadReq = ref(true);

async function getHistory() {
  loadReq.value = true;
  try {
    const response = await Request.allHistory();
    // console.log(response.data);
    allHistory.value = response.data.data;    
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
  getHistory();
});
</script>

<template>
  <section class="p-3 bg-dark round-15 mb-3">
    <h5 class="text-light mb-3">Recent Transactions</h5>

    <p class="text-center py-5 text-mid" v-if="loadReq">
      <i class="spinner-border"></i>
    </p>
    <div class="w-100" v-else>
      <router-link :to="`/history/${history.trx}`" class="btn w-100 asset-item rounded-3 mb-2" v-for="(history, idx) in allHistory" :key="idx">
        <div class="d-flex w-100 gap-2" v-if="history.type=='credit'">
          <img :src="history.asset.icon" v-if="history.asset" width="40" alt="" class="my-auto rounded-circle" />
          <span v-else class="trx-icon light-success btn rounded-circle"><i class="bi bi-arrow-down h4 m-auto"></i></span>
          <div class="my-auto">
            <p class="mb-1 text-mid text-capitalize">Recieved {{ history.asset.name }}</p>
            <small class="text-teal">From {{ Request.shortenAddress(history.send_from) }}</small>
          </div>
          <div class="ms-auto my-auto text-end">
            <p class="mb-1 small"><span class="text-success">+</span>{{ `${history.units} ${history.asset.unit}` }}</p>
            <p class="text-success m-0">{{ Request.formatToCurrency(history.amount) }}</p>
          </div>
        </div>
      </router-link>
      
      <!-- Empty assets -->
      <div class="w-100 text-center py-4 text-muted" v-if="allHistory.length==0">
        <i class="bi bi-database-x display-4 mb-4 d-block"></i>
        <p>No data to show</p>
        <!-- <router-link to="/market" class="btn btn-success btn-sm px-4">Boy now</router-link> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Asets */
.asset-item {
  color: #ccc;
  text-align: left;
}
.asset-item:hover {
  background-color: var(--thm-dark-mid);
}

.asset-item .trx-icon {
  width: 45px;
  height: 45px;
  padding: 0;
  display: flex;
}
.light-primary {
  background-color: #b7dcff;
  /* color: #0d6efd; */
}
.light-success {
  background-color: #aeffca;
  /* color: #198754; */
}
.light-danger {
  background-color: #fcaeae;
  /* color: #dc3545; */
}
</style>