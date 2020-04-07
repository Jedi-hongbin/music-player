<template>
	<view class="container">
		<view class="musicList" v-for="(item,index) in list" :key="index">
			<image :src="item.cover" mode=""></image>
			<text @click="play(index)" class="icon_play" :class="[(index== currentIndex) ? 'play' : '']"></text>
			<view class="title">
				<text>{{item.name}}</text>
				<text style="font-size: 0.8rem;color: #666;">{{item.singer}}</text>
				<i></i>
				<text class="icon_talk"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				list: [],
				currentIndex:-1
			}
		},
		created() {
			this.list = this.$store.state.musicList
		},
		methods: {
			play(index = 0){
				if(index == this.currentIndex){
					this.currentIndex = -1
					this.$emit('control',index)
				}else if(this.currentIndex == -1){
					this.$emit('control',index)
					this.currentIndex = index
				}else{
					this.currentIndex = index
				}
				if(index == -2){
					this.$emit('control',0)
					this.currentIndex = 0;
					index = 0;
				}
				this.$parent.playMusic(index)
			},
			fack(index = -1){
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped lang="less">
	@f : 100%;
	@vw : 100vw;
	@vh : 100vh;
	@blue: blue;
	@pink: pink;
	@color: green;

	.container {
		width: @vw;
		min-height: @f;
		margin-bottom: 10vh;
		.musicList {
			display: flex;
			margin: 10rpx 20rpx;
			image{
				width: @vw / 4;
				height: @vw / 5;
				border-radius: 10rpx;
			}
			.icon_play{
				width: @vw / 10;
				height: @vw / 10;
				position: absolute;
				margin: calc((@vw / 4 - @vw / 10) / 3);
				background: url(../../static/image/icon_list_menu.png) no-repeat -40px 0px;
			}
			.play{
				background: url(../../static/image/icon_list_menu.png) no-repeat -40px -200px !important;
			}
			.title{
				display: flex;
				width: @f;
				flex-flow: column nowrap;
				justify-content: space-around;
				max-height: @vw / 5;
				margin-left: 20rpx;
				position: relative;
				i{
					display: inline-flex;
					width: 30px;
					height: 25px;
				}
				.icon_talk{
					align-items: flex-start;
					width: 30px;
					height: 25px;
					position: absolute;
					right: 20rpx;
					background: url("../../static/image/player.png") no-repeat 0px -460px;
				}
				
			}
		}
	}
</style>
