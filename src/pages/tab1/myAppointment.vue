<template>
	<view class="page">
		<view class="list">
			<u-cell-group :border="false" class="list_group" v-for="(item,index) in list" :key="index">
				<u-cell-item :center="true" :border-bottom="false" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">门诊预约</view>
					<view slot="label" class="list_item_label">
						<u-row gutter="0">
							<u-col span="6">
								<text>预约 xxxxxx医院</text>
							</u-col>
							<u-col span="6" @click="onCall(item.id)">
								<u-icon size="28" color="#0153FE" name="phone-fill"></u-icon>
								<text style="color: #0153FE;">联系医院</text>
							</u-col>
						</u-row>
					</view>
					<view slot="right-icon" class="list_item_right">
						等待预约
					</view>
				</u-cell-item>
				<u-line style="margin: 24rpx 0;" color="#9CA8B3" />
				<u-cell-item :center="true" :border-bottom="false" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_label">
						<u-row gutter="0">
							<u-col span="6">
								<text>预约宠物</text>
							</u-col>
							<u-col span="6">
								<text>预约时间</text>
							</u-col>
						</u-row>
					</view>
					<view slot="label" class="list_item_title">
						<u-row gutter="0">
							<u-col span="6">
								<text>豆豆</text>
							</u-col>
							<u-col span="6">
								<text>2020-03-24 15:00</text>
							</u-col>
						</u-row>
					</view>
					<view slot="right-icon" class="list_item_right">
						<u-button size="mini" ripple>催医院</u-button>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-modal @confirm="onConfirm" v-model="show" :content="content" :show-cancel-button="true" confirm-color="#00aea5"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '',
				confirmStyle: {
					background: '#00aea5',
					color: '#FFFFFF'
				},
				list: [{
					id: '1111'
				}, {
					id: '22222'
				}, {
					id: '333333'
				}],
				phone: ''
			}
		},
		onLoad() {},
		onShow() {},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onTabItemTap(e) {},
		methods: {
			onCall(phone) {
				this.show = true
				this.content = `是否要拨打医院电话 ${phone}`
				this.phone = phone
			},
			onConfirm() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				})
			}
		}
	}
</script>
<style>
	page,
	uni-page {
		height: 100%;
		background: rgba(249, 249, 249, 1);
	}
</style>
<style lang="scss" scoped>
	.page {
		height: 100%;
	}

	.list {
		.list_group {
			padding: 30rpx;
			background: rgba(255, 255, 255, 1);
			margin: 20rpx 0;

			.list_item {
				width: 100%;
				padding: 0;

				.list_item_title {
					width: 568rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: rgba(50, 50, 50, 1);
					letter-spacing: 1rpx;
				}

				.list_item_label {
					width: 100%;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(112, 121, 136, 1);
					line-height: 33rpx;
				}

				.list_item_right {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(0, 174, 165, 1);
				}
			}
		}
	}
</style>
