import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  linkActiveClass: 'uk-active',
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  },

  routes: [
    { 
      path: '/',
      component: () => import('./layouts/default.vue'),
      children: [
        { path: '', name: 'home', component: () => import('./pages/index.vue'), },
        { path: 'calculator', name: 'calculator', component: () => import('./pages/calculator.vue'), },
        { path: 'faq', name: 'faq', component: () => import('./pages/faq.vue'), },
      ]
    },
  ]
})

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
      id: 'UA-113519778-4',
      router
  })
}

export default router
