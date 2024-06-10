import type { UserSecretTokenDto } from "~/models/auth.model";
import { useCookie, useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";
import { TOKEN_KEY, USER_KEY } from "~/constants/common.const";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: useCookie(TOKEN_KEY).value || "",
    user: useCookie(USER_KEY).value,
  }),

  actions: {
    async signUp(credentials: {
      email: string;
      password: string;
      userType: string;
    }) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signUp(credentials);
      this.token = token;
      this.user = userInfo;
      const expireDate = getExpireDate(token);
      setCookie(TOKEN_KEY, this.token, expireDate);
      setCookie(USER_KEY, this.user, expireDate);
    },
    async signIn(credentials: { email: string; password: string }) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signIn(credentials);
      this.token = token;
      this.user = userInfo;
      const expireDate = getExpireDate(token);
      setCookie(TOKEN_KEY, this.token, expireDate);
      setCookie(USER_KEY, this.user, expireDate);
    },

    async signInWithToken(secretToken: UserSecretTokenDto) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signInWithToken(secretToken);
      localStorage.setItem(USER_KEY, userInfo);
      localStorage.setItem(TOKEN_KEY, token);
    },

    async logout() {
      try {
        const { $api } = useNuxtApp();
        await $api.auth.revoke();
      } catch {}

      localStorage.clear();
      useCookie(TOKEN_KEY).value = "";
      useCookie(USER_KEY).value = "";
      this.token = "";
      this.user = "";
    },
  },
});

const setCookie = (key: string, value: any, expireDate: Date) => {
  useCookie(key, {
    sameSite: true,
    secure: true,
    expires: expireDate,
  }).value = value;
};


const getExpireDate = (token: string) => {
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));
  return new Date(decodedPayload.exp * 1000);
}