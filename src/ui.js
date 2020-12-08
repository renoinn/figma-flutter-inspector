import Vue from 'vue'
import App from './App'
import hljs from 'highlight.js';

Vue.config.productionTip = false

Vue.use(hljs.vuePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
