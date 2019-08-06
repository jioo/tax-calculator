/* eslint-disable no-console */

import { register } from 'register-service-worker'
import Vue from 'vue'

/**
 * UIKit's built in snackbar / notification
 * 
 * @param string message 
 */
const toggleNotif = (message) => {
  Vue.prototype.$UIkit.notification({
    status: 'primary',
    message: message,
    pos: 'top-center',
    timeout: 3000,
  })
}

if (process.env.NODE_ENV === 'production') {

  // // Enable offline google analytics
  // // https://developers.google.com/web/tools/workbox/guides/enable-offline-analytics
  // importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  // workbox.googleAnalytics.initialize();

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      toggleNotif('Content has been cached for offline use.')
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      toggleNotif('New content is available; please refresh.')
      console.log('New content is available; please refresh.')
    },
    offline () {
      toggleNotif('App is running in offline mode.')
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })

}
