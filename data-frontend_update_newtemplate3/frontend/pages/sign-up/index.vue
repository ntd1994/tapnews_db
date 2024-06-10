<script setup lang="ts">
	import { navigateTo } from 'nuxt/app';
	import { computed, reactive } from 'vue';
	import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { useUserStore } from '~/stores/user';
	import { useLoading } from 'vue-loading-overlay';
	import { LOADING_OPTION } from '~/constants/loading.const';
	import { useToast } from 'vue-toastification';


	const credentials = reactive({name: '', email: '', password: '', confirmPassword: '', userType: 'admin'});
	const validationRules = computed(() => {
		return {
			name: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
			},
			email: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				email: helpers.withMessage('Email không hợp lệ', email),
			},
			password: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				minLength: helpers.withMessage('Trường này không được ít hơn 6 ký tự', minLength(6)),
			},
			confirmPassword: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				sameAs: helpers.withMessage("Mật khẩu không khớp", sameAs(credentials.password)),
			},
		};
	});
	const validation = useVuelidate(validationRules, credentials);

	async function signUp() {
		validation.value.$validate();
		if(validation.value.$invalid) return;

		const $loading = useLoading(LOADING_OPTION)
		const loader = $loading.show();
		try {
			const userStore = useUserStore();
			await userStore.signUp(credentials);
			navigateTo('/');
		} catch (_) {
			const $toast = useToast();
			$toast.error('Đăng ký thất bại');
		} finally {
			loader.hide();
		}
	}

</script>

<template>
	<main class="mt-30 flex justify-center items-center text-gray-900">
		<section class="space-y-8" >
			<h2 class="text-center text-4xl font-bold">Đăng Ký</h2>

			<form @submit.prevent="signUp()"
					class="shadow-md p-8 space-y-6 rounded-md sm:w-96 w-[22rem] text-sm">
				<div >
					<label class="font-medium" for="name">Họ và tên</label>
					<input id="name"
							v-model="credentials.name"
							@change="validation.name.$touch"
							class="block w-full py-1.5 px-2 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.name.$error}"
							type="text">
					<span class="text-xs text-red-500" v-if="validation.name.$error">
						{{ validation.name.$errors[0].$message }}
					</span>
				</div>

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

				<div>
					<label class="font-medium" for="confirmPassword">Mật khẩu</label>
					<input id="confirmPassword"
							v-model="credentials.confirmPassword"
							@change="validation.confirmPassword.$touch"
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.confirmPassword.$error}"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.confirmPassword.$error">
						{{ validation.confirmPassword.$errors[0].$message }}
					</span>
				</div>

				<button type="submit"
						:disabled="!validation.$dirty || validation.$invalid"
						class="block border-0 outline-0 w-full text-white bg-red-500 rounded-md py-2 disabled:opacity-60 hover:bg-red-600">
					Đăng ký
				</button>
			</form>

			<div class="flex justify-center">
				<h3>Đã có tài khoản? <a href="/sign-in" class="cursor-pointer text-red-500 font-bold">Đăng nhập</a></h3>
			</div>
		</section>
	</main>
</template>

<style>
html {
	font-size: 16px;
}
button:focus {
	outline: none;
}
</style>