<template>
	<view class="page">
		<u-sticky>
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
			<!-- <u-cell-group :border="false" class="list_group" v-for="(item,index) in list" :key="index">
				<u-cell-item @click="goto(index)" :center="true" :border-bottom="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">{{item.diseaseDiagnosis}}（{{item.petName}}）</view>
					<view slot="label" class="list_item_label">
						<text>{{item.time}} 主治医师：{{item.doctorName}}</text>
					</view>
				</u-cell-item>
			</u-cell-group> -->
			<u-collapse class="list_group" :head-style="headerStyle">
				<u-collapse-item v-for="(item, index) in list" :key="index" :open="item.open" class="list_item">
					<view style="width: inherit;" slot="title">
						<view class="">
							<text class="item_title">{{item.diseaseDiagnosis}}（{{item.petName}}）</text>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<text class="item_describe">主治医师：{{item.doctorName}}</text>
							<text class="item_describe">{{item.time}}</text>
						</view>
					</view>
					<view class="">
						<u-table padding="30rpx 0" align="left" bgColor="rgba(248,249,250,1)" borderColor="rgba(0,0,0,0)">
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">就诊时间</u-td>
								<u-td>{{item.time}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">就诊原因</u-td>
								<u-td>{{item.diseaseDiagnosis}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">主治医生</u-td>
								<u-td>{{item.doctorName}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">主诉记录</u-td>
								<u-td>{{item.complaintRecord}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">宠物体重</u-td>
								<u-td>{{item.weight}}kg</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">检验分析</u-td>
								<u-td>{{item.inspectionAnalysis}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">初步诊断</u-td>
								<u-td>{{item.preliminaryDiagnosis}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">治疗方案</u-td>
								<u-td>{{item.treatment}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">医嘱</u-td>
								<u-td>{{item.doctorOrder}}</u-td>
							</u-tr>
							<u-tr class="c_table_body">
								<u-td width="30%" style="color: #707988;">回访记录</u-td>
								<u-td>{{item.returnVisitRecord}}</u-td>
							</u-tr>
						</u-table>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<u-loadmore :status="status" v-show="!noData && searchLoading" icon-type="flower" :load-text="customLoadText"
		 bg-color="rgba(249, 249, 249, 1)" font-size="24" margin-bottom="20" />
		<u-empty margin-top='-90' text="暂时没有数据" v-show="noData"></u-empty>
		<u-toast ref="uToast" />
		<u-no-network></u-no-network>
		<u-calendar v-model="show" mode="range" max-date="2150-01-01" active-bg-color="#00AEA5" range-bg-color="rgba(55, 174, 165, 0.3)"
		 :safe-area-inset-bottom="true" @change="onChange"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerStyle: {
					width: '100%',
					'padding': '20rpx 10rpx 20rpx 30rpx',
					'align-items': 'flex-end',
					'font-size': '24rpx'
				},
				scrollTop: 0,
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
		onShow() {
			// this.getIllnessList()
		},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
			this.scrollTop = options.scrollTop
		},
		onReachBottom() {
			this.getIllnessList()
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
				// this.scrollTop = 0
				this.pageNumber = 0
				this.totalPages = 1
				this.status = 'loading'
				this.list = []
				this.getIllnessList()
				// if (!this.dateValue) {
				// 	this.$refs.uToast.show({
				// 		title: '请选择时间',
				// 		type: 'warning',
				// 	})
				// } else {}
			},
			getIllnessList() {
				if (this.totalPages > this.pageNumber) {
					this.$u.api.illnessPage({
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
								item.time = this.$moment(item.medicalTimeLong).format('YYYY-MM-DD HH:mm:ss (周dd)')
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
					url: '/pages/tab1/illnessBillDetail?id=' + index
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
			padding: 10rpx 0 20rpx;
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
		// .list_group {
		// 	padding: 30rpx;
		// 	background: rgba(255, 255, 255, 1);
		// 	margin: 20rpx 0;

		// 	.list_item {
		// 		width: 100%;
		// 		padding: 0;

		// 		.list_item_title {
		// 			font-size: 28rpx;
		// 			font-weight: 500;
		// 			color: rgba(50, 50, 50, 1);
		// 		}

		// 		.list_item_label {
		// 			width: 100%;
		// 			font-size: 24rpx;
		// 			font-weight: 400;
		// 			color: rgba(112, 121, 136, 1);
		// 			line-height: 33rpx;
		// 		}

		// 		.list_item_right {
		// 			font-size: 28rpx;
		// 			font-weight: 500;
		// 			color: rgba(0, 174, 165, 1);
		// 		}
		// 	}
		// }
		.list_group {
			.list_item {
				background: rgba(255, 255, 255, 1);
				margin: 20rpx 0;
		
				.u-arrow-down-icon {
					font-size: 24rpx;
				}
		
				.item_title {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(50, 50, 50, 1);
					line-height: 40rpx;
				}
		
				.item_describe {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(112, 121, 136, 1);
					margin-top: 10rpx;
					padding-bottom: 0rpx;
				}
		
				.u-tr {
					min-height: 90rpx;
					background: rgba(248, 249, 250, 1);
					padding-left: 30rpx;
				}
		
				.c_table_header {
					.u-td {
						font-size: 28rpx !important;
					}
				}
		
				.c_table_title {
					background: rgba(0, 0, 0, 0.04);
					height: 60rpx;
		
					.u-td {
						font-size: 26rpx !important;
						color: #B1B6BE !important;
					}
				}
		
				.c_table_body {
					border-bottom: 1rpx solid #ECEEF1;
		
					.u-td {
						font-size: 28rpx !important;
					}
				}
		
				.c_table_body:nth-last-child(1) {
					border-bottom: 0;
				}
			}
		}
	}
</style>
