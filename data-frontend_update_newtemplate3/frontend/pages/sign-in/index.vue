<script setup lang="ts">
	import { navigateTo, useRuntimeConfig } from 'nuxt/app';
	import { computed, reactive } from 'vue';
	import { required, email, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { useUserStore } from '~/stores/user';
	import { useLoading } from 'vue-loading-overlay';
	import { useToast } from 'vue-toastification';
	import { LOADING_OPTION } from '~/constants/loading.const';
	import { SECRET_TOKEN_KEY } from '~/constants/common.const';

	const config = useRuntimeConfig();
	const url = config.public.apiURL;
	const credentials = reactive({email: '', password: ''});
	const validationRules = computed(() => {
		return {
			email: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				email: helpers.withMessage('Email không hợp lệ', email),
			},
			password: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				minLength: helpers.withMessage('Trường này không được ít hơn 6 ký tự', minLength(6)),
			},
		};
	});
	const validation = useVuelidate(validationRules, credentials);

	async function login() {
		validation.value.$validate();
		if(validation.value.$invalid) return;
		const $loading = useLoading(LOADING_OPTION);
		const loader = $loading.show();

		try {
			const userStore = useUserStore();
			await userStore.signIn(credentials)
			navigateTo('/');
		} catch (_) {
			const $toast = useToast();
			$toast.error('Đăng nhập thất bại');
		} finally {
			loader.hide();
		}
	}

	async function loginWithFacebook() {
		window.addEventListener("storage", handleToken, false);
		window.open(`${url}/auth/facebook`, '_blank');
	}

	async function loginWithGoogle() {
		window.addEventListener("storage", handleToken, false);
		window.open(`${url}/auth/google`, '_blank');
	}

	async function handleToken(e: StorageEvent) {
		if(e.key !== SECRET_TOKEN_KEY) return;
		const value = localStorage.getItem(SECRET_TOKEN_KEY);
		const $loading = useLoading(LOADING_OPTION);
		const loader = $loading.show();

		if(value) {
			try {
				const secretToken = JSON.parse(value)
				const userStore = useUserStore();
				await userStore.signInWithToken(secretToken)
				navigateTo('/');
			} catch (_) {}
		}

		loader.hide();
		window.removeEventListener("storage", handleToken);
		localStorage.removeItem(SECRET_TOKEN_KEY)
	}

</script>

<template>
	<main class="flex mt-30 justify-center items-center text-gray-900">
		<section class="space-y-8" >
			<h2 class="text-center text-4xl font-bold">Đăng Nhập</h2>

			<form @submit.prevent="login()"
					class="shadow-md p-8 space-y-6 rounded-md sm:w-96 w-[22rem] text-sm">
				<div >
					<label class="font-medium" for="email">Email</label>
					<input id="email"
							v-model="credentials.email"
							@change="validation.email.$touch"
							class="block w-full py-1.5 px-2 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.email.$error}"
							type="email">
					<span class="text-xs text-red-500" v-if="validation.email.$error">
						{{ validation.email.$errors[0].$message }}
					</span>
				</div>

				<div>
					<label class="font-medium" for="password">Mật khẩu</label>
					<input id="password"
							v-model="credentials.password"
							@change="validation.password.$touch"
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.password.$error">
						{{ validation.password.$errors[0].$message }}
					</span>
				</div>

				<!-- <div class="flex justify-between items-center">
					<fieldset class="space-x-2">
						<input id="isRememberPassword" class="border border-gray-300 rounded-md" type="checkbox">
						<label for="isRememberPassword">Ghi nhớ đăng nhập</label>
					</fieldset>
					<button class="text-indigo-600 hover:text-indigo-700">
						Quên mật khẩu?
					</button>
				</div> -->

				<button type="submit"
						:disabled="!validation.$dirty || validation.$invalid"
						class="block border-0 outline-0 w-full text-white bg-red-500 rounded-md py-2 disabled:opacity-60">
					Đăng Nhập
				</button>

				<div class="flex items-center text-gray-500">
					<hr class="flex-1">
					<h3 class="px-2 m-0 text-gray-500">Đăng nhập với</h3>
					<hr class="flex-1">
				</div>

				<div class="grid grid-cols-2 gap-4">
					<button type="button"
							@click="loginWithFacebook()"
							class="text-gray-500 hover:text-blue-500 hover:shadow py-2 border border-gray-300 rounded-md flex items-center justify-center">
						<svg class="h-6" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_88_398)">
								<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M20.8334 10C20.8334 4.477 16.3564 0 10.8334 0C5.31037 0 0.833374 4.477 0.833374 10C0.833374 14.991 4.49037 19.128 9.27137 19.878V12.891H6.73137V10H9.27137V7.797C9.27137 5.291 10.7634 3.907 13.0484 3.907C14.1424 3.907 15.2864 4.102 15.2864 4.102V6.562H14.0264C12.7834 6.562 12.3964 7.333 12.3964 8.124V10H15.1694L14.7264 12.89H12.3964V19.878C17.1764 19.128 20.8334 14.991 20.8334 10Z"/>
							</g>
							<defs>
								<clipPath id="clip0_88_398">
									<rect width="20" height="20" fill="white" transform="translate(0.833374)"/>
								</clipPath>
							</defs>
						</svg>

					</button>
					<button type="button"
							@click="loginWithGoogle()"
							class="text-gray-500 hover:text-red-700 hover:shadow py-2 border border-gray-300 rounded-md flex items-center justify-center">
						<svg class="h-6"  viewBox="0 0 21 18"  xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_31_2922)">
								<path fill="currentColor" d="M13.2008 9.11864C13.2008 10.3573 12.9418 11.4604 12.4237 12.4281C11.9056 13.3957 11.1672 14.152 10.2085 14.6969C9.24978 15.2417 8.15111 15.5142 6.9125 15.5142C6.02522 15.5142 5.17666 15.3415 4.36679 14.9961C3.55693 14.6507 2.86021 14.1862 2.27664 13.6026C1.69306 13.0191 1.22858 12.3224 0.8832 11.5125C0.537819 10.7026 0.365128 9.85406 0.365128 8.96679C0.365128 8.07952 0.537819 7.23095 0.8832 6.42109C1.22858 5.61123 1.69306 4.91451 2.27664 4.33093C2.86021 3.74735 3.55693 3.28288 4.36679 2.93749C5.17666 2.59211 6.02522 2.41942 6.9125 2.41942C8.61559 2.41942 10.0775 2.99109 11.2983 4.13442L9.52073 5.84049C8.82401 5.16759 7.9546 4.83114 6.9125 4.83114C6.18005 4.83114 5.50268 5.01574 4.8804 5.38494C4.25812 5.75414 3.76535 6.25584 3.40211 6.89003C3.03886 7.52423 2.85724 8.21648 2.85724 8.96679C2.85724 9.7171 3.03886 10.4094 3.40211 11.0435C3.76535 11.6777 4.25812 12.1794 4.8804 12.5486C5.50268 12.9178 6.18005 13.1024 6.9125 13.1024C7.40675 13.1024 7.86081 13.034 8.27467 12.897C8.68853 12.76 9.02945 12.5888 9.29742 12.3834C9.56539 12.1779 9.79912 11.9442 9.9986 11.6822C10.1981 11.4202 10.344 11.1731 10.4363 10.9408C10.5286 10.7086 10.5926 10.4883 10.6283 10.2798H6.9125V8.0289H13.0936C13.1651 8.40406 13.2008 8.7673 13.2008 9.11864ZM20.9451 8.0289V9.90468H19.0783V11.7715H17.2025V9.90468H15.3356V8.0289H17.2025V6.16205H19.0783V8.0289H20.9451Z"/>
							</g>
							<defs>
								<clipPath id="clip0_31_2922">
									<rect width="20.58" height="17" fill="currentColor" transform="matrix(1 0 0 -1 0.365128 17.623)"/>
								</clipPath>
							</defs>
						</svg>
					</button>
				</div>
			</form>

			<div class="flex justify-center">
				<h3>Chưa có tài khoản? <a href="/sign-up" class="cursor-pointer text-red-500 font-bold">Đăng ký</a></h3>
			</div>
		</section>
	</main>
</template>

<style>
html {
	font-size: 16px !important;
}

button:focus {
	outline: none;
}

</style>