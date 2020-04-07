import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{//this.$store.state.xx
		hasPlay:false,
		musicList:[],
		currentMusicIndex:-1
	},
	mutations:{//this.$store.commit('functionName',args)
		togglePlay(state){
			state.hasPlay = !state.hasPlay
		},
		getList(state,list){
			state.musicList = list;
		},
		currentId(state,index = 0){
			state.currentMusicIndex = index
			console.log(state.currentMusicIndex)
		}
	},
	getters:{//this.$store.getters.xx
		
	},
	actions:{
		
	}
})

export default store	