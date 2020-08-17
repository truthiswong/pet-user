<template>
	<view class="page">
		<view class="list">
			<u-collapse ref="c_collapse" class="list_group" :head-style="headerStyle">
				<u-collapse-item @change="onChange" :index="item.petId" v-for="(item, index) in list" :key="index" class="list_item">
					<view style="width: inherit;" slot="title">
						<view class="list_item_title">
							<text>{{item.medicalRecord}}（{{item.petName}}）</text>
							<text class="list_item_title_right">{{item.time}}</text>
						</view>
					</view>
					<u-table v-show="listResult.length>0" padding="30rpx 0" bgColor="rgba(248,249,250,1)" borderColor="rgba(0,0,0,0)">
						<u-tr class="c_table_header">
							<u-td>{{listResultTitle}}</u-td>
						</u-tr>
						<u-tr class="c_table_title">
							<u-td width="40%" style="text-align: left;">指标</u-td>
							<u-td>结果</u-td>
							<u-td>单位</u-td>
							<u-td>参考范围</u-td>
						</u-tr>
						<u-tr class="c_table_body" v-for="(item, index) in listResult" :key="index">
							<u-td width="40%" style="text-align: left;">{{item.indexName}}</u-td>
							<u-td>{{item.resultValue}}</u-td>
							<u-td>{{item.indexUnit}}</u-td>
							<u-td>
								幼年: 2-6
								<u-line color="#ECEEF1" />
								成年: 3-8
								<u-line color="#ECEEF1" />
								老年: 2-7
							</u-td>
						</u-tr>
						<u-tr class="c_table_body">
							<u-td width="40%" style="text-align: left;">中性粒细胞数目</u-td>
							<u-td>5↓</u-td>
							<u-td>%</u-td>
							<u-td>
								幼年: 2-6
								<u-line color="#ddd" />
								成年: 3-8
								<u-line color="#ddd" />
								老年: 2-7
							</u-td>
						</u-tr>
					</u-table>
					<view style="text-align: center;">
						<u-loading mode="flower" :show="listResult.length<=0"></u-loading>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<u-loadmore :status="status" v-show="!noData" icon-type="flower" :load-text="customLoadText" bg-color="rgba(249, 249, 249, 1)"
		 font-size="24" margin-bottom="20" />
		<u-empty text="暂时没有数据" v-show="noData"></u-empty>
		<u-toast ref="uToast" />
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerStyle: {
					width: '100%',
					height: '88rpx',
					'padding': '0 10rpx 0 30rpx',
					'font-size': '24rpx'
				},
				list: [],
				listResultTitle: '',
				listResult: [], //检测单列表
				noData: false,
				pageNumber: 0,
				totalPages: 1,
				status: 'loading',
			}
		},
		onLoad() {},
		onShow() {
			this.getTestList()
		},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onReachBottom() {
			this.getTestList()
		},
		methods: {
			onChange(e) {
				console.log(e)
				if (e.show) {
					setTimeout(()=>{
						this.$u.api.testPage({
							id: e.index
						}).then(res => {
							if (res.success) {
								this.$nextTick(() => {
									this.listResultTitle = res.data[0].settingName
									this.listResult = res.data
									console.log(this.listResult)
									this.$refs.c_collapse.init()
								})
							} else {
								this.$refs.uToast.show({
									title: '请稍后再试...',
									type: 'warning',
								})
							}
						})
					}, 0)
					
				}

				if (!e.onceLoad) {

				}
			},
			getTestList() {
				if (this.totalPages > this.pageNumber) {
					this.$u.api.testResultPage({
						pageSize: 20,
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
								if (item.timeCreated) {
									item.time = this.$moment(item.timeCreated).format('YYYY-MM-DD HH:mm:ss (周dd)')
								} else {
									item.time = ""
								}
								item.onceLoad = false
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
			.list_item {
				background: rgba(255, 255, 255, 1);
				margin: 10rpx 0;

				.list_item_title {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(50, 50, 50, 1);
				}

				.list_item_title_right {
					color: rgba(112, 121, 136, 1);
					font-weight: 400;
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
					font-size: 28rpx !important;
					border-bottom: 1rpx solid #ECEEF1;
				}

				.c_table_body:nth-last-child(1) {
					border-bottom: 0;
				}
			}
		}
	}
</style>
