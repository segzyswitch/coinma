// stores/user.ts
import { defineStore } from 'pinia';

type User = Record<string, any>;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | User,
    isAuthenticated: false,
  }),
  actions: {
    setUser(userData: User) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
  persist: true,
});
