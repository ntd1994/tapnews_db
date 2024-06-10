<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import moment from 'moment';
import { navigateTo, useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '~/stores/user';
interface SelectOption {
    value: string
    label: string
}
const $config = useRuntimeConfig();
const categories = ref<SelectOption[]>([])
const { token } = useUserStore();

const title = ref()
const categoryId = ref()
const publishDate = ref(new Date())
const facebook = ref()
const status = ref('draft')
const contactName = ref()
const phoneNumber = ref()
const metaKey = ref()
const website = ref()
const email = ref()
const address = ref()
const description = ref()
const content = ref()
const image = ref()
const fileToSave = ref()
let isFirstSubmit = ref(false)

let rawExtraImagePaths: string[] = [];
const addedExtraImageFiles = ref<File[]>([])
const extraImages = ref<{
    src: string,
    indexInAddedImages?: number,
}[]>([])

const statusOptions = ref<SelectOption[]>([
    { value: 'draft', label: 'Bản nháp' },
    { value: 'publish', label: 'Công bố' }
])

const resetForm = () => {
  title.value = ''
  categoryId.value = categories.value?.[0]?.value
  publishDate.value = new Date()
  facebook.value = ''
  contactName.value = ''
  phoneNumber.value = ''
  metaKey.value = ''
  website.value = ''
  email.value = ''
  address.value = ''
  description.value = ''
  content.value = ''
  image.value = ''
  fileToSave.value = ''
  rawExtraImagePaths = []
  addedExtraImageFiles.value = []
  extraImages.value = []
}

const onSelectedFile = async (files: File[]) => {
  if (files.length > 0) {
    if (files?.[0]) {
      const formData = new FormData();
      formData.append('image', files?.[0])
      formData.append('type', 'rao-vat')
      const [imageUrl] = await Promise.all([
        uploadFile(formData),
      ])

      image.value = !imageUrl.includes($config.public.apiURL as string) ? `${$config.public.apiURL}${imageUrl.replaceAll('\\', '/')}` : imageUrl
      fileToSave.value = imageUrl
    }
  }
}

const onRemoveImage = () => {
  image.value = undefined
  fileToSave.value = undefined
}

const extractFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
}

const removeExtraImage = (index: number) => {
    const extraImage = extraImages.value[index];
    if (extraImage.indexInAddedImages) {
        addedExtraImageFiles.value.splice(extraImage.indexInAddedImages, 1);
    } else {
        const filename = extractFileNameFromUrl(extraImage.src)
        const rawPathIndex = rawExtraImagePaths.findIndex(x => x.includes(filename))
        if (rawPathIndex > -1) {
            rawExtraImagePaths.splice(rawPathIndex, 1);
        }
    }
    extraImages.value.splice(index, 1);
}

const onSelectExtraImages = (files: FileList) => {
    if (files.length > 0) {
        const addedImagesLengthBeforePushing = addedExtraImageFiles.value.length;
        addedExtraImageFiles.value.push(...files);
        for (let index = 0; index < files.length; index++) {
            extraImages.value.push({
                src: URL.createObjectURL(files[index]),
                indexInAddedImages: addedImagesLengthBeforePushing + index,
            })
        }
    }
}

const uploadExtraImages = async () => {
  const formData = new FormData();
  addedExtraImageFiles.value.forEach(x => formData.append("images", x))
  return await uploadFiles('rao-vat', formData);
}

const submitRaoVats = async () => {
  isFirstSubmit.value = true
  if (
    !title.value ||
    !categoryId.value ||
    !content.value ||
    !publishDate.value
  ) {
    return
  }

  let addedExtraImagePaths:any = [];
  if(addedExtraImageFiles.value.length > 0) {
    addedExtraImagePaths = await uploadExtraImages()
  }

  const raoVatRequest = {
    categoryId: categoryId.value,
    content: content.value,
    id: undefined,
    publishDate: moment(publishDate.value).local().toDate(),
    title: title.value,
    imageUrl: image.value && fileToSave.value ? fileToSave.value : '',
    extraImages: [...rawExtraImagePaths, ...addedExtraImagePaths],
    facebook: facebook.value || '',
    phoneNumber: phoneNumber.value || '',
    metaKeyword: metaKey.value || '',
    contactName: contactName.value || '',
    websiteUrl: website.value || '',
    address: address.value || '',
    email: email.value || '',
    description: description.value || '',
    status: status.value
  }

  await createRaoVat(raoVatRequest)
    .then(() => {
        isFirstSubmit.value = false
        resetForm()
        alert('Tạo bài viết thành công!')
    })
}

const createRaoVat = async (request: any) => {
    await $fetch(`/api/admin-console/rao-vat`, {
        baseURL: $config.public.apiURL as string,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: request
  })
}

const fetchCategories = async () => {
    const { data } = await $fetch(`/api/admin-console/select/categories/raovat`, {
        baseURL: $config.public.apiURL as string,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
  }).catch((error: any) => {
    if (error?.response?.status === 401) {
        navigateTo('/sign-in')
    }
  })
  categories.value = data
  categoryId.value = data?.[0]?.value
}

const uploadFile = async (file: FormData) => {
    const imageURL = await $fetch(`/api/upload`, {
        baseURL: $config.public.apiURL as string,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: file
  })

  return imageURL as string
}

const uploadFiles = async (type: string, files: FormData) => {
    return await $fetch(`/api/upload/${type}`, {
        baseURL: $config.public.apiURL as string,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: files
  }) as any[]
}

onMounted(async () => {
    await fetchCategories()
})
</script>

<template>
    <div class="rao-vat-submit mt-30">
        <form id="rao-vat-submit">
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="title" placeholder="Tiêu đề*" class="form-control" type="text">
                        <div class="help-block with-errors text-danger" v-if="!title && isFirstSubmit">Vui lòng
                            nhập tiêu đề của bạn </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <select v-model="status" class="form-select mb-3" aria-label="Large select example">
                            <option :value="option.value" v-for="option in statusOptions">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <select v-model="categoryId" class="form-select mb-3" aria-label="Large select example">
                            <option :value="category.value" v-for="category in categories">
                                {{ category.label }}
                            </option>
                        </select>
                        <div class="help-block with-errors text-danger" v-if="!categoryId && isFirstSubmit">Vui lòng
                            chọn thể loại </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <VueDatePicker v-model="publishDate" placeholder="Ngày xuất bản" text-input :required="true"
                            format="dd/MM/yyyy HH:mm" :clearable="true" :auto-apply="true" />
                        <div class="help-block with-errors text-danger" v-if="!publishDate && isFirstSubmit">Vui lòng
                            chọn ngày xuất bản </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="facebook" placeholder="Facebook*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="contactName" placeholder="Tên người liên hệ*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="phoneNumber" placeholder="Số điện thoại*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="metaKey" placeholder="Từ khóa meta*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="website" placeholder="Website*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="email" placeholder="Email*" class="form-control" type="email">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <input v-model="address" placeholder="Địa chỉ*" class="form-control" type="text">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <textarea v-model="description" placeholder="Mô tả*" class="textarea form-control"
                            id="form-message" rows="8" cols="20"></textarea>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <textarea v-model="content" placeholder="Nội dung*" class="textarea form-control"
                            id="form-message" rows="8" cols="20"></textarea>
                        <div class="help-block with-errors text-danger" v-if="!content && isFirstSubmit">Vui lòng
                            nhập nội dung của bạn</div>
                    </div>
                </div>
                <div class="form-group col-12">
                    <div class="flex flex-wrap gap-4">
                        <RaoVatUploadFile v-if="!image" title="Chọn hình ảnh đại diện" @onSelectedFile="onSelectedFile" />

                        <div v-else class="flex flex-row gap-4 w-25">
                            <div class="flex-1">
                                <img :src="image" alt="image" class="h-full w-full object-cover" />
                            </div>
                            <XCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500 " @click="onRemoveImage" />
                        </div>
                    </div>
                    <div class="help-block with-errors text-danger" v-if="!image && isFirstSubmit">Vui lòng
                        chọn hình ảnh đại diện</div>
                </div>
                <div class="col-12">
                    <div class="form-group flex flex-wrap gap-4">
                        <div v-for="(item, index) in extraImages" class="flex gap-1 w-25">
                            <div class="flex-1">
                                <img :src="item.src" alt="image" class="h-full w-full object-cover" />
                            </div>
                            <XCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500 "
                                @click="removeExtraImage(index)" />
                        </div>
                        <RaoVatUploadFile title="Chọn hình ảnh chi tiết" multiple
                            @onSelectedFile="onSelectExtraImages" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group mb-none">
                        <button type="button" @click="submitRaoVats"
                            class="btn-ftg-ptp-45">Gửi</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
