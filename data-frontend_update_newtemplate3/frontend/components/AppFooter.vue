<template>
  <footer>
    <div class="footer-area-top">
      <div class="element-container">
        <div class="row" style="max-width: 882px">
          <div class="col-xl-6 col-sm-12">
            <div class="footer-box">
              <h2 class="title-bold-light title-bar-left text-uppercase">Về chúng tôi</h2>
              <div class="row">
                <div class="col-12">
                  <a href="/" class="footer-logo img-fluid">
                    <nuxt-img style="height: 70px;" src="/img/ori_logo_tinnongtoday.png" alt="Tin Nóng Today logo"
                      class="img-fluid" />
                  </a>
                </div>
                <div class="col-12 mt-5 text-white">
                  <!-- <p>Đơn vị chủ quản: Công ty TNHH Tư vấn Truyền thông Đại Thế Giới</p>
                  <p>Chịu trách nhiệm nội dung: Lý Mỹ Tiên</p>
                  <p>Add: A12A.08, Tầng 12A, Block A thuộc Khu cao ốc văn phòng và Căn hộ chung cư 5B đường Phổ Quang, Phường 2, Quận Tân Bình, Thành Phố Hồ Chí Minh, Việt Nam</p>
                  <p>Tel: 028.62.701.030</p>
                  <p>Email: megaworldcons@gmail.com </p> -->
                </div>

                <div class="col-12">
                  <ul class="footer-social">
                    <li>
                      <a :href="config.facebookUrl" class="text-white" title="facebook">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="config.twitterUrl" class="text-white" title="twitter">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="config.googleUrl" class="text-white" title="google-plus">
                        <i class="fa fa-google-plus" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="config.linkedinUrl" class="text-white" title="linkedin">
                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="text-white" title="pinterest">
                        <i class="fa fa-pinterest" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="text-white" title="rss">
                        <i class="fa fa-rss" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="text-white" title="vimeo">
                        <i class="fa fa-vimeo" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-sm-12" v-if="false">
            <div class="footer-box">
              <h2 class="title-bold-light title-bar-left text-uppercase">TAGS</h2>
              <ul class="popular-categories">
                <li v-for="tag in tags?.data">
                  <a href="#">{{ tag.name }}
                    <span>{{ tag.count }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div class="footer-area-bottom" style="border-top: 1px solid #B9B9B9;">
        <div class="element-container">
          <div class="row">
            <div class="col-8">
              <!-- <p class="m-0 text-white">Copyright © 2015-23 Tin Nóng Today</p> -->
            </div>
            <div class="page-links col-4 d-flex justify-content-end gap-4">
              <a class="text-white" href="/">Trang Chủ</a>
              <a class="text-white" href="/">Liên Hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useFetch, useRoute, useRuntimeConfig } from "nuxt/app";
const $config = useRuntimeConfig();
const $route = useRoute();
const { data: tags } = await useFetch<{ data: { name: string, count: number }[] }>("/api/tags", {
  baseURL: $config.public.apiURL
});


const { data: config } = await useFetch<any>
  ("/api/config", { baseURL: $config.public.apiURL });
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}

.page-links>a {
  color: white
}

.page-links>a:hover {
  color: #e53935;
}
</style>