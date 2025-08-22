<script lang="ts" setup>
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();
import { closeModal } from '~/utils/modal';

const props = defineProps<{
  Asset: any,
  maskEmail: Function,
  user: any
}>();

const sendType:any = ref(null);
const otp = ref('');
const loadReq = ref(false);
const loadData = ref(false);
const formdata:any = ref({
  amount: '',
  wallet_addr: '',
});

async function requestOtp() {
  loadReq.value = true;
  try {
    const response = await Request.requestOTP(props.user?.email);
    if (response.data.status != 'success') {
      $swal.fire({
        title: 'Error!',
        icon: 'warning',
        text: response?.data?.message ?? 'Error occurred, try again',
      });
      console.log(response?.data);
      loadData.value = false;
      return false;
    }
    sendType.value = 'otp';
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

async function withdrawal() {
  loadData.value = true;
  const FD = {
    confirm_withdrawal: true,
    amount: formdata.value.amount,
    asset_id: props.Asset.id,
    wallet_addr: formdata.value.wallet_addr,
    otp: otp.value
  };
  // return console.log(FD);
  try {
    const response = await Request.Withdraw(FD);
    // console.log(response.data);
    if (response.data.status != 'success') {
      $swal.fire({
        title: 'Error!',
        icon: 'warning',
        text: response?.data?.message ?? 'Error occurred, try again',
      });
      console.log(response?.data);
      loadData.value = false;
      sendType.value = null;
      return false;
    }
    closeModal('sendModal');
    $swal.fire({
      title: 'Warning!',
      icon: 'warning',
      text: `You do not have ${props.Asset?.name}(${props.Asset?.shortname}) to cover your network fees!`,
    });
    loadData.value = false;
  } catch (err:any) {
    console.log(err);
    loadData.value = false;
      sendType.value = null;
    $swal.fire({
      title: 'Error!',
      icon: 'warning',
      text: err?.response?.data?.message ?? 'Error occurred, try again',
    });
  }
}

const allAssets:Ref<Array<any>> = ref([]);
const loadAsset = ref(true);

async function getAssets() {
  loadAsset.value = true;
  try {
    const response = await Request.allAssets();
    // console.log(response.data);
    allAssets.value = response.data.data;
    loadAsset.value = false;
  } catch (err:any) {
    console.log(err);
    loadAsset.value = false;
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
  <teleport to="body">
    <!-- Send Modal -->
    <div class="modal fade" id="swapModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center row">
            <div class="col-2 col-sm-3 text-start">
              <button v-if="!sendType" class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
              </button>
              <button v-else class="btn p-1 me-0 text-light" @click="sendType = null">
                <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">back</span>
              </button>
            </div>
            <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="sendModalLabel">Swap {{ Asset.name }}</h5>
          </div>
          <div class="modal-body py-5 px-4 text-center">
            <form @submit.prevent="requestOtp" class="w-100 crypto my-forms text-start" v-if="!sendType">
              <h5 class="mb-4">Swap {{ Asset.name }}</h5>
              <div class="form-group">
                <div class="w-100 d-flex gap-3 px-3 form-control">
                  <img :src="Asset.icon" width="50" :alt="Asset.name" class="rounded-circle my-auto" />
                  <div class="my-auto">
                    <p class="text-mid mb-1">{{ Asset.name }}</p>
                    <p class="my-auto">{{ Request.formatToCurrency(Asset.volume_price) }}</p>
                  </div>
                  <div class="my-auto ms-auto">
                    <p class="text-light mb-0">{{ `${Asset.volume} ${Asset.unit}` }}</p>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <hr class="col-9 p-0 mx-auto d-block mt-4" />
              </div>
              <div class="form-group">
                <label for="address">Swap to:</label>
                <select class="form-control" v-model="formdata.wallet_addr" id="address" required>
                  <option value="">Select coin</option>
                  <option v-for="(a, idx) in allAssets" :value="a.name" :key="idx">{{ a.name }} <small v-if="a.shortname!=a.unit">({{ a.shortname }})</small></option>
                </select>
              </div>
              <p class="pt-3 mb-0">
                <button type="submit" :disabled="loadReq" class="btn btn-success bg-teal px-4 py-2">
                  <i class="spinner-border spinner-border-sm" v-if="loadReq"></i>
                  <span>Continue</span>
                </button>
              </p>
            </form>
            <form @submit.prevent="withdrawal" class="w-100 funds my-forms" v-if="sendType==='otp'">
              <div class="form-group">
                <p class="m-0">Authorize this transaction by entering the OTP sent to {{ maskEmail(user?.email) }}</p>
              </div>
              <div class="w-100  py-4">
                <OtpInput v-model="otp" :length="5" />
              </div>
              <p class="pt-3 mb-0">
                <button type="submit" :disabled="loadData" class="btn btn-success bg-teal px-4 py-2">
                  <i class="spinner-border spinner-border-sm me-2" v-if="loadData"></i>
                  <span>Continue</span>
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>