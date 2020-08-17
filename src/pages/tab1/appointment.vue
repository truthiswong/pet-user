<template>
	<view class="page">
		<view class="list">
			<u-cell-group :border="false" class="list_group">
				<u-cell-item @click="showHospital = true" :center="true" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">医院</view>
					<view slot="right-icon" class="list_item_right" :class="hospitalValue?'list_item_right_active':''">
						<text>{{hospitalValue?hospitalValue:'请选择就诊医院'}}</text>
						<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
					</view>
				</u-cell-item>
				<u-cell-item v-show="petList.length>0" @click="showPet = true" :center="true" :arrow="false" hover-class="none"
				 class="list_item">
					<view slot="title" class="list_item_title">预约宠物</view>
					<view slot="right-icon" class="list_item_right" :class="petValue?'list_item_right_active':''">
						<view>
							<text>{{petValue?petValue:'请选择宠物'}}</text>
							<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
						</view>
					</view>
				</u-cell-item>
				<u-cell-item :center="true" v-show="petList.length<=0" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">预约宠物</view>
					<view slot="right-icon" class="list_item_right" :class="petValue?'list_item_right_active':''">
						<view style="display: flex;">
							<u-input v-model="petValue" type="text" :border="false" input-align="right" placeholder="请输入宠物名称" />
							<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
						</view>
					</view>
				</u-cell-item>
				<!-- <u-cell-item @click="showPetType = true" :center="true" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">宠物类型</view>
					<view slot="right-icon" class="list_item_right" :class="petTypeValue?'list_item_right_active':''">
						<text>{{petTypeValue?petTypeValue:'请选择宠物类型'}}</text>
						<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
					</view>
				</u-cell-item> -->
				<u-cell-item @click="showServe = true" :center="true" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">服务选择</view>
					<view slot="right-icon" class="list_item_right" :class="serveValue?'list_item_right_active':''">
						<text>{{serveValue?serveValue:'请选择服务类型'}}</text>
						<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
					</view>
				</u-cell-item>
				<u-cell-item @click="showTime = true" :center="true" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">期望时间</view>
					<view slot="right-icon" class="list_item_right" :class="timeValue?'list_item_right_active':''">
						<text>{{timeValue?timeValue:'请选择预约时间'}}</text>
						<u-icon name="arrow-right" style="margin-left: 30rpx;" color="#B1B6BE" size="28"></u-icon>
					</view>
				</u-cell-item>
				<u-cell-item :center="true" :border-bottom="false" :arrow="false" hover-class="none" class="list_item">
					<view slot="title" class="list_item_title">备注</view>
					<view slot="right-icon" class="list_item_right input_textarea" :class="markValue?'list_item_right_active':''">
						<u-input v-model="markValue" style="min-width: 400rpx;text-align: justify;text-align: right;" type="textarea"
						 input-align="right" placeholder="请输入您的特殊要求，医务人员是可以看的哦" placeholderStyle="color:#b1b6be" :border="false" :height="80" />
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-select @confirm="onHospital" v-model="showHospital" value-name="id" label-name="name" :list="hospitalList" title="选择就诊医院"
		 confirm-color="#00AEA5" :safe-area-inset-bottom="true"></u-select>
		<u-select @confirm="onPet" v-model="showPet" value-name="id" label-name="name" :list="petList" title="选择宠物"
		 confirm-color="#00AEA5" :safe-area-inset-bottom="true"></u-select>
		<u-select @confirm="onPetType" v-model="showPetType" value-name="id" label-name="name" :list="petTypeList" title="选择宠物类型"
		 confirm-color="#00AEA5" :safe-area-inset-bottom="true"></u-select>
		<u-action-sheet @click="onServe" :list="serveList" :safe-area-inset-bottom="true" confirm-color="#00AEA5" v-model="showServe"></u-action-sheet>
		<u-picker mode="time" @confirm="onTime" v-model="showTime" :params="params" title="预约时间" :safe-area-inset-bottom="true"
		 confirm-color="#00AEA5"></u-picker>
		<view class="custom_button">
			<u-button @click="onNow" type="primary" style="height: 100%;line-height: 100%;border-radius: 0;" :ripple="true"
			 shape="square">
				<text>立即预约</text>
			</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hospitalList: [],
				showHospital: false,
				hospitalValue: '',
				hospitalId: '',
				petList: [],
				showPet: false,
				petValue: '',
				showPetType: false,
				petTypeValue: '',
				petTypeList: [],
				serveList: [],
				showServe: false,
				serveValue: '',
				serveId: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				showTime: false,
				timeValue: '',
				markValue: ''
			}
		},
		onLoad() {},
		onShow() {
			this.getHospitalList()
			this.getPetList()
			// this.getPetTypeList()
			this.getServeList()
		},
		onPullDownRefresh() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {} else {}
		},
		onTabItemTap(e) {},
		methods: {
			btnAClick() {
				console.log('btnClick');
			},
			onHospital(e) {
				console.log(e)
				this.hospitalValue = e[0].label
				this.hospitalId = e[0].value
			},
			onPet(e) {
				console.log(e)
				this.petValue = e[0].label
			},
			onPetType(e) {
				console.log(e)
				this.petTypeValue = e[0].label
			},
			onServe(index) {
				console.log(this.serveList[index])
				console.log(this.serveList[index].id)
				this.serveValue = this.serveList[index].text
				this.serveId = this.serveList[index].id
			},
			onTime(e) {
				console.log(e)
				this.timeValue = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`
			},
			onNow() {
				console.log("55555555")
				if (!this.hospitalValue) {
					this.$refs.uToast.show({
						title: '请选择就诊医院',
						type: 'warning',
					})
				} else if (!this.petValue) {
					this.$refs.uToast.show({
						title: '请选择宠物',
						type: 'warning',
					})
				} else if (!this.serveValue) {
					this.$refs.uToast.show({
						title: '请选择服务类型',
						type: 'warning',
					})
				} else if (!this.timeValue) {
					this.$refs.uToast.show({
						title: '请选择预约时间',
						type: 'warning',
					})
				} else {
					this.$u.api.appointment({
						hospitalId: this.hospitalId,
						petName: this.petValue,
						// petType: this.petTypeValue,
						typeId: this.serveId,
						appointmentDate: this.timeValue,
						remark: this.markValue
					}).then(res => {
						if (res.success) {
							this.$u.route({
								type: "back",
							})
						}
					})
				}
			},
			getHospitalList() {
				this.$u.api.hospitalList({}).then(res => {
					if (res.success) {
						this.hospitalList = res.data
					}
				})
			},
			getPetList() {
				this.$u.api.petList({}).then(res => {
					if (res.success) {
						this.petList = res.data
					}
				})
			},
			getPetTypeList() {
				this.$u.api.petTypeList({}).then(res => {
					if (res.success) {
						this.petTypeList = res.data.data
					}
				})
			},
			getServeList() {
				this.$u.api.serveList({}).then(res => {
					if (res.success) {
						for (let item of res.data.data) {
							item.text = item.name
						}
						this.serveList = res.data.data
					}
				})
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
		margin: 20rpx 0;

		.list_group {
			padding: 30rpx;
			background: rgba(255, 255, 255, 1);

			.list_item {
				width: 100%;
				min-height: 108rpx;
				padding: 0;

				.list_item_title {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(112, 121, 136, 1);
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
					font-weight: 400;
					color: rgba(177, 182, 190, 1);
					letter-spacing: 1rpx;
				}

				.list_item_right_active {
					color: rgba(50, 50, 50, 1);
				}

				.input_textarea {
					.u-input__textarea {
						margin: 0;
					}
				}
			}
		}
	}

	.custom_button {
		width: 100%;
		height: 110rpx;
		margin-top: 40rpx;
	}
</style>
