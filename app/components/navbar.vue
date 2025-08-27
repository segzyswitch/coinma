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

onMounted(() => {
  router.afterEach(() => {
    const offcanvasEl = document.getElementById('mobileMenu');
    const bootstrap = (window as any).bootstrap;
    if (offcanvasEl && bootstrap?.Offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  });
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-1 mb-4">
    <div class="container-fluid">
      <router-link to="/dashboard" class="navbar-brand"><img src="https://cratobyte.com/icon.png" height="35" /></router-link>
      <button class="btn navbar-toggler d-sm-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="bar w-100"></span>
        <span class="bar w-100"></span>
        <span class="bar w-75 ms-auto"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <form class="d-none d-sm-flex mx-auto col-sm-5 pt-3 pt-sm-0 my-forms">
          <input class="form-control rounded-3 text-light" type="search" placeholder="Search Assets" aria-label="Search">
        </form>
        <ul class="d-none d-sm-flex navbar-nav my-2 my-lg-0">
          <li class="nav-item dropdown my-auto">
            <a class="nav-link text-light h5 m-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-bell-fill"></i></a>
            <div class="dropdown-menu dropdown-menu-end bg-dark-mid pt-0">
              <h5 class="text-center p-2 text-mid"><i class="bi bi-bell-fill"></i> Notifications</h5>
              <div class="w-100 overflow-auto hidden-scroll p-2"
                style="min-width:300px;max-height:250px;">
                <Notifications />
              </div>
            </div>
          </li>
          <li class="nav-item dropdown px-2">
            <a class="nav-link" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/img/avt1.jpg" class="rounded-circle" width="33" alt="">
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-dark-mid" style="min-width:250px;" aria-labelledby="navbarScrollingDropdown">
              <li class="px-2">
                <div class="bg-dark p-3 mb-2 text-muted rounded-3 small">
                  <h5 class="m-0">{{ user?.name }} <!--sup class="bi bi-check-circle text-green"></sup--></h5>
                  <small class="small">{{ user?.email }}</small>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/settings" class="dropdown-item">Profile Settings</router-link></li>
              <!-- <li><a class="dropdown-item">Help & Support</a></li> -->
              <li>
                <button class="dropdown-item text-danger w-100" href="#" :disabled="loadReq" @click="Logout"><i v-if="loadReq" class="spinner-border spinner-border-sm"></i> Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="offcanvas offcanvas-start" style="width:80%;" tabindex="-1" id="mobileMenu">
    <div class="offcanvas-header bg-dark">
      <router-link to="/dashboard" class="btn p-0 text-light"><img src="https://cratobyte.com/icon.png" height="35" /></router-link>
      <!-- <button type="button" class="btn p-0 text-mid" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="bi bi-x-lg h5 m-0"></i>
        <i class="bi bi-arrow-90deg-left h3 m-0"></i>
      </button> -->
    </div>
    <div class="offcanvas-body bg-dark pt-0">
      <div class="bg-dark-mid p-3 mb-4 text-mid d-flex"
        style="margin:0 -1em;border-bottom:1px solid var(--thm-dark-focus);">
        <img src="/img/avt1.jpg" class="rounded-circle my-auto" width="45" height="45" alt="">
        <div class="my-auto ps-2">
          <h5 class="mb-0">{{ user?.name }} <!--sup class="bi bi-check-circle text-green"></sup--></h5>
          <small class="small">{{ user?.email }}</small>
        </div>
      </div>
      <ul class="nav flex-column mobile-nav">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <i class="bi bi-house-door-fill"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wallets" class="nav-link text-light">
            <i class="bi bi-wallet"></i>
            <span>Wallets</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/history" class="nav-link text-light">
            <i class="bi bi-clock-history"></i>
            <span>History</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/notifications" class="nav-link text-light">
            <i class="bi bi-bell"></i>
            <span>Notifications</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link text-light">
            <i class="bi bi-gear"></i>
            <span>Settings</span>
          </router-link>
        </li>
        <li class="nav-item">
          <button type="button" class="btn w-100 nav-link text-light text-start" @click="Logout">
            <i class="spinner-border spinner-border-sm me-3" v-if="loadReq"></i>
            <i class="bi bi-box-arrow-right" v-else></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navbar .dropdown-menu li .dropdown-item {
  color: #aaa;
  background-color: transparent!important;
}

.navbar-toggler {
  width: 45px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  border: none;
}
.navbar-toggler .bar {
  display: block;
  background-color: #ccc;
  height: 2px;
  border-radius: 2px;
}

.mobile-nav .nav-item {
  padding: 5px 0;
}
.mobile-nav .nav-link {
  color: #888!important;
  padding: 3px 15px 7.5px 15px;
  border-radius: 15px;
  transition: all 0.3s;
}
.mobile-nav .nav-link i.bi {
  font-size: 1.4em;
  margin-right: 10px;
}
.mobile-nav .nav-link.router-link-active {
  color: #aaa!important;
  background-color: var(--thm-dark-focus);
}
.mobile-nav .nav-link.router-link-active i.bi {
  color: var(--thm-green);
}
</style>