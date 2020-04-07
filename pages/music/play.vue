<template>
	<view class="panle">
			<view class="picture" :class="{'isShow':isShow}">
				<image :class="{'aniname':playit}" :src="msg[5]"></image>
			</view>
			<view class="inner" :class="{'isShow':isShow}">
				<text class="name">{{msg[0]}}</text>
				<text class="singer">{{msg[1]}}</text>
				<text class="album">{{msg[2]}}</text>
			</view>
		<lyric :off="isShow" ref="lyric" :word="word"></lyric>
		<view class="progress">
			<view class="operate">
				<view class="love" :class="{'isLove':isLove}" @click="love"></view>
				<view class="downLoad"></view>
				<view class="volume"></view>
				<view class="musicWord" @click="lyric"></view>
			</view>
			<view class="slide">
				<slider :value="slideValue" @change="sliderChange" step="1" activeColor="#666" block-size="20" block-color="#000" />
				<view class="musicTime">
					<view class="currentTime">
						<text class="tt">{{currT}}</text>
					</view>
					<view class="talitTime">
						{{msg[3]}}
					</view>
				</view>
			</view>
			<view class="musicoperate">
				<view class="up" @click="up"></view>
				<view>
					<view id="t" class="play" @click="play" :class="{'noneit':playit}"></view>
					<view id="f" class="playit" @click="play" :class="{'noneit':!playit}"></view>
				</view>
				<view class="down" @click="down"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import lyric from './lyric.vue'
	import AsLongASLoveMe from '../../static/source/AslongASLoveMe.js'
	export default {
		props: ['msg'],
		data() {
			return {
				info: [],
				slideValue: 0,
				isLove: false,
				playit: false,
				currT: '00:00',
				isShow:false,
				word:''
			}
		},
		created() {
			this.word = AsLongASLoveMe
		},
		methods: {
			sliderChange(e) {
				this.$parent.audio.seek(((e.target.value) * this.$parent.audio.duration) / 100)
			},
			love() {
				this.isLove = !this.isLove
			},
			play() {
				this.playit = !this.playit
				this.$parent.toggle()
			},
			up() {
				this.$parent.upMusic()
			},
			down() {
				this.$parent.downMusic()
			},
			lyric() {
				this.isShow = !this.isShow
			}
		},
		components:{
			lyric
		}
	}
</script>

<style lang="less" scoped>
	@f : 100%;
	@vw : 100vw;
	@vh : 100vh;

	.panle {
		width: @vw;
		max-height: @vh;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.isShow{
			display: none !important;
		}
		.picture {
			width: @vw*0.7;
			height: @vw*0.7;
			margin: 10rpx 0 25rpx 0;
			
			image {
				border-radius: 50%;
				border: 15rpx solid rgba(0, 255, 0, 0.3);
				width: @f;
				height: @f;
				animation-duration: 10s;
				animation-timing-function: linear;
				animation-delay: 0s;
				animation-iteration-count: infinite;
			}

			.aniname {
				animation-name: zhuan;
			}

			@keyframes zhuan {
				from {
					transform: rotate(0deg)
				}

				to {
					transform: rotate(360deg)
				}
			}
		}

		.inner {
			width: @vw;
			height: @vh*0.25;
			display: flex;
			flex-direction: column;

			text {
				margin: 10rpx 20rpx;
			}

			.name {
				font-size: larger;
				font-weight: bold;
			}

			.singer {
				color: #666;
			}

			.album {
				color: #666;
			}
		}

		.progress {
			background-color: fade(#41c761, 100%);
			width: @vw;
			height: @vh*0.35;

			.slide {
				.musicTime {
					display: flex;
					justify-content: space-between;
					font-size: smaller;
					color: fade(#000, 50%);
					max-width: calc(@vw*0.9);
					margin: 0 auto;
					transform: translateY(-5rpx);
				}
			}
		}

		.operate {
			display: flex;
			justify-content: space-around;
			width: @vw*0.9;
			margin: 30rpx auto;

			view {
				width: @vw*0.07;
				height: @vw*0.06;
				background-color: #333333;
			}

			.love {
				background: url(../../static/image/player.png) no-repeat 0 -95px;
			}

			.isLove {
				background: url(../../static/image/player.png) no-repeat -30px -95px;
			}

			.downLoad {
				background: url(../../static/image/player.png) no-repeat 0 -119px;
			}

			.volume {
				background: url(../../static/image/player.png) no-repeat 0 -144px;
			}

			.musicWord {
				background: url(../../static/image/Lyric.png);
				background-size: @f @f;
			}
		}

		.musicoperate {
			display: flex;
			justify-content: space-around;
			width: @vw*0.5;
			margin: 0 auto;

			view {
				width: @vw*0.12;
				height: @vw*0.12;
			}

			.up {
				transform: translateX(-20rpx);
				background: url(../../static/image/1223160.png);
				background-size: @f @f;
			}

			.play {
				background: url(../../static/image/1222647.png);
				background-size: @f @f;
			}

			.playit {
				background: url(../../static/image/stop.png);
				background-size: @f @f;
			}

			.down {
				background: url(../../static/image/1223160.png);
				background-size: @f @f;
				transform: rotate(180deg);
			}

			.noneit {
				display: none;
			}
		}
	}
</style>
