<script setup lang="ts">
useHead({
  title: 'Create a new Cratobyte wallet - Cratobyte',
});

// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

// Define forms
const formdata = ref({
  name: '',
  email: '',
  country: '',
  phone: '',
  password: '',
  c_password: '',
  timezone: ''
});
const formerr = ref({
  name: '',
  email: '',
  country: '',
  phone: '',
  password: '',
  c_password: ''
});
const loadReq = ref(false);

import Regions from '~/assets/regions.json';
// get Regions
// const Countries:any = ref([]);
// async function getRegions() {
//   try {
//     const data = await useFetch('/assets/regions.json');
//     if ( !data ) return false;
//     Countries.value = data.data;
//   }catch(err) {
//     console.log(err);
//   }
// }
const Countries:any = computed(() => {
  return Regions;
})
// Computed property timezone
// const timezone = computed(() => {
//   const selectedCountry = Countries.find((c: { name: string; }) => c.name === formdata.value.country);
//   if ( selectedCountry?.timezones?.length > 0 ) {
//     return selectedCountry.timezones.zoneName;
//   }else {
//     return selectedCountry;
//   }
// });

// Register request
async function Register() {
  loadReq.value = true;
  const FD = formdata.value;
  try {
    const response = await Request.Register(FD);
    // console.log(response.data);
    if (response.data.status != 'success') {
      $swal.fire({
        title: 'Error!',
        icon: 'warning',
        text: response?.data?.message ?? 'Error occurred, try again',
      });
      console.log(response?.data);
      loadReq.value = false;
      return false;
    }
    $swal.fire({
      title: 'Success',
      icon: 'success',
      text: response.data.message,
    });
    loadReq.value = false;
    formdata.value = {
      name: '',
      email: '',
      country: '',
      phone: '',
      password: '',
      c_password: '',
      timezone: ''
    };
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
  // getRegions();
});
</script>

<template>
  <div class="w-100 d-flex overflow-hidden">
    <div class="col-sm-5 p-3 pt-5 mx-auto">
      <div class="text-center mb-4">
        <h1 class="text-light mb-4"><img src="https://cratobyte.com/logo.png" height="40" /></h1>
        <h3 class="text-green">Create an account</h3>
      </div>
      <form @submit.prevent="Register"
        class="w-100 round-15 bg-dark p-4 text-light my-forms position-relative">
        <!-- {{ Countries }} -->
        <div class="orange-circle"></div>
        <div class="purple-circle"></div>
        <p style="color:#ccc;" class="mb-4 text-center">Fill the details below to create your wallet.</p>
        <div class="form-group">
          <label for="name">Full name:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="name"><i class="bi bi-person"></i></span>
            <input type="text" v-model="formdata.name" class="form-control" placeholder="Enter name" required />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="email"><i class="bi bi-envelope"></i></span>
            <input type="email" v-model="formdata.email" class="form-control" placeholder="Enter email" required />
            <small class="text-danger" v-if="formerr.email">{{ formerr.email }}</small>
          </div>
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="email"><i class="bi bi-flag"></i></span>
            <select v-model="formdata.country" class="form-control" required id="country">
              <option value="">Select country</option>
              <option v-for="country in Countries"
                :value="country.name">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Phone number:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="phone"><i class="bi bi-telephone"></i></span>
            <input type="tel" v-model="formdata.phone" class="form-control" placeholder="Enter phone number" required />
          </div>
        </div>
        <div class="form-group">
          <label for="passw">Password:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="passw"><i class="bi bi-person"></i></span>
            <input type="password" v-model="formdata.password" class="form-control" placeholder="********" required />
          </div>
        </div>
        <div class="form-group">
          <label for="c_password">Retype password:</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="c_password"><i class="bi bi-person"></i></span>
            <input type="password" v-model="formdata.c_password" class="form-control" placeholder="********" required />
          </div>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-success bg-green w-100" :disabled="loadReq">
            <i class="spinner-border spinner-border-sm me-2" v-if="loadReq"></i>
            <span>Sign In</span>
          </button>
        </div>
        <p class="text-center">Already have Account? <router-link to="/" class="text-muted">Sign in</router-link></p>
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
  background-color: var(--thm-orange);
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
  background-color: var(--thm-purple);
  border-radius: 50%;
  opacity: 0.4;
  z-index: -1;
}
</style>