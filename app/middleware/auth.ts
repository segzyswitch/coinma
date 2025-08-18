import Request from "~/services/api";
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

async function checkUserData() {
  try {
    const response = await Request.userDetails();
    if ( JSON.stringify(user.value) !== JSON.stringify(response.data.data) ) {
      userStore.setUser(response.data.data);
      // console.log(response);
    }
  } catch (err) {
    userStore.clearUser();
    useCookie('auth_token').value = '';
    console.log(err);
    return navigateTo('/');
  }
}

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token');

  if (!token.value) {
    userStore.clearUser();
    useCookie('auth_token').value = '';
    return navigateTo('/');
  }
  // Check to update user data every 10s
  setInterval(checkUserData, 10000);
});
