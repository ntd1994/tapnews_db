<script setup lang="ts">
	import { navigateTo, useNuxtApp } from 'nuxt/app';
	import { computed, reactive } from 'vue';
	import { required, sameAs, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { useLoading } from 'vue-loading-overlay';
	import { LOADING_OPTION } from '~/constants/loading.const';
	import { useToast } from 'vue-toastification';


	const credentials = reactive({currentPassword: '', newPassword: '', confirmPassword: ''});
	const validationRules = computed(() => {
		return {
			currentPassword: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
			},
			newPassword: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				minLength: helpers.withMessage('Trường này không được ít hơn 6 ký tự', minLength(6)),
			},
			confirmPassword: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				sameAs: helpers.withMessage("Mật khẩu không khớp", sameAs(credentials.newPassword)),
			},
		};
	});
	const validation = useVuelidate(validationRules, credentials);

	async function changePassword() {
		validation.value.$validate();
		if(validation.value.$invalid) return;

		const $loading = useLoading(LOADING_OPTION)
		const loader = $loading.show();
		const $toast = useToast();
		try {
			const { $api } = useNuxtApp();
			await $api.user.changePassword(credentials);
			$toast.success('Cập nhật thành công');
			navigateTo('/');
		} catch (_) {
			$toast.error('Cập nhật thất bại');
		} finally {
			loader.hide();
		}
	}

</script>

<template>
	<main class="mt-30 mb-50 flex justify-center items-center text-gray-900">
		<section class="space-y-8" >
			<h2 class="text-center text-4xl font-bold">Thay Đổi Mật Khẩu</h2>

			<form @submit.prevent="changePassword()"
					class="shadow-md p-8 space-y-6 rounded-md sm:w-96 w-[22rem] text-sm">
				<div>
					<label class="font-medium" for="password">Mật khẩu hiện tại</label>
					<input id="password"
							v-model="credentials.currentPassword"
							@change="validation.currentPassword.$touch"
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.currentPassword.$error">
						{{ validation.currentPassword.$errors[0].$message }}
					</span>
				</div>

				<div>
					<label class="font-medium" for="confirmPassword">Mật khẩu mới</label>
					<input id="confirmPassword"
							v-model="credentials.newPassword"
							@change="validation.newPassword.$touch"
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.newPassword.$error}"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.newPassword.$error">
						{{ validation.newPassword.$errors[0].$message }}
					</span>
				</div>

                <div>
					<label class="font-medium" for="confirmPassword">Xác nhận khẩu</label>
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
					Cập nhật
				</button>
			</form>

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