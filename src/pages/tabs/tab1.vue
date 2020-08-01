<template>
	<view class="page">
		<view class="list">
			<u-cell-group :border="false">
				<u-cell-item @click="goto(1)" :center="true" :border-bottom="false" class="list_item">
					<u-image slot="icon" width="126rpx" height="100rpx" src="/static/tab1/tab1_list1.png"></u-image>
					<text slot="title" class="list_item_title">我的预约</text>
				</u-cell-item>
				<u-cell-item @click="goto(2)" :center="true" :border-bottom="false" class="list_item">
					<u-image slot="icon" width="126rpx" height="100rpx" src="/static/tab1/tab1_list2.png"></u-image>
					<text slot="title" class="list_item_title">病例账单</text>
				</u-cell-item>
				<u-cell-item @click="goto(3)" :center="true" :border-bottom="false" class="list_item">
					<u-image slot="icon" width="126rpx" height="100rpx" src="/static/tab1/tab1_list3.png"></u-image>
					<text slot="title" class="list_item_title">检验报告</text>
				</u-cell-item>
				<u-cell-item @click="goto(4)" :center="true" :border-bottom="false" class="list_item">
					<u-image slot="icon" width="126rpx" height="100rpx" src="/static/tab1/tab1_list4.png"></u-image>
					<text slot="title" class="list_item_title">消费记录</text>
				</u-cell-item>
			</u-cell-group>
			<view class="custom_button">
				<u-button @click="goto(5)" type="primary" style="height: 100%;line-height: 100%;" :ripple="true" shape="square">
					<u-image width="40rpx" height="40rpx" src="/static/tab1/tab1_button.png"></u-image>
					<text>申请预约</text>
				</u-button>
			</view>
		</view>
		<view class="page_bottom">
			<u-image width="100%" height="178rpx" src="/static/tab1/bottom.png"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {},
		onShow() {
			console.log(this.$moment().format('YYYY-MM-DD dddd'))
			var a = document.getElementsByClassName('uni-page-head-hd')[0]
			a.style.display = 'none';
		},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onTabItemTap(e) {},
		methods: {
			goto(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/tab1/myAppointment'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/tab1/illnessBill'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pages/tab1/testReport'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '/pages/tab1/feeBill'
					})
				} else if (index == 5) {
					uni.navigateTo({
						url: '/pages/tab1/appointment'
					})
				}
			}
		}
	}
</script>
<style>
	page,
	uni-page {
		height: 100%;
	}
	page .uni-page-head-hd {
		display: none;
	}
</style>
<style lang="scss" scoped>
	.page {
		height: 100%;
	}

	.page .uni-page-head-hd {
		display: none;
	}

	.list {
		width: 630rpx;
		margin: auto;
		padding-top: 60rpx;

		.list_item {
			width: 630rpx;
			height: 120rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 30rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 10rpx;
			margin-bottom: 40rpx;

			.list_item_title {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(50, 50, 50, 1);
				letter-spacing: 1rpx;
				margin-left: 20rpx;
			}
		}

		.custom_button {
			margin-top: 120rpx;
			width: 630rpx;
			height: 100rpx;
			background: rgba(0, 174, 165, 1);
			border-radius: 6rpx;

			text {
				margin-left: 20rpx;
			}

		}
	}

	.page_bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
