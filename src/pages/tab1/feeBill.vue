<template>
	<view class="page">
		<u-sticky offset-top="0" h5-nav-height="44">
			<view class="page_top">
				<u-row gutter="60" justify="between" align="center">
					<u-col span="8" style="height: 60rpx;">
						<view class="page_text" :class="dateValue?'page_text_active':''" @click="show = true">{{dateValue?dateValue:'开始日期 ~ 结束日期'}}</view>
					</u-col>
					<u-col span="3" style="text-align: right;height: 60rpx;">
						<u-button @click="onSearch" type="primary" style="height: 100%;line-height: 100%;" :ripple="true" shape="square">
							<text>搜索</text>
						</u-button>
					</u-col>
				</u-row>
			</view>
		</u-sticky>
		<view class="list">
			<u-cell-group :border="false" class="list_group" v-for="(item,index) in list" :key="index">
				<u-cell-item @click="goto(index)" :center="true" :border-bottom="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">¥ {{item.totalAmount}}</view>
					<view slot="label" class="list_item_label">
						<text>{{item.settlementTime}}（{{item.week}}） 宠物：{{item.petName}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-loadmore :status="status" v-show="!noData && searchLoading" icon-type="flower" :load-text="customLoadText"
		 bg-color="rgba(249, 249, 249, 1)" font-size="24" margin-bottom="20" />
		<u-empty margin-top='-90' text="暂时没有数据" v-show="noData"></u-empty>
		<u-toast ref="uToast" />
		<u-no-network></u-no-network>
		<view class="">
			<u-calendar v-model="show" mode="range" max-date="2150-01-01" active-bg-color="#00AEA5" range-bg-color="rgba(55, 174, 165, 0.3)"
			 :safe-area-inset-bottom="true" @change="onChange"></u-calendar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				dateValue: '',
				dateValueStart: '',
				dateValueEnd: '',
				list: [],
				noData: false,
				pageNumber: 0,
				totalPages: 1,
				status: 'loading',
				searchLoading: false
			}
		},
		onLoad() {},
		onShow() {},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onReachBottom() {
			console.log(3333333)
		},
		methods: {
			onChange(e) {
				console.log(e)
				this.dateValue = `${e.startDate} ~ ${e.endDate}`
				this.dateValueStart = e.startDate
				this.dateValueEnd = e.endDate
			},
			onSearch() {
				this.searchLoading = true
				this.pageNumber = 0
				this.totalPages = 1
				this.status = 'loading'
				this.list = []
				this.getFeeList()
				// if (!this.dateValue) {
				// 	this.$refs.uToast.show({
				// 		title: '请选择时间',
				// 		type: 'warning',
				// 	})
				// } else {}
			},
			getFeeList() {
				if (this.totalPages > this.pageNumber) {
					this.$u.api.feePage({
						pageSize: 10,
						pageNumber: this.pageNumber,
						// this.dateValueStart
						// this.dateValueEnd
					}).then(res => {
						if (res.success) {
							if (this.pageNumber == 0) {
								this.list = []
							}
							if (res.data.data.length <= 0) {
								this.noData = true
							}
							this.pageNumber++
							for (let item of res.data.data) {
								item.week = this.$moment(item.settlementTime).format('(周dd)')
							}
							this.list = this.list.concat(res.data.data)
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
			goto(index) {
				uni.navigateTo({
					url: '/pages/tab1/feeBillDetail?id=' + index
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

		.page_top {
			padding: 20rpx 0 10rpx;
			background-color: #FFFFFF;

			.page_text {
				font-size: 28rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-weight: 400;
				color: rgba(177, 182, 190, 1);
				letter-spacing: 1rpx;
				background-color: rgba(246, 248, 251, 1);
				padding-left: 20rpx;
			}

			.page_text_active {
				color: rgba(50, 50, 50, 1);
			}
		}
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
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(50, 50, 50, 1);
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
