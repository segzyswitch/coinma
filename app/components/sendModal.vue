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
    // console.log(response.data);
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
    asset_id: props.Asset.asset_id,
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
    $swal.fire({
      title: 'Error!',
      icon: 'warning',
      text: err?.response?.data?.message ?? 'Error occurred, try again',
    });
  }
}
</script>

<template>
  <teleport to="body">
    <!-- Send Modal -->
    <div class="modal fade" id="sendModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
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
            <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="sendModalLabel">Send {{ Asset.name }}</h5>
          </div>
          <div class="modal-body py-5 px-4 text-center">
            <!-- <div class="w-100 howtosend" v-if="!sendType">
              <h4 class="mb-2">Choose how to send!</h4>
              <div class="w-100 pt-3">
                <label class="send-options">
                  <input v-model="sendType" type="radio" name="send-type" value="crypto" class="check" />
                  <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                    <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-primary"><i class="bi bi-send px-1"></i></div>
                    <div class="my-auto ps-3 text-start">
                      <p class="m-0">Send {{ Asset.unit }}</p>
                      <small class="text-mute">Send {{ Asset.unit }} to an external {{ Asset.name }} wallet</small>
                    </div>
                  </div>
                </label>
                <label class="send-options">
                  <input v-model="sendType" type="radio" name="send-type" value="funds" class="check" />
                  <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                    <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-teal"><i class="bi bi-bank px-1"></i></div>
                    <div class="my-auto ps-3 text-start">
                      <p class="m-0">Send money</p>
                      <small class="text-mute">Send funds to your bank account</small>
                    </div>
                  </div>
                </label>
              </div>
            </div> -->
            <form @submit.prevent="requestOtp" class="w-100 crypto my-forms text-start" v-if="!sendType">
              <h5 class="mb-4">Send to external wallet</h5>
              <div class="form-group">
                <label>Sending from:</label>
                <div class="w-100 d-flex gap-3 px-3 form-control">
                  <img :src="Asset.icon" width="50" alt="BTC" class="rounded-circle my-auto" />
                  <div class="my-auto">
                    <p class="text-mid mb-1">{{ Asset.name }}</p>
                    <h5 class="my-auto">{{ Request.formatToCurrency(Asset.volume_price) }}</h5>
                  </div>
                  <div class="my-auto ms-auto">
                    <h5 class="text-light mb-0">{{ `${Asset.volume} ${Asset.unit}` }}</h5>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="amt">Amount:</label>
                <input type="text" class="form-control" v-model="formdata.amount" id="amt" placeholder="Enter amount" required />
              </div>
              <div class="form-group">
                <label for="address">Wallet Address:</label>
                <input type="text" class="form-control" v-model="formdata.wallet_addr" id="address" placeholder="Enter wallet address" required />
                <small class="d-block mt-2 text-muted">Make sure the above is a Bitcoin wallet, sending Bitcoin to other wallets may result in performance loss</small>
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
                <OtpInput v-model="otp" :length="6" />
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