<template>
	<view class="container">
		<picker :range="Message.post" @change="pickerPost" mode="multiSelector">
			<button type="default" plain>{{Message.postIndex}}</button>
		</picker>
		<picker :range="Message.years" @change="pickerYears">
			<button type="default" plain>{{Message.years[Message.value]}}</button>
		</picker>
		<picker @change="pickerDate" mode="date">
			<button type="default" plain>{{Message.date}}</button>
		</picker>	
		<picker @change="pickerRegion" mode="region">
			<button type="default" plain>{{Message.region}}</button>
		</picker>
		<picker @change="pickerTime" mode="time">
			<button type="default" plain>{{Message.time}}</button>
		</picker>
		<text class="age">年龄 ：</text> <slider value="30" @change="sliderChange" step="1" show-value="true" />
		<button type="primary" plain form-type="submit" @click="submit">Submit</button>
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<view class="header">核实信息</view>
				<view class="body">
					<text v-for="(item,index) in info" :key="index">{{item}}</text>
				</view>
				<view class="footer">
					<text class="cancel" @click="cancel">取消</text>
					<text class="determine" @click="cancel">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				Message:{
					years:['请选择工作经验','1~3年工作经验','5年工作经验','10年及以上'],
					post:[['技术岗','web工程师','java工程师','保洁'],['管理岗','产品经理','项目经理']],
					date:'出生日期',
					region:'选择地区',
					time:'预约时间',
					age:'30',
					value:0,
					postIndex:'应聘岗位'
				},
				info:[]
			}
		},
		methods: {
			pickerYears(e){
				this.Message.value = e.detail.value
			},
			pickerPost(e){
				if(e.detail.value.every(x => x==0) || e.detail.value.every(x => x!==0)){
					return true
				}else{
					e.detail.value.some((val,index) => {
						if(val !== 0){
							this.Message.postIndex = this.Message.post[index][val]
						}
					})
				}
			},
			pickerDate(e){
				this.Message.date = e.detail.value
			},
			pickerRegion(e){
				this.Message.region = e.detail.value
			},
			pickerTime(e){
				this.Message.time = e.detail.value
			},
			sliderChange(e){
				this.Message.age = e.target.value
			},
			submit(){
				this.info = [];
				this.info.push('应聘岗位:'+this.Message.postIndex,'工作经验:'+this.Message.years[this.Message.value],'出生日期:'+this.Message.date,'所在地:'+this.Message.region,'预约时间:'+this.Message.time,'年龄:'+this.Message.age)
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			}
		},
		components:{
			uniPopup
		}
	}
</script>

<style scoped>
	.footer{
		display: flex;
		justify-content: space-around;
		padding-bottom: 20rpx;
	}
	.body{
		margin: 20rpx;
		color: #666;
	}
	.body>text{
		display: block;
	}
	.header{
		text-align: center;
		font-size: 35rpx;
		font-weight: bold;
	}
	.popup{
		max-width: 90vw;
		background-color: #fff;
		border-radius: 3vw;
	}
	button[type=default]{
		max-width: 90vw;
		margin: 4rpx auto;
	}
	slider{
		transform: scale(0.8);
	}
	.age{
		display: inline-block;
		transform: translateY(65rpx);
	}
</style>
