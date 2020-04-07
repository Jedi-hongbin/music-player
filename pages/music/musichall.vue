<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true">
			<swiper-item>
				<image src="../../static/image/swiper2.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/image/swiper3.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/image/swiper.jpg"></image>
			</swiper-item>
		</swiper>

		<scroll-view class="scrollV" scroll-x="true" scroll-left="0">
			<view class="selfFM card">
				<image src="../../static/image/music1.png" lazy-load="true"></image>
				<text>私人FM</text>
			</view>
			<view class="tuijian card">
				<image src="../../static/image/music4.png" lazy-load="true"></image>
				<text>今日推荐</text>
			</view>
			<view class="list card">
				<image src="../../static/image/resizeApi%20(3).png" lazy-load="true"></image>
				<text>MV</text>
			</view>
			<view class="tuijian card">
				<image src="../../static/image/resizeApi%20(1).png" lazy-load="true"></image>
				<text>今日推荐</text>
			</view>
		</scroll-view>
		<text style="display: block;padding-left:5rpx;margin-left: 6rpx;color: #666666;" class="listen">推荐歌曲</text>
		<view class="innerF">
			<view class="oks card">
				<image :src="randomBg" lazy-load="true"></image>
				<text>随机播放</text>
				<view class="play" @click="randomPlay"></view>
			</view>
			<view class="selfFM card">
				<image src="../../static/image/lijian.jpg" lazy-load="true"></image>
				<text>28手首歌让你认识李健</text>
			</view>
			<view class="list card">
				<image src="../../static/image/lronghao.jpg" lazy-load="true"></image>
				<text>李荣浩合集</text>
			</view>
			<view class="jingdian card">
				<image src="../../static/image/zhangguorong.jpg" lazy-load="true"></image>
				<text>经典老歌</text>
			</view>
			<view class="list card">
				<image src="../../static/image/katong.jpg" lazy-load="true"></image>
				<text>青春校园</text>
			</view>
			<view class="jingdian card">
				<image src="../../static/image/music_swiper2.png" lazy-load="true"></image>
				<text>一起听电音</text>
			</view>
		</view>
		<text class="listen" style="margin-left: 10rpx;">大家都在听</text>
		<musiclist></musiclist>
	</view>
</template>

<script>
	import musiclist from './musiclist.vue'
	export default {
		data() {
			return {
				isPlay:false,
				randomNum:0,
				randomBg:'../../static/image/resizeApi.png'
			}
		},
		methods: {
			randomPlay(){
				this.randomNum = Math.floor(Math.random() * 12)
				this.$parent.$refs.musicList.play(this.randomNum)
				this.randomBg = this.$parent.footerMsg[5]
			}
		},
		components:{
			musiclist
		}
	}
</script>

<style lang="less" scoped>
	@w : 100%;

	.container {
		min-width: @w;
		min-height: @w;
		box-sizing: border-box;
		margin-bottom: 10vh;
		.listen {
			display: block;
			margin-left: 5rpx;
			position: relative;
			&::after {
				height: 0px;
				width: 0px;
				position: absolute;
				border-left:15rpx solid rgb(42, 179, 42);
				border-top:15rpx solid transparent;
				border-right:15rpx solid transparent;
				border-bottom:15rpx solid transparent;
				content: "";
				top: 4px;
				transform: translateX(10rpx);
			}
		}

		.swiper {
			width: 100vw;
			margin-top: 5rpx;

			image {
				width: @w;
				height: @w;
			}
		}

		.scrollV {
			white-space: nowrap;

			.card {
				display: inline-flex;
				width: 30vw;
				height: 30vw;
				margin: 10rpx;
				flex-flow: column nowrap;
				justify-content: space-between;
				text-align: center;
				color: fade(#666, 50%);
				overflow: hidden;
				text-overflow: ellipsis;

				&:active {
					color: fade(#0f0, 80%);
				}

				&:first-child {
					margin-left: 20rpx;
				}

				image {
					display: inline-block;
					margin: 0 auto;
					width: @w * 0.8;
					height: @w * 0.8;
					border-radius: 10rpx;
				}

				text {
					display: block;
				}


			}

			.tuijian>image {
				transform: scale(0.9) !important;
				animation: roate 10s ease .5s infinite alternate;
			}

			@keyframes roate {
				from {
					transform: rotate(0deg) scale(1);
				}

				to {
					transform: rotate(740deg) scale(0.7);
				}
			}

			.selfFM>image {
				transform-style: preserve-3d;
				transform: scale(0.9) !important;
				animation: late 5s ease 0s infinite;
			}

			@keyframes late {
				from {
					transform: rotateY(0deg);
				}

				to {
					transform: rotateY(360deg);
				}
			}

			.list>image {
				transform: scale(0.9) !important;
				animation: list 6s ease 1s infinite;
			}

			@keyframes list {
				from {
					transform: rotateX(0deg);
				}

				to {
					transform: rotateX(360deg);
				}
			}
		}

		.innerF {
			.card {
				.container>.scrollV>.card;
				white-space: nowrap;
				position: relative;

				.play {
					position: absolute;
					width: @w * 0.35;
					height: @w * 0.35;
					margin: calc((30vw - @w * 0.4) / 2);
					background: url(../../static/image/random1.png) no-repeat;
					background-size: 100% 100%;
					transform: translateY(-10rpx);
				}
			}

		}
	}
</style>
