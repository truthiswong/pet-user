const hostSso = 'http://pet-jw.app.iisu.cn/server/data'
const hostUser = 'https://api.youzixy.com/'
let hotSearchUrl = hostUser + 'ebapi/store_api/hot_search'
let indexUrl = hostUser + 'ebapi/public_api/index'

const install = (Vue, vm) => {
	let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, params)
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params)
	vm.$u.api = {
		getSearch,
		getInfo
	}
}

export default {
	install
}
