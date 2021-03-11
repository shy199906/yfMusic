import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'


import {
  Button,
  Slider
} from 'vant'; 


Vue
  .use(Button)
  .use(Slider)


Vue.config.productionTip = false
let playingMusic = {
  musicID: 0,
  isPlay: false,
  playList: [],
}

new Vue({
  router,
  store,
  data: {
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
