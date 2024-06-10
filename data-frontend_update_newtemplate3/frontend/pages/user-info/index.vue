<script setup lang="ts">
	import { computed, reactive } from 'vue';
	import { required, email, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { useUserStore } from '~/stores/user';
	import { useLoading } from 'vue-loading-overlay';
	import { LOADING_OPTION } from '~/constants/loading.const';
	import { useToast } from 'vue-toastification';
	import { useNuxtApp } from 'nuxt/app';

	const {user} = useUserStore();
	const userToUpdate = reactive({name: user.name, email: user.email});
	const validationRules = computed(() => {
		return {
			name: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
			},
			email: {
				required: helpers.withMessage('Trường này là bắt buộc', required),
				email: helpers.withMessage('Email không hợp lệ', email),
			},
		};
	});
	const validation = useVuelidate(validationRules, userToUpdate);

	async function updateUser() {
		validation.value.$validate();
		if(validation.value.$invalid) return;

		const $loading = useLoading(LOADING_OPTION)
		const loader = $loading.show();
		const $toast = useToast();
		try {
			const { $api } = useNuxtApp();
			await $api.user.updateUser(userToUpdate);
			$toast.success('Cập nhật thành công');
			user.name = userToUpdate.name;
			user.email = userToUpdate.email;
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
			<h2 class="text-center text-4xl font-bold">Thông Tin Người Dùng</h2>

			<form @submit.prevent="updateUser()"
					class="shadow-md p-8 space-y-6 rounded-md sm:w-96 w-[22rem] text-sm">
				<div >
					<label class="font-medium" for="name">Họ và tên</label>
					<input id="name"
							v-model="userToUpdate.name"
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
							v-model="userToUpdate.email"
							@change="validation.email.$touch"
							class="block w-full py-1.5 px-2 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.email.$error}"
							type="email">
					<span class="text-xs text-red-500" v-if="validation.email.$error">
						{{ validation.email.$errors[0].$message }}
					</span>
				</div>

				<button type="submit"
						:disabled="!validation.$anyDirty || validation.$invalid"
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