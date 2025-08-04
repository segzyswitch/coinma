<script setup lang="ts">
// Define props
const props = defineProps({
  isPage: {
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

async function getActivities() {
  loadReq.value = true;
  try {
    const response = await Request.allNotifications();
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
  getActivities();
});
</script>

<template>
  <p class="text-center py-5 text-mid" v-if="loadReq">
    <i class="spinner-border"></i>
  </p>
  <div class="w-100" v-else>
    <div class="w-100"  v-for="(noti, idx) in allHistory">
      <div class="w=100 rounded-3 noti-item text-mid mb-3 bg-dark flex-column p-3" v-if="isPage">
        <h5 class="mb-2"><i class="bi bi-phone-fill text-teal"></i> New device logged in</h5>
        <p class="mb-1">{{ noti.feed }}</p>
        <p class="m-0 small text-muted"><i class="bi bi-clock"></i> {{ Request.formatSqlDatetime(noti.createdat) }}</p>
      </div>
    </div>
    <div class="w-100"  v-for="(noti, idx) in allHistory.slice(0, 10)" v-if="!isPage">
      <router-link to="/notifications" class="btn text-start d-flex w-100 rounded-3 noti-item text-mid mb-2 bg-dark-focus flex-column p-2">
        <p class="mb-1"><i class="bi bi-phone-fill text-teal"></i> {{ noti.feed }}</p>
        <p class="m-0 small text-muted"><i class="bi bi-clock"></i> {{ Request.formatSqlDatetime(noti.createdat) }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>