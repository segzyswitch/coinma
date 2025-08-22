<script setup lang="ts">
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

const loadData = ref(false);
const formdata:any = ref({
  amount: ''
});

const file:any = ref<File | null>(null);
const preview = ref<string | null>(null);
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    preview.value = URL.createObjectURL(file.value);
  }
};

const emit = defineEmits<{ (e: 'added'): void }>();

async function Deposit() {
  loadData.value = true;
  const FD = new FormData();
  FD.append("deposit", "true");
  FD.append("amount", formdata.value.amount);
  FD.append("asset_id", props.Asset.id);
  FD.append("wallet_addr", props.Asset.wallet_address);
  FD.append("proof", file.value);
  try {
    const response = await Request.Deposit(FD);
    // console.log(response.data);
    if (response.data.status != 'success') {
      $swal.fire({
        title: 'Error!',
        icon: 'warning',
        text: response?.data ?? 'Error occurred, try again',
      });
      console.log(response?.data);
      loadData.value = false;
      return false;
    }
    closeModal('recieveModal');
    emit('added'); // tell parent to reload list
    $swal.fire({
      title: 'Success',
      icon: 'success',
      text: response.data.message,
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
    <div class="modal fade" id="recieveModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="recieveModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header text-center row">
            <div class="col-2 col-sm-3 text-start">
              <button class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
              </button>
            </div>
            <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="recieveModalLabel">Recieve</h5>
          </div>
          <div class="modal-body py-5 px-4 hidden-scroll">
            <form @submit.prevent="Deposit" class="w-100 crypto my-forms">
              <h4 class="mb-3 text-center">Fund {{ Asset.name }} wallet</h4>
              <small class="d-block mb-4 text-center">Send only {{ Asset.name }} ({{ Asset.unit }}) to this address, sending other networks or NFTs will result in performance loss</small>
              <div class="form-group py-3">
                <div class="p-3 bg-dark-mid round-15 col-5 mx-auto">
                  <img v-if="Asset.qr_code" :src="Asset.qr_code" class="w-100" alt="" />
                  <p v-else class="text-center"><span class="bi bi-qr-code display-1 text-muted"></span></p>
                </div>
              </div>
              <div class="form-group">
                <label for="address">Wallet Address:</label>
                <div class="input-group">
                  <div class="form-control btn text-truncate text-muted">{{ Asset.wallet_address }}</div>
                  <button type="button" @click="copyText(Asset.wallet_address)" class="btn btn-sm btn-success bg-teal"><i class="bi bi-copy pe-1"></i> Copy</button>
                </div>
              </div>
              <div class="form-group">
                <label for="amt">Amount:</label>
                <input type="text" class="form-control" v-model="formdata.amount" id="amt" placeholder="Enter amount" required />
              </div>
              <div class="form-group">
                <label for="proof">Proof of payment(optional):</label>
                <input type="file" class="form-control" id="proof" accept="image/*" @change="handleFileChange" placeholder="Enter amount" />
                <small class="d-block mt-1 text-muted">Uploading proof of payment makes transactions process faster</small>
              </div>
              <p class="mb-0">
                <button type="submit" :disabled="loadData" class="btn btn-sm btn-success bg-teal px-4 py-2">
                  <i class="spinner-border spinner-border-sm me-2" v-if="loadData"></i>
                  <span>Submit payment</span>
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>