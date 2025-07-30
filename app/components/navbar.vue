<script setup lang="ts">
// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
import Request from '~/services/api';
// import user store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const loadReq = ref(false);
async function Logout() {
  loadReq.value = true;
  try {
    const response = await Request.Logout();
    userStore.clearUser();
    useCookie('auth_token').value = '';
    router.push('/');
  } catch (err:any) {
    console.log(err);
    userStore.clearUser();
    useCookie('auth_token').value = '';
    router.push('/');
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-1 mb-4">
    <div class="container-fluid">
      <router-link to="/dashboard" class="navbar-brand"><span class="h2 text-monospace">.coinma</span></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <form class="d-none d-sm-flex mx-auto col-sm-5 pt-3 pt-sm-0 my-forms">
          <input class="form-control rounded-3 text-light" type="search" placeholder="Search Assets" aria-label="Search">
        </form>
        <ul class="d-none d-sm-flex navbar-nav my-2 my-lg-0">
          <li class="nav-item my-auto">
            <a class="nav-link text-light h5 m-0" href="#"><i class="bi bi-bell-fill"></i></a>
          </li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/img/avt1.jpg" class="rounded-circle" width="33" alt="">
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-dark-focus" style="min-width:250px;" aria-labelledby="navbarScrollingDropdown">
              <li class="px-2">
                <div class="bg-dark p-3 mb-2 text-muted rounded-3 small">
                  <h5 class="m-0">{{ user?.name }} <sup class="bi bi-check-circle text-green"></sup></h5>
                  <small class="small">{{ user?.email }}</small>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item " href="#">Profile</a></li>
              <li><a class="dropdown-item " href="#">Settings</a></li>
              <li><a class="dropdown-item " href="#">Help & Support</a></li>
              <li><a class="dropdown-item text-danger" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0 d-sm-none">
          <li class="nav-item pt-3">
            <div class="bg-dark-mid p-3 mb-2 text-mid rounded-3 d-flex">
              <img src="/img/avt1.jpg" class="rounded-circle my-auto" width="50" height="50" alt="">
              <div class="my-auto ps-3">
                <h5>{{ user?.name }} <sup class="bi bi-check-circle text-green"></sup></h5>
                <small class="small">{{ user?.email }}</small>
              </div>
            </div>
          </li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="bi me-1 bi-bell"></i> Notifications</a></li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="bi me-1 bi-person"></i> Profile</a></li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="bi me-1 bi-gear"></i> Settings</a></li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="bi me-1 bi-question-circle"></i> Help & Support</a></li>
          <li class="nav-item">
            <button class="btn w-100 text-start nav-link" href="#" @click="Logout">
              <i class="me-1 spinner-border spinner-border-sm" v-if="loadReq"></i>
              <i class="me-1 bi bi-box-arrow-right" v-else></i>
              <span class="ms-1">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown-menu.bg-dark-focus li a {
  color: #aaa;
  background-color: transparent!important;
}
</style>