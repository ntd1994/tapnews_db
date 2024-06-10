import { defineNuxtPlugin } from "nuxt/app";
import { AdminConsoleApi } from "~/api/admin-console.api";
import { AuthApi } from "~/api/auth.api";
import { UserApi } from "~/api/user.api";
interface ApiInstances {
  auth: AuthApi;
  adminConsole: AdminConsoleApi,
  user: UserApi
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions = {
    baseURL: nuxtApp.$config.public.apiURL,
  };
  const apis: ApiInstances = {
    auth: new AuthApi(fetchOptions),
    adminConsole: new AdminConsoleApi(fetchOptions),
    user: new UserApi(fetchOptions)
  };

  return {
    provide: {
      api: apis,
    },
  };
});
