<template>
	<view class="container" :class="{'show':!off}" @click="log">
		<view class="title">
			<text style="font-size: 40rpx;">name</text>
			<text>singer</text>
		</view>
		<view class="lyric">
			<view class="word">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['off','word'],
		data(){
			return{
				t:[],
				w:[]
			}
		},
		created() {
			//console.log(this.word)
		},
		methods:{
			log(){
				console.log(this.off)
			}
		}
	}
</script>

<style lang="less" scoped>
	@f : 100%;
	@vw : 100vw;
	@vh : 100vh;
	.container{
		width: @vw;
		height: @vh*0.685vh;
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		box-sizing: border-box;
		background-color: lawngreen;
		margin-left: @vw*0.1;
		.title{
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			background-color: #007AFF;
			position: fixed;
		}
		.lyric{

			width: @vw;
			height: @f;
			background-color: #3F536E;
			.word{
				width: @f;
				height: @f;
				margin: 30rpx auto;
			}
		}
	}
	.show{
		display: none !important;
	}
</style>
