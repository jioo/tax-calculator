<template>
  <div>
    <app-header />
      <router-view/>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<style lang="scss">
  .header-style {
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    overflow-y: hidden;
  }

  h4, h5 {
    color: $global-secondary-background
  }
</style>