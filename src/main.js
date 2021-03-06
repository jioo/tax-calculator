import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './registerServiceWorker'
import './plugins'
import './prototypes'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

// https://github.com/chrisvfritz/prerender-spa-plugin#tips--troubleshooting
document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

/**
 * Use Passive Event Listeners to Improve Scrolling Performance
 * 
 * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 * https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners
 */
let supportsPassive = false
// Test via a getter in the options object to see if the passive property is accessed
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true
    }
  })
  window.addEventListener("testPassive", null, opts)
  window.removeEventListener("testPassive", null, opts)
} catch (e) {}

// Use our detect's results. passive applied if supported, capture will be false either way.
document.addEventListener('touchstart touchmove wheel mousewheel', function(e) {
  e.preventDefault()  // does nothing since the listener is passive
}, supportsPassive ? { passive: true } : false) 