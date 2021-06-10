import ProductApi from "../../api/ProductApi";
import {pagination} from "../../utils";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import CategoriesApi from "../../api/CategoriesApi";

const result = (products,categories) => {
    return products.map(pro => {
        return ` <tr class="border-b   bg-gray-100">
                    <td class="p-3 px-5">${pro.id}</td>
                    <td class="p-3 px-5">${pro.name}</td>
                    <td class="p-3 px-5">${pro.slug}</td>
                    <td class="p-3 px-5">${categories.find(cate => { 
                        return cate.id === pro.categoryId
                    }).name}</td>
                    <td class="p-3 px-5">${pro.price}</td>
                    <td class="p-3 px-5"> 
                        <img class="w-16 h-16" src="${pro.image}" alt="image">
                    </td>
                    <td class="p-3 px-5">${pro.description}</td>
                    <td class="p-3 px-5 flex justify-end">
                        <a href="/#/admin-edit-product/${pro.id}" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Edit
                        </a>
                        <button type="button" data-id="${pro.id}" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </td>
                </tr>`
    }).join('');
}

const AdminProduct = {
    async render() {
        const {data: products} = await ProductApi.getAll();
        const {data: categories} = await CategoriesApi.getAll();
        const {page, productCurrent} = pagination(products, 10);
        const productHTML = result(productCurrent,categories);
        return `
            <div class="max-w-[1920px] flex px-6 my-5 text-white"> 
                   ${sidebarAdmin()}
                    <div class="w-full "> 
                        ${titleHeaderAdmin('List Products')}
                        <div class="px-3 py-4 text-gray-700">
                            <div class="flex justify-end">   
                                <a href="/#/admin-add-product" class="text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 
                                        rounded cursor-pointer">
                                    Create
                                </a>
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
                                            Price
                                            <button data-sort="price">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg> 
                                            </button>
                                        </th>
                                        <th class="text-left p-3 px-5">Image</th>
                                        <th class="text-left p-3 px-5">Description</th>
                                    </tr>
                                </thead>
                                <tbody id="pro-sort">
                                        ${productHTML}
                                </tbody>
                            </table>
                            <div id="pagination"> 
                                ${page}
                            </div>
                         </div>
                    </div>
                </div>
          
        `;
    },
    async afterRender() {
        let {data: products} = await ProductApi.getAll()
        // let productCurrent;
        let {productCurrent} = pagination(products, 10);
        console.log(productCurrent)
        let btns = document.querySelectorAll('button[data-id]');
        let btnSort = document.querySelectorAll('button[data-sort]');
        let btnPaginations = document.querySelectorAll('button[data-pagination]');
        let typeSortName = ['asc', 'desc'];
        let typeSortPrice = ['asc', 'desc'];
        let iconName = [
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 len" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xuong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>`
        ];
        let iconPrice = [
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 len" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xuong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>`
        ]
        // remove products
        btns.forEach(btn => {
            const id = btn.dataset.id;

            btn.addEventListener('click', () => {
                const question = confirm('Ban co muon xoa k?')
                if (question) {
                    btn.parentNode.parentNode.remove();
                    ProductApi.remove(id)
                }
            })
        })
        // sort product
        btnSort.forEach(btn => {
            const dataSort = btn.dataset.sort;
            btn.addEventListener('click', async (e) => {
                // Ngăn chặn sự kiện sủi bỏi (bubbling)
                e.stopPropagation();
                if (dataSort === 'price') {
                    btn.innerHTML = iconPrice[1];
                    iconPrice.reverse();
                    if (typeSortPrice[0] === 'asc') {
                        products.sort((a, b) => a.price - b.price);
                        typeSortPrice.reverse();
                        productCurrent = products.slice(0, 10)
                    } else {
                        products.sort((a, b) => b.price - a.price);
                        typeSortPrice.reverse();
                        productCurrent = products.slice(0, 10)
                    }
                } else {
                    btn.innerHTML = iconName[1];
                    iconName.reverse();
                    if (typeSortName[0] === 'asc') {
                        products.sort((a, b) => a.name.localeCompare(b.name))
                        typeSortName.reverse();
                        productCurrent = products.slice(0, 10)
                    } else {
                        products.sort((a, b) => b.name.localeCompare(a.name))
                        typeSortName.reverse();
                        productCurrent = products.slice(0, 10)
                    }
                }
                document.querySelector('#pro-sort').innerHTML = result(productCurrent);
            })
        })

        // Pagination products
        btnPaginations.forEach(btn => {
            const id = btn.dataset.pagination;
            btn.addEventListener('click', async () => {
                const index = (parseInt(id) - 1) * 10 ;
                if (parseInt(id) === 1) {
                    productCurrent = products.slice(0, 10)
                } else {
                    productCurrent = products.slice(index, index+9)
                }
                document.querySelector('#pro-sort').innerHTML = result(productCurrent);
            })
        })
    }
}
export default AdminProduct;