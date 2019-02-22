import Vue from 'vue'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons);

Plugin.install = function (Vue, options) {
  Vue.UIkit = UIkit
  window.UIkit = UIkit
  Object.defineProperties(Vue.prototype, {
    $UIkit: {
      get() {
        return UIkit
      }
    },
  })
}

Vue.use(Plugin)
export default Plugin