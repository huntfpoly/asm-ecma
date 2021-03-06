//  Lấy đường dẫn

export const parseRequestUrl = () => {
	const url = window.location.hash.toLowerCase()
	const request = url.split('/')
	return {
		resource: request[1],
		id: request[2],
		action: request[3]
	}
}
export const rerender = async (component, position = '') => {
	if (position !== '') {
		document.getElementById(`${position}`).innerHTML = await component.render()
	} else {
		document.getElementById('root').innerHTML = await component.render()
		if (component.afterRender) await component.afterRender()
	}
}
export const showLoading = () => {
	document.getElementById('loading-overlay').classList.add('active')
}
export const hideLoading = () => {
	document.getElementById('loading-overlay').classList.remove('active')
}
// Pagination
export const pagination = (products, limit) => {
	const division = products.length / limit
	const countPage = products.length % limit === 0 ? division : Math.trunc(division) + 1
	let productCurrent = products.slice(0, 10)
	return {
		page: Array.from(new Array(countPage)).map((pageItem, index) => {
			return `
                <button data-pagination="${index + 1}" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  ${index + 1}
                </button>
            `
		}).join(''),
		productCurrent: productCurrent,
	}
}
export const formatNumber = (number) => {
	return new Intl.NumberFormat('vi').format(number)
}