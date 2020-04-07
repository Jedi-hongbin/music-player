<template>
	<view class='order'>
		<view class="swiper-tab">
			<view class="swiper-tab-item" v-bind:class="[currentTab==0?'active':'']" data-current="0" @click="clickTab">音乐馆</view>
			<view class="swiper-tab-item" v-bind:class="[currentTab==1 ?'active' : '']" data-current="1" @click="clickTab">播放</view>
			<view class="swiper-tab-item" v-bind:class="[currentTab==2 ?'active' : '']" data-current="2" @click="clickTab">我的音乐</view>
		</view>
		<swiper :style="{'height':swiperHeight+'px'}" class="swiper" :current="currentTab" duration="300" @change="swiperTab">
			<swiper-item>
				<musichall class="component" ref="hall"></musichall>
			</swiper-item>
			<swiper-item>
				<play :msg='footerMsg' class="component" ref="play"></play>
			</swiper-item>
			<swiper-item>
				<musiclist class="component" @control="jiancha" ref="musicList"></musiclist>
			</swiper-item>
		</swiper>
		<view class="footer" :class="[currentTab ==1 ? 'block':'']">
			<view class="img">
				<image id="img" :class="{'imgRoate':operate}" :src="footerMsg[5]"></image>
			</view>
			<view class="context">
				<text class="musicmsg">{{footerMsg[0]}}-{{footerMsg[1]}}</text>
			</view>
			<view class="operate">
				<view class="up_music" @click="upMusic"></view>
				<view class="isPlay" :class="{'is':operate}" @click="toggle"></view>
				<view class="down_music" @click="downMusic"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import musichall from './musichall.vue'
	import play from './play.vue'
	import musiclist from './musiclist.vue'
	import musiclists from './musiclist.js'
	export default {
		data() {
			return {
				currentTab: 0,
				swiperHeight: '',
				operate: false,
				random: false,
				musicList: [],
				index: -1,
				audio: '',
				footerMsg: [],
				temp:0,
				p:0,
				t:0
			}
		},
		created() {
			this.setSwiperHeight()
			this.$store.commit('getList', musiclists.data)
			this.audio = uni.createInnerAudioContext()
			this.audio.autoplay = true;
			for(let s in musiclists.data[0]){
				this.footerMsg.push(musiclists.data[0][s])
			}
		},
		methods: {
			upMusic(){
				this.temp = this.index;
				if(this.temp < 1){
					this.temp = 12
				}
				this.$refs.musicList.play(--this.temp)
			},
			downMusic(){
				this.temp = this.index;
				if(this.temp > 10){
					this.temp = -1
				}
				this.$refs.musicList.play(++this.temp)
			},
			swiperTab(e) {
				this.currentTab = e.target.current;
				this.setSwiperHeight()
			},
			//点击切换
			clickTab(e) {
				if (this.currentTab == e.target.dataset.current) {
					return false;
				} else {
					this.currentTab = e.target.dataset.current;

				};
			},
			setSwiperHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(".component").boundingClientRect();
				query.exec(res => {
					this.swiperHeight = res[0][this.currentTab].height;
				})
			},
			toggle() {
				if (this.audio.src == '') {
					this.$children[2].play(-2)
					this.operate = !this.operate;
					this.$refs.play.playit=true
				} else {
					if (this.audio.paused) {
						this.audio.play()
						this.operate = !this.operate;
						this.$refs.musicList.fack(this.index)
						this.$refs.play.playit=true
						console.log('true')
					} else {
						this.audio.pause()
						this.$refs.musicList.fack()
						this.operate = !this.operate;
						this.$refs.play.playit=false
						console.log('false')
					}
				}
			},
			jiancha(index) {
				if (index == this.index) {
					if (this.audio.paused) {
						this.audio.play()
					} else {
						this.audio.pause()
					}
					this.operate = !this.operate;
				} else {
					this.operate = !this.operate;
					this.$refs.play.playit=true
				}
			},
			playMusic(index) {
				if (index == this.index) {
					if (this.audio.paused) {
						this.audio.play()
						this.$refs.play.playit = true
							console.log("==")
					} else {
						this.audio.pause()
						this.$refs.play.playit = false
						console.log("!==")
					}
				} else {
					this.audio.src = musiclists.data[index].link_url.substring(4);
					this.index = index;
				}
				this.footerMsg = [];
				for(let s in musiclists.data[index]){
					this.footerMsg.push(musiclists.data[index][s])
				}
				this.audio.onTimeUpdate(()=>{
					//获取音乐播放进度百分比
					this.p = (this.audio.currentTime/this.audio.duration) * 100;
					//进度条同步
					this.$refs.play.slideValue = this.p;
					//时间同步
					this.p = parseInt(this.audio.currentTime);
					if(this.p <= 9){
						this.$refs.play.currT = '00:0'+this.p
					}else if(this.p > 9 && this.p < 60){
						this.$refs.play.currT ='00:'+this.p
					}else{
						this.$refs.play.currT = parseInt(this.p / 60).toString().padStart(2,0) + ':' + (this.p - (parseInt(this.p / 60) * 60)).toString().padStart(2,0)
					}
				})
				this.audio.onEnded(()=>{
					this.downMusic()
				})
			}
		},
		components: {
			musichall,
			play,
			musiclist
		},
		watch:{
			
		}
	}
</script>

<style lang="less" scoped>
	@hh :88rpx;

	.block{
		display: none !important;
	}
	.footer {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 99vw;
		background: #63dc63;
		height: 8vh;
		border-top-left-radius: 60rpx;
		display: flex;
		box-sizing: border-box;
		align-items: flex-end;

		.img {
			width: 18vw;
			height: 18vw;
			margin-left: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			border: 2rpx greenyellow solid;

			image {
				width: 90%;
				height: 90%;
				border-radius: 50%;
				animation-duration: 5s;
				animation-timing-function: linear;
				animation-delay: 0s;
				animation-iteration-count: infinite;
			}

			.imgRoate {
				animation-name: roateImg;
			}

			@keyframes roateImg {
				from {
					transform: rotate(0deg)
				}

				to {
					transform: rotate(360deg)
				}
			}
		}

		.context {
			align-self: flex-start;
			max-width: 380rpx;
			margin-left: 8rpx;
			margin-top: 4rpx;
			color: #356c29;

			.musicmsg {
				max-width: 380rpx;
				font-size: small;
			}
		}

		.operate {
			align-self: center;
			display: flex;
			flex-flow: row nowrap;
			position: absolute;
			right: 5rpx;

			view {
				margin: 5rpx;
				width: 6vw;
				height: 6vw;
			}

			.up_music {
				margin-right: 20rpx;
				background: url("../../static/image/player.png") no-repeat 0 -28px;
			}

			.isPlay {
				width: 8vw;
				height: 8vw;
				transform: translateY(-4rpx);
				background: url("../../static/image/player.png")
			}

			.is {
				background: url("../../static/image/player.png") no-repeat -30px 0 !important;
			}

			.down_music {
				background: url("../../static/image/player.png") 0 -50px;
			}
		}
	}

	.swiper-tab {
		width: 100%;
		border-bottom: 2rpx solid #ccc;
		text-align: center;
		height: @hh;
		line-height: 88rpx;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
	}

	.swiper-tab-item {
		width: 30%;
		color: #434343;
		font-size: 28rpx;
	}

	.active {
		color: #00cc00;
		border-bottom: 4rpx solid #00ff00;
	}

	.swiper {
		min-height: 100%;
		max-width: 100vw;
	}
</style>
