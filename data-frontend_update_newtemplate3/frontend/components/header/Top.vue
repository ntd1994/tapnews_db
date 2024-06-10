<script setup lang="ts">
import moment from "moment";
import { onMounted, ref } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore()

const interval = ref()
const timeFormat = 'hh:mm:ss A'
const time = ref(moment().format(timeFormat))
const isOpenActionDropdown = ref(false);

const logout = () => {
  useUserStore().logout()
}

onMounted(() => {
  interval.value = setInterval(() => {
    // Concise way to format time according to system locale.
    // In my case this returns "3:48:00 am"
    time.value = moment().format(timeFormat)
  }, 1000)
})
</script>

<template>
  <div class="header-top-bar">
    <div class="top-bar-top" style="background-color:#2c2c2c;">
      <div class="element-container">
        <div class="" style="display: flex; justify-content: space-between">
          <div style="background-color: #00b14f;padding-right: 20px;padding-left: 20px;display: flex;align-items:center">
            <ul class="news-info-list">
              <li>
                <i class="fa fa-calendar" aria-hidden="true"></i>{{ moment().format('DD-MM-YYYY') }}
              </li>
              <li>
                <i class="fa fa-clock-o" aria-hidden="true"></i>{{ time }}
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="news-info-list text-right" style="align-items: center">
              <li>
                <a v-if="!userStore.user?.name" class="sign-in" href="/sign-in">{{ userStore.user?.name || 'Đăng Nhập' }}</a>
                <div v-else class="position-relative text-left">
                  <span class="cursor-pointer sign-in" @click="isOpenActionDropdown = !isOpenActionDropdown"> {{ userStore.user?.name }}</span>
                  <div v-if="isOpenActionDropdown" class="user-action-dropdown rounded">
                      <a href="/user-info">Thông Tin Cá Nhân</a>
                      <a href="/change-password">Đổi Mật Khẩu</a>
                      <a href="/rao-vat/tao-bai-viet">Tạo Bài Viết</a>
                      <hr class="m-0">
                      <div class="logout" @click="logout()">Đăng Xuất</div>
                  </div>
                </div>
              </li>
              <li style="margin-right: -8px">
                <div class="d-flex align-items-center" style="margin-top:2px">
                  <div id="google_translate_element" class="google_translate_element" style="padding-top: 2px"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="banner element-container">
      <div class="bg-body">
        <div class="top-bar-bottom pt-20 pb-20 d-none d-lg-block">
          <div class="row d-flex align-items-center">
            <div class="col-lg-4">
              <div class="logo-area">
                <a href="/" class="img-fluid">
                  <nuxt-img style="height: 50px;" src="/img/ori_logo_tinnongtoday.png" alt="Tin Nóng Today logo" />
                </a>
              </div>
            </div>
            <div class="col-lg-8 col-md-12">
              <div class="">
                <nuxt-img quality="80" format="webp" style="width: 100%;height: 100px;object-fit: cover;"
                  src="/img/banner/banner2.jpg" alt="ad" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

$main-color: #F36C21;

.header-top-bar {
  .top-bar-top {
    .sign-in {
      color: white;
    }

    #google_translate_element {
      .goog-te-combo {
        color: white;
      }
    }

    .news-info-list {
      padding: 3px 0px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      li {
        color: white;
        font-weight: 600;

        i {
          color: white;
        }
      }
    }
  }

  .user-action-dropdown {
    background-color: white;
    position: absolute;
    top: 105%;
    width: 160px;
    z-index: 100;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &>div,
    a {
      display: block;
      padding: 4px 12px;
      cursor: pointer;
      transition: background-color 0.3s;
      color: black;
      font-weight: 400;

      &.logout {
        color: #000;
      }

      &:hover {
        background-color: #0069ff;
        color: #fff;
      }
    }

    @media screen and (max-width: 768px) {
      right: 0rem;
    }
  }
}

@media screen and (max-width:992.9px) {
  .header-top-bar .banner {
    display: none;
  }
}

@media only screen and (max-width:540px) {
  .header .news-info-list.text-right {
    justify-content: end;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>