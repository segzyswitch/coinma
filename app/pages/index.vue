<script setup lang="ts">
useHead({
  title: 'Coinma - Sign in to your Coinma wallet',
});
definePageMeta({
  middleware: 'guest',
});

// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();
// Use Pinia store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
// User client services
const deviceInfo = await useHybridDeviceInfo();

const formdata = ref({
  email: '',
  password: '',
  device_info: {}
});
const formerr = ref({
  email: '',
  password: ''
});
const loadReq = ref(false);

async function Login() {
  loadReq.value = true;
  const FD = formdata.value;
  FD.device_info = deviceInfo;
  // return console.log(FD);
  try {
    const response = await Request.Login(FD);
    // return console.log(response.data);
    if (response.data.status != 'success') {
      $swal.fire({
        title: 'Error!',
        icon: 'warning',
        text: response?.data?.message ?? 'Error occurred, try again',
      });
      loadReq.value = false;
      console.log(response);
      return false;
    }
    // set login session
    useCookie('auth_token').value = response.data.token;
    const userData = response.data.data;
    // set user data in Pinia store
    userStore.setUser(userData);
    $swal.fire({
      title: 'Success',
      icon: 'success',
      text: response.data.message,
    });
    // loadReq.value = false;
    FD.email = '';
    FD.password = '';
    // redirect to dashboard
    router.push('/dashboard');
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
</script>

<template>
  <div class="w-100 d-flex overflow-hidden" style="min-height:100vh;">
    <div class="col-sm-4 p-3 pt-5 m-auto">
      <div class="text-center mb-4">
        <h1 class="text-light mb-4"><img src="https://images.cratobyte.com/logo-light.png" height="50" /></h1>
        <h3 class="text-green">Welcome back</h3>
      </div>
      <form @submit.prevent="Login"
        class="w-100 round-15 bg-dark p-4 text-light my-forms position-relative">
        <div class="purple-circle"></div>
        <div class="orange-circle"></div>
        <h5 style="color:#ccc;" class="mb-4 text-center pt-2">Sign in to your wallet.</h5>
        <div class="form-group">
          <label for="email">Email:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="email"><i class="bi bi-person"></i></span>
            <input type="email" v-model="formdata.email" class="form-control" placeholder="Email address" required />
          </div>
        </div>
        <div class="form-group">
          <label for="passw">Password:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="passw"><i class="bi bi-lock"></i></span>
            <input type="password" v-model="formdata.password" class="form-control" placeholder="Password" required />
          </div>
        </div>
        <div class="form-group d-flex small">
          <label class="d-flex gap-2">
            <input type="checkbox" class="form-check-input" />
            <span>Remember me</span>
          </label>
          <a href="#" class="btn text-muted ms-auto p-0 small">Forgot Password?</a>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-success bg-green w-100" :disabled="loadReq">
            <i class="spinner-border spinner-border-sm" v-if="loadReq"></i>
            <span v-else>Sign In</span>
          </button>
        </div>
        <p class="text-center">Don't have Account? <router-link to="/register" class="text-muted">Create account</router-link></p>
      </form>
      <ul class="nav d-flex justify-content-center mt-4 small">
        <li class="nav-item"><a href="#" class="nav-link text-muted small">Contact</a></li>
        <li class="nav-item"><a href="#" class="nav-link text-muted small">About Us</a></li>
        <li class="nav-item"><a href="#" class="nav-link text-muted small">Help & Support</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.purple-circle {
  position: absolute;
  top: -50px;
  left: -100px;
  width: 300px;
  height: 300px;
  background-color: var(--thm-purple);
  border-radius: 50%;
  opacity: 0.4;
  z-index: -1;
}

.orange-circle {
  position: absolute;
  bottom: -30px;
  right: -100px;
  width: 400px;
  aspect-ratio: 1;
  background-color: var(--thm-orange);
  border-radius: 50%;
  opacity: 0.4;
  z-index: -1;
}
</style>