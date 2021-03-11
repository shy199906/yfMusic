import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // musicID: 0,
        // isPlay: true
        // 歌曲列表
        musicList: [],
        keywords: '',
        //循环数组,
        forList: [],
        //播放按钮,
        playbutton: false,
        picImg:null

    },
    mutations: {
        // getMusicID(state,ID) {
        //     state.musicID = ID
        // }
        musicList(state, musicList) {
            state.musicList = []
            state.musicList=musicList
            console.log(state.musicList)
        },
        keyname(state,ID) {
            state.keywords = ID
        },
        forList(state, arr) {
            state.forList = arr 
        },
        playbutton(state,Boolean) {
            state.playbutton = Boolean
        },
        picImg(state,url) {
            state.picImg = url
        }
    },
    actions: {},
    modules: {}
})