const hostSso = 'http://pet-jw.app.iisu.cn/server/data'
const hostUser = 'http://10.65.56.60:8381/'

// let appointmentPage = hostUser + 'user/appointment/page' // 获取预约列表

// let hospitalList = hostUser + 'hospital/hos/page' // 获取医院列表
// let petList = hostUser + 'user/pet/search' // 获取宠物列表
// let petTypeList = hostUser + 'user/pet/search' // 获取宠物类型列表
// let serveList = hostUser + 'user/pet/service/item/date/setting/list' // 获取服务类型

// let indexUrl = hostUser + 'ebapi/public_api/index'

const install = (Vue, vm) => {
	let appointmentPage = (params = {}) => vm.$u.get(hostUser + 'user/appointment/page', params) // 获取预约列表
	
	let hospitalList = (params = {}) => vm.$u.get(hostUser + 'hospital/hos/page', params) // 获取医院列表
	let petList = (params = {}) => vm.$u.get(hostUser + 'user/pet/search', params) // 获取宠物列表
	let petTypeList = (params = {}) => vm.$u.get(hostUser + 'user/pet/search', params) // 获取宠物类型列表
	let serveList = (params = {}) => vm.$u.get(hostUser + 'user/appointment/query', params) // 获取服务类型
	let appointment = (params = {}) => vm.$u.post(hostUser + 'user/appointment/apply', params) // 申请预约

	vm.$u.api = {
		appointmentPage,
		hospitalList,
		petList,
		petTypeList,
		serveList,
		appointment
	}
}

export default {
	install
}
