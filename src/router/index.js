import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',//路由默认匹配
    name: 'Recommend',
    component: Recommend,
    meta:{showNav:true}
  },
  {
    path: "/HotMusic",
    name: "HotMusic",
    component: () => import('../views/HotMusic.vue'),
    meta:{showNav:true}
  },
  {
    path: "/HotMusic/:num",
    name: "HotMusic",
    component: () => import('../views/HotMusic.vue'),
    meta:{showNav:true}
  },
  {
    path: "/MusicList/:musicid",
    name: "MusicList",
    component: () => import('../views/MusicList.vue'),
    meta: {
      showNav: false,
    }
  },
  {
    path: "/SingerList",
    name: "SingerList",
    component: () => import('../views/SingerList.vue'),
    meta: {
      showNav: true,
    },
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import('../views/Search.vue'),
    meta: { showNav: true },
  },
  {
    path: "/SingerDetails/:SingerID",
    name: "SingerDetails",
    component: () => import('../views/SingerDetails.vue'),
    meta: { showNav: false },
  },
  {
    path: "/AlbumList/:AlbumID",
    name: "AlbumList",
    component: () => import('../views/AlbumList.vue'),
    meta: { showNav: false },
  },
  {
    path: "/TopComments/:musicid",
    name: "TopComments",
    component: () => import('../components/TopComments.vue'),
    meta: { showNav: false },
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
