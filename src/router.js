import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
