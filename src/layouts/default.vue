<template>
  <div>
    <app-header />
    <router-view/>
    <settings />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import Settings from '@/components/Settings'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader,
    Settings,
    AppFooter,
  }
}
</script>