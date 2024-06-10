<script setup lang="ts">
import { computed } from 'vue';

const breadcrumbs = computed(() => {
  
  let _breadcrumbs = []
   _breadcrumbs.push({ url: '/', title: 'Home' });
   _breadcrumbs.push({ url: ``, title: 'Rao vặt - Tạo bài viết' });
  return _breadcrumbs
})
</script>

<template>
  <section class="category-page section-wrapper" style="background-color: #f0f1f4;">
    <div class="element-container">
      <div class="row">
        <div class="col-lg-9 col-md-12">
          <SharedBreadcrumb :breadcrumbs="breadcrumbs"/>
          <div style="margin-top: 30px;">
            <SharedNewsHeader :header="'Tạo bài viết'"/>
          </div>
          <raoVatForm />
        </div>

        <div class="col-lg-3 col-md-12">
          <SidebarRaoVat />
          <SidebarMostView :pagesize="10"/>
          <SidebarAd />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.slider-wrapper {
  border: 1px solid #D1D5DB;
  padding: 12px 16px;
  width: 100%;
  border-radius: 4px;
}

.slider {
  display: flex;
  gap: 16px;
  height: 200px;
  overflow: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  .slider-item {
    width: 100%;
    display: inline-block;
    flex-shrink: 0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.slides::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.slides::-webkit-scrollbar-track {
  background: transparent;
}

@media (min-width: 768px) {
  .slider {
    .slider-item {
      width: 35%;
    }
  }
}

@media (min-width: 992px) {
  .slider {
    .slider-item {
      width: 25%;
    }
  }
}

.contact-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.contact-card h2 {
  color: #e53935;
  text-align: center;
  margin-bottom: 20px;
}

.contact-card p {
  font-size: 16px;
  word-wrap: break-word;
}

.contact-card p strong {
  font-weight: bold;
}

.contact-card a {
  color: #17a2b8;
}

.breadcrumbs-content {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.render-html>article ol {
  display: block;
  list-style-type: decimal;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
}

.render-html>article ul {
  display: block;
  list-style-type: disc;
  margin-top: 1em;
  margin-bottom: 1 em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
}

.render-html>article li {
  display: list-item;
}

.render-html>article ul li {
  list-style-type: none;
}

.render-html>article ul li::before {
  content: "\2022";
  margin-right: 0.5em;
}

.render-html>article ul li.ql-indent-1::before {
  content: "\26AC";
  margin-right: 0.5em;
}

.render-html>article ul li.ql-indent-2::before {
  content: "◾";
  margin-right: 0.5em;
}

.render-html>article blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

.render-html>article pre {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
  border-radius: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
}

.render-html>article :deep(.ql-indent-1) {
  padding-left: 3rem;
}

.render-html>article :deep(.ql-indent-2) {
  padding-left: calc(2 * 3rem);
}

.render-html>article :deep(.ql-indent-3) {
  padding-left: calc(3 * 3rem);
}

.render-html>article :deep(.ql-indent-4) {
  padding-left: calc(4 * 3rem);
}

.render-html>article :deep(.ql-indent-5) {
  padding-left: calc(5 * 3rem);
}

.render-html>article :deep(.ql-indent-6) {
  padding-left: calc(6 * 3rem);
}

.render-html>article :deep(.ql-indent-7) {
  padding-left: calc(7 * 3rem);
}

.render-html>article :deep(.ql-indent-8) {
  padding-left: calc(8 * 3rem);
}

.render-html>article :deep(.ql-align-right) {
  text-align: right;
}

.render-html>article :deep(.ql-align-center) {
  text-align: center;
}

.render-html>article :deep(.ql-align-justify) {
  text-align: justify;
}

.render-html>article h1 {
  font-size: calc(2 * 16px);
  line-height: calc(2 * 16px);
  margin-top: calc(0.67 * 16px);
  margin-bottom: calc(0.67 * 16px);
  font-weight: 600;
}

.render-html>article h2 {
  font-size: calc(1.5 * 16px);
  line-height: calc(1.5 * 16px);
  margin-top: calc(0.83 * 16px);
  margin-bottom: calc(0.83 * 16px);
  font-weight: 600;
}

.render-html>article h3 {
  font-size: calc(1.17 * 16px);
  line-height: calc(1.17 * 16px);
  margin-top: calc(1 * 16px);
  margin-bottom: calc(1 * 16px);
  font-weight: 600;
}

.render-html>article h4 {
  font-size: calc(1 * 16px);
  line-height: calc(1 * 16px);
  margin-top: calc(1.33 * 16px);
  margin-bottom: calc(1.33 * 16px);
  font-weight: 600;
}

.render-html>article h5 {
  font-size: calc(0.83 * 16px);
  line-height: calc(0.83 * 16px);
  margin-top: calc(1.67 * 16px);
  margin-bottom: calc(1.67 * 16px);
  font-weight: 600;
}

.render-html>article h6 {
  font-size: calc(0.67 * 16px);
  line-height: calc(0.67 * 16px);
  margin-top: calc(2.33 * 16px);
  margin-bottom: calc(2.33 * 16px);
  font-weight: 600;
}

.render-html>article p {
  display: block;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  margin-left: 0;
  margin-right: 0;
}

.render-html>article hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}

.render-html>article img {
  display: inline-block;
}

.render-html>article strong {
  font-weight: bolder !important;
}

.render-html>article sub {
  vertical-align: super;
  font-size: smaller;
}

.render-html>article a {
  text-decoration: underline;
  color: #3851e5;
}
</style>
