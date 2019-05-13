import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './registerServiceWorker'
import './plugins'
import './prototypes'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

/**
 * https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners
 * https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners
 */
document.addEventListener('touchstart', function(e) {
  e.preventDefault();  // does nothing since the listener is passive
}, { passive: true })

// https://github.com/chrisvfritz/prerender-spa-plugin#tips--troubleshooting
document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})