<script setup lang="ts">
useHead({
	title: 'Set new Password | Cratobyte',
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

// const mailResponse = ref("");
const mailResponse = ref(null); // null or success message
const formdata = ref({
	password: '',
	retype_password: '',
});
const loadReq = ref(false);

async function sendRecovery() {
	loadReq.value = true;
	const FD = formdata.value;
	// return console.log(FD);
	try {
		const response = await Request.Login(FD);
		if (response.data.status != 'success') {
			$swal?.fire({
				title: 'Error!',
				icon: 'warning',
				text: response?.data?.message ?? 'Error occurred, try again',
			});
			loadReq.value = false;
			console.log(response);
			return false;
		}
		mailResponse.value = response.data.message;
		// loadReq.value = false;
		FD.password = '';
		FD.retype_password = '';
	} catch (err: any) {
		console.log(err);
		loadReq.value = false;
		$swal?.fire({
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
				<h1 class="text-light mb-4"><img src="https://cratobyte.com/logo.png" height="40" /></h1>
				<h3 class="text-green">Set new Password</h3>
			</div>
			<form @submit.prevent="sendRecovery" class="w-100 round-15 bg-dark p-4 text-light my-forms position-relative">
				<div class="purple-circle"></div>
				<div class="orange-circle"></div>
				<div class="w-100" v-if="mailResponse == null">
					<h6 style="color:#ccc;" class="mb-4 text-center pt-2">Regain access to your account</h6>
					<div class="form-group">
						<label for="email">New password:</label>
						<div class="input-group">
							<span class="input-group-text" id="email"><i class="bi bi-person"></i></span>
							<input type="password" v-model="formdata.password" class="form-control" placeholder="Enter new password" required />
						</div>
					</div>
					<div class="form-group">
						<label for="email">Confirm password:</label>
						<div class="input-group">
							<span class="input-group-text" id="email"><i class="bi bi-person"></i></span>
							<input type="password" v-model="formdata.retype_password" class="form-control" placeholder="Retype password" required />
						</div>
					</div>
					<div class="form-group text-center pt-1">
						<button class="btn btn-success bg-green w-100" :disabled="loadReq">
							<i class="spinner-border spinner-border-sm" v-if="loadReq"></i>
							<span v-else>Change password</span>
						</button>
					</div>
					<p class="text-center pt-3 m-0">Back to <router-link to="/" class="btn p-0 text-muted">Login?</router-link></p>
				</div>
				<div class="text-center w-100 py-4" v-else>
					<p class="display-1 text-green"><i class="bi bi-check-circle"></i></p>
					<p class="text-mid">{{ mailResponse }}</p>
					<p class="text-center pt-3 m-0"><router-link to="/" class="btn btn-success">Back to Login</router-link></p>
				</div>
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