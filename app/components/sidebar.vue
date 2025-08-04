<script setup lang="ts">
// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
import Request from '~/services/api';
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

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
  <div>
    <div class="sidebar col-sm-2 d-none d-sm-block">
      <ul class="nav flex-column">
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

    <footer class="bg-dark fixed-bottom w-100 py-2 d-sm-none nav">
      <router-link to="/dashboard" class="nav-link">
        <i class="bi bi-house-door-fill"></i>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/wallets" class="nav-link text-light">
        <i class="bi bi-wallet"></i>
        <span>Wallets</span>
      </router-link>
      <router-link to="/history" class="nav-link text-light">
        <i class="bi bi-clock-history"></i>
        <span>History</span>
      </router-link>
      <router-link to="/settings" class="nav-link text-light">
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </router-link>
    </footer>
  </div>
</template>

<style scoped>
/* sidebar */
.sidebar {
  position: fixed;
  top: 50px; /* Adjust based on navbar height */
  bottom: 0;
  left: 0;
  z-index: 100;
  height: calc(100% - 56px);
  background-color: #222223; /* Dark background */
  padding: 2.5em 1em;
  overflow: auto;
}
.sidebar .nav-item {
  padding: 5px 0;
}
.sidebar .nav-link {
  color: #888!important;
  padding: 3px 15px 7.5px 15px;
  border-radius: 15px;
  transition: all 0.3s;
}
.sidebar .nav-link i.bi {
  font-size: 1.4em;
  margin-right: 10px;
}
.sidebar .nav-link.router-link-active {
  color: #aaa!important;
  background-color: var(--thm-dark-focus);
}
.sidebar .nav-link.router-link-active i.bi {
  color: var(--thm-green);
}

/* footer */
footer {
  display: flex;
  z-index: 999;
}
footer .nav-link {
  color: #888!important;
  border-radius: 15px;
  transition: all 0.3s;
  font-size: .7em;
  text-align: center;
  margin: 0 auto;
  text-decoration: none;
  padding: 0;
}
footer .nav-link i.bi {
  font-size: 2em;
  display: block;
}
footer .nav-link.router-link-active {
  color: #ccc!important;
  /* background-color: var(--thm-dark-focus); */
}
footer .nav-link.router-link-active i.bi {
  color: var(--thm-green);
}
</style>