<template>
	<view class="page">
		<view class="list">
			<u-cell-group :border="false" class="list_group" v-for="(item,index) in list" :key="index">
				<u-cell-item :center="true" :border-bottom="false" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">门诊预约</view>
					<view slot="label" class="list_item_label">
						<u-row gutter="0">
							<u-col span="6">
								<text>预约 {{item.hospital}}</text>
							</u-col>
							<u-col span="6" @click="onCall(item.tel)">
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
								<text>{{item.petName}}</text>
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
		<u-loadmore :status="status" v-show="!noData" icon-type="flower" :load-text="customLoadText" bg-color="rgba(249, 249, 249, 1)"
		 font-size="24" margin-bottom="20" />
		<u-empty text="暂时没有数据" v-show="noData"></u-empty>
		<u-modal @confirm="onConfirm" v-model="show" :content="content" :show-cancel-button="true" confirm-color="#00aea5"></u-modal>
		<u-toast ref="uToast" />
		<u-no-network></u-no-network>
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
				list: [],
				noData: false,
				pageNumber: 0,
				totalPages: 1,
				status: 'loading',
				phone: ''
			}
		},
		onLoad() {
		},
		onShow() {
			this.getMyAppointment()
		},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onReachBottom() {
			this.getMyAppointment()
		},
		methods: {
			getMyAppointment() {
				if (this.totalPages > this.pageNumber) {
					this.$u.api.appointmentPage({
						pageSize: 10,
						pageNumber: this.pageNumber
					}).then(res => {
						if (res.success) {
							if (this.pageNumber == 0) {
								this.list = []
							}
							// res.data.data = []
							if (res.data.data.length<=0) {
								this.noData = true
							}
							this.pageNumber++
							this.list = this.list.concat(res.data.data)
							this.list.reverse()
							this.status = 'loading'
							this.totalPages = res.data.totalPages
							if (this.totalPages == this.pageNumber) {
								this.status = 'nomore'
							}
						} else {
							this.$refs.uToast.show({
								title: '请稍后再试...',
								type: 'warning',
							})
						}
					})
				} else {
					this.status = 'nomore'
				}
			},
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
