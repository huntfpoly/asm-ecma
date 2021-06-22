import moment from 'moment'
import ProductApi from '../../api/ProductApi'
import CategoriesApi from '../../api/CategoriesApi'
import Pagination from '../../components/Pagination'
import Button, { ButtonLink } from '../../components/Button'
import LayoutAdmin from '../../components/LayoutAdmin'

const result = (products, categories) => {
	return products
		.map((pro) => {
			return ` 
      <tr class="border-b   bg-gray-100">
        <td class="p-3 px-5">${pro.id}</td>
        <td class="p-3 px-5">${pro.name}</td>
        <td class="p-3 px-5">${pro.slug}</td>
        <td class="p-3 px-5">${
				categories.find((cate) => {
					return cate.id === pro.categoryId
				}).name
			}</td>
        <td class="p-3 px-5">${pro.sku.reduce(
				(a, c) => a + parseInt(c.quantity), 0)}</td>
        <td class="p-3 px-5"> 
          <img class="w-16 h-16" src="${pro.image}" alt="image">
        </td>
        
        <td class="p-3 px-5 flex justify-end">
          ${ButtonLink({
				linkUrl: `/#/admin-edit-product/${pro.id}`,
				text: 'edit',
				bg: 'bg-blue-500',
				hoverBg: 'bg-blue-700',
			})}
          ${Button({
				bg: 'bg-red-500',
				text: 'delete',
				name: pro.id,
			})}
        </td>
      </tr>`
		})
		.join('')
}

const AdminProduct = {
	async render () {
		const { data: products } = await ProductApi.getAll()
		// console.log(products)
		const { data: categories } = await CategoriesApi.getAll()
		products.sort((a, b) => b.created_at - a.created_at)
		const contentHTML = result(products, categories)
		const html = `
      <div class="flex justify-end">   
        ${ButtonLink({
			linkUrl: '/#/admin-add-product',
			text: 'create',
			bg: 'bg-green-500',
			hoverBg: 'bg-green-700',
		})}
      </div>
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <thead> 
            <tr class="border-b"> 
              <th class="text-left p-3 px-5">Id</th>
              <th class="text-left p-3 px-5 flex items-center">
                Name
                <button data-sort="name">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                </button>
              </th>
              <th class="text-left p-3 px-5">Slug</th>
              <th class="text-left p-3 px-5">Category</th>
              <th class="text-left p-3 px-5 flex items-center">
                stock
                <button data-sort="price">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg> 
                </button>
              </th>
              <th class="text-left p-3 px-5">Image</th>
            </tr>
          </thead>
          <tbody id="productContent">
              ${contentHTML}
          </tbody>
        </table>
        <div id="pagination"></div>
        `
		return `
            ${LayoutAdmin(html, 'List Products')}
        `
	},
	async afterRender () {
		let { data: products } = await ProductApi.getAll()
		const { data: categories } = await CategoriesApi.getAll()
		const limit = 5

		let btnSort = document.querySelectorAll('button[data-sort]')
		let typeSortName = ['asc', 'desc']
		let typeSortPrice = ['asc', 'desc']
		let iconName = [
			`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 len" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>`,
			`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xuong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>`,
		]
		let iconPrice = [
			`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 len" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>`,
			`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xuong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>`,
		]

		const btns = document.querySelectorAll('button[name]')
		// console.log(btns)
		btns.forEach((btn) => {
			const id = btn.name
			btn.addEventListener('click', async () => {
				const question = confirm('Ban co muon xoa k?')
				if (question) {
					await ProductApi.remove(id)
					btn.parentNode.parentNode.remove()
					products = products.filter((item) => item.id !== id)
					Pagination({ data: products, result, categories, limit })
				}
			})
		})

		// sort product
		btnSort.forEach((btn) => {
			const dataSort = btn.dataset.sort
			btn.addEventListener('click', async (e) => {
				// Ngăn chặn sự kiện sủi bỏi (bubbling)
				e.stopPropagation()
				let productCurrent
				if (dataSort === 'price') {
					btn.innerHTML = iconPrice[1]
					iconPrice.reverse()
					if (typeSortPrice[0] === 'asc') {
						products.sort((a, b) => a.price - b.price)
						typeSortPrice.reverse()
						productCurrent = products.slice(0, limit)
					} else {
						products.sort((a, b) => b.price - a.price)
						typeSortPrice.reverse()
						productCurrent = products.slice(0, limit)
					}
				} else {
					btn.innerHTML = iconName[1]
					iconName.reverse()
					if (typeSortName[0] === 'asc') {
						products.sort((a, b) => a.name.localeCompare(b.name))
						typeSortName.reverse()
						productCurrent = products.slice(0, limit)
					} else {
						products.sort((a, b) => b.name.localeCompare(a.name))
						typeSortName.reverse()
						productCurrent = products.slice(0, limit)
					}
				}
				document.querySelector('#productContent').innerHTML = result(productCurrent, categories,)

				const btns = document.querySelectorAll('button[name]')
				console.log(btns)
				btns.forEach((btn) => {
					const id = btn.name
					btn.addEventListener('click', async () => {
						const question = confirm('Ban co muon xoa k?')
						if (question) {
							await ProductApi.remove(id)
							btn.parentNode.parentNode.remove()
							products = products.filter((item) => item.id !== id)
							Pagination({ data: products, result, categories, limit })
						}
					})
				})
			})
		})
		Pagination({ data: products, result, categories, limit })
	},
}
export default AdminProduct
