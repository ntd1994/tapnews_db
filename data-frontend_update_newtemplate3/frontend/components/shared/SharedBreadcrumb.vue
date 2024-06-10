<template>
  <div class="cus-breadcrumb category-header" :class="small ? 'small' : ''">
    <ul class="news-breadcrumb" style="display: flex;gap: 10px;flex-wrap: wrap;">
      <template v-if="breadcrumbs && breadcrumbs.length">
        <li class="news-breadcrumb-item" v-for="(breadcrumb, breadcrumbIndex) in breadcrumbs" :key="breadcrumbIndex">
          <template v-if="breadcrumbIndex === breadcrumbs.length - 1">
            <span class="news-breadcrumb-title last" style="margin-right:10px">{{ breadcrumb.title }}</span>
          </template>
          <template v-else>
            <span class="news-breadcrumb-title news-breadcrumb-url" :class="{
              'max-w-100': breadcrumbIndex === 1,
              'red': small
            }" style="margin-right:10px">
              {{ breadcrumb.title }}
            </span>
          </template>
          <template v-if="breadcrumbIndex < breadcrumbs.length - 1">
            <span>/</span>
          </template>
        </li>
      </template>
    </ul>
    <div v-if="category" class="category-name" style="text-transform: capitalize;">
      <h2 style="margin-bottom: 0;">Category: </h2>
      <h2 style="margin-bottom: 0;text-transform: capitalize">{{ category }}</h2>
    </div>
    <div v-if="tabs.length > 0" class="tag-area">
      <button v-for="tab in tabs" :key="tab.slug" class="item" :class="tab.slug === query.categorySlug && 'active'"
        @click="handleClick(tab)">{{ tab.name }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "nuxt/app";

const emit = defineEmits(['onTabClick'])
const $route = useRoute();
const query = $route.query;

interface IBreadcrumbItem {
  title: string
  utl: string
}
interface ICategory {
  slug: string,
  name: string
}
interface Props {
  breadcrumbs: IBreadcrumbItem[],
  steps?: Number,
  category?: string,
  small?: boolean,
  showTabs?: boolean,
  tabs?: ICategory[]
}
withDefaults(defineProps<Props>(), {
  breadcrumbs: [],
  steps: 2,
  small: false,
  showTabs: false,
  tabs: []
})

const handleClick = (tab: ICategory) => {
  emit('onTabClick', tab)
}

</script>

<style>
.category-header {
  position: relative;
  padding: 30px;
  background: #fff;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .08);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .08);
}

.category-header.small {
  padding: 10px;
}

.category-header.small .news-breadcrumb-title.last {
  color: red
}

.news-breadcrumb {
  color: #A9A9AA;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.news-breadcrumb-title {
  color: #A9A9AA;
  text-transform: capitalize
}

.news-breadcrumb-item:hover .news-breadcrumb-link.news-breadcrumb-url {
  color: #A9A9AA !important;
  text-decoration: underline;
}

.category-name {
  margin-top: 15px;
  display: flex;
  gap: 5px;
  align-items: center
}

.cus-breadcrumb .tag-area {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.cus-breadcrumb .tag-area .item {
  font-size: 13px;
  color: #232323;
  background: #e9e9e9;
  display: block;
  line-height: 22px;
  padding: 2px 11px;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -ms-border-radius: 2px;
  width: fit-content;
  border: none;
  outline: none;
}

.cus-breadcrumb .tag-area .item.active {
  color: #d72924;
  border: 1px solid #d72924;
}

@media only screen and (max-width:991.9px) {
  .category-header {
    padding: 15px;
  }
}
</style>
