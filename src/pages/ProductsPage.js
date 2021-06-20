import ProductApi from "../api/ProductApi";
import "alpinejs";
import CategoriesApi from "../api/CategoriesApi";
import {pagination, parseRequestUrl, rerender} from "../utils";
import ProductComponent from "../components/ProductComponent";
import Button from "../components/Button";

const result = (products) => {
    return products.map((product) => {
        return `
            ${ProductComponent(product)}
        `;
    })
        .join("");
}
const ProductsPage = {
    async afterRender() {
        const {data: products} = await ProductApi.getAll()
        const btnPaginations = document.querySelectorAll('button[data-pagination]');
        const btnAddToCart = document.querySelectorAll('button[data-id]');
        const btnFilterWithPrice = document.querySelector('button[name=findWithPrice]');

        let {productCurrent} = pagination(products, 10);
        // Pagination products
        btnPaginations.forEach(btn => {
            const id = btn.dataset.pagination;
            btn.addEventListener('click', async () => {
                const index = (parseInt(id) - 1) * 10;
                if (parseInt(id) === 1) {
                    productCurrent = products.slice(0, 10)
                } else {
                    productCurrent = products.slice(index, index + 9)
                }
                document.querySelector('#products').innerHTML = result(productCurrent);
            })
        })

        // Filter with price
        btnFilterWithPrice.addEventListener('click',() => {
            let minPrice = parseInt(document.querySelector('input[name=minPrice]').value)
            let maxPrice = parseInt(document.querySelector('input[name=maxPrice]').value)
            // const max = products.reduce((max,c) => (c.price > max?c.price:max),products[0].price)
            console.log('Them color, size')
            const max = Math.max(...products.map(item => item.price))
            minPrice = isNaN(minPrice)? 0 :minPrice
            maxPrice = isNaN(maxPrice)? max :maxPrice
            const productsFilter = products.filter(item => (item.price >= minPrice && item.price <=maxPrice))

            document.querySelector('#products').innerHTML = result(productsFilter)
        })

    },
    async render() {
        // const {data: products} = await ProductApi.getAll();
        const {data: products} = await ProductApi.getAll();
        const {data: categories} = await CategoriesApi.getAll();

        const menuCate = categories.map((cate) => {
            return `
                <a href="/#/category/${cate.id}" data-cate="${cate.id}" class="block w-full px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900
                 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">${cate.name}</a>
            `;
        }).join('')
        const {page, productCurrent} = pagination(products, 10);

        const productHTML = result(productCurrent);

        return `
            <div class="w-full m-auto flex px-6"> 
                <div class="md:w-1/6 flex flex-col items-center border">   
                    <div @click.away="open = false" class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
                    <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-center">
                        <h3 class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Categories</h3>
                        <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
                            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                          <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                          <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        </button>
                    </div>
                    <nav :class="{'block': open, 'hidden': !open}" class="flex justify-end md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                        ${menuCate}
                    </nav>
                    <div> 
                        <h3 class="text-center text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg  focus:outline-none focus:shadow-outline">Filter</h3>
                        <div> 
                            <p>Price</p>
                            <div class="flex w-full justify-between overflow-hidden"> 
                                <input type="text" name="minPrice" class="w-1/2 border mr-2 px-2 focus:outline-none" placeholder="to">
                                <input type="text" name="maxPrice" class="w-1/2 border ml-2 px-2 focus:outline-none" placeholder="from">
                            </div>
                            <div class="flex justify-center mt-2"> 
                                ${Button({text: 'filer', name: 'findWithPrice'})}
                            </div>
                        </div>

                    </div>
                  </div>
                    
                </div>
                <div class="md:w-5/6 ml-3"> 
                    <div class="bg-white px-4 py-3 mb-4 flex items-center justify-between border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div id="showResult">
                            </div>
                        <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                  <span class="sr-only">Previous</span>
                                  <!-- Heroicon name: solid/chevron-left -->
                                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                  </svg>
                                </button>
                                  <!-- Pagination -->                        
                            <div id="pagination"> 
                                ${page}
                            </div>
                            <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                  <span class="sr-only">Next</span>
                                  <!-- Heroicon name: solid/chevron-right -->
                                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                  </svg>
                                </button>
                        </nav>
                        </div>
                    </div>
                </div>
                    <div class=" grid grid-cols-3 gap-5 items-center justify-start" id="products">
                        ${productHTML}
                    </div>
                </div>
            </div>
        `;
    },
};
export default ProductsPage;
