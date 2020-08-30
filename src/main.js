import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue();

import VueDragscroll from 'vue-dragscroll'
Vue.use(VueDragscroll)

new Vue({
  render: h => h(App),
}).$mount('#app')
