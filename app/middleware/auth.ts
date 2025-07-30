import Request from "~/services/api";
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

async function checkSession() {
  try {
    const response = await Request.userDetails();
    userStore.setUser(response.data.user);
    console.log(response);
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
  if ( !user ) checkSession();
});
