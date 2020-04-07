<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :circular="true">
			<swiper-item><image src="../../static/image/music_swiper.png"></image></swiper-item>
			<swiper-item><image src="../../static/image/music_swiper2.png"></image></swiper-item>
			<swiper-item><image src="../../static/image/music_swiper3.png"></image></swiper-item>
		</swiper>
		

				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.swiper{
		width: 100vw;
	}
	.swiper image {
		width: 100%;
		height: 100%;
	}
</style>
