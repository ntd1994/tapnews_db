<template>
  <section class="content-master-layout section-wrapper" style="background-color: #f0f1f4;">
    <div class="element-container">
      <div class="row">
        <div class="col-lg-9 col-md-12" style="background-color: #f0f1f4;">
          <div class="breadcrumb-custom">
            <slot name="breadcrumb"/>
          </div>
          <slot name="left-side" />
        </div>
        <div class="col-lg-3 col-md-12">
          <slot name="right-side" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.content-master-layout .breadcrumb-custom {
  margin-bottom: 30px;
}
</style>