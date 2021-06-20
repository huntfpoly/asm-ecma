import {formatNumber, parseRequestUrl, rerender} from "../utils";
import 'alpinejs'
import ProductApi from "../api/ProductApi";
import {addToCart} from "./CartProduct";
import Header from "../components/Header";

const ProductDetailPage = {
    async afterRender() {
        let dataColor;
        const {id} = parseRequestUrl();
        let {data: product} = await ProductApi.get(id);
        const nodeDataSize = document.querySelector('#sizeData');
        const dataSize = nodeDataSize.value

        const colorArr = document.querySelectorAll('button[data-color]');
        const btnAddToCart = document.querySelector('#cart-button')
        // choose color
        colorArr.forEach(btn => {
            btn.addEventListener('click', () => {
                btnAddToCart.disabled = false
                dataColor = btn.dataset.color
                const {price, quantity} = product.sku.find(item => item.size === dataSize && item.color === dataColor)
                console.log(quantity)
                document.querySelector('#priceProduct').innerHTML
                    = `<span class="title-font font-medium text-2xl text-red-600" >${formatNumber(price)} <sup>vnd</sup></span>`
                document.querySelector('#stockProduct').innerHTML = `stock: <span class="ml-2">${quantity}</span>`
                // console.log(document.querySelector('#stockProduct'))
            })
        })
        // Choose size
        nodeDataSize.addEventListener('change', () => {
            if (dataColor) {
                const {
                    price,
                    quantity
                } = product.sku.find(item => item.size === nodeDataSize.value && item.color === dataColor)
                document.querySelector('#priceProduct').innerHTML
                    = `<span class="title-font font-medium text-2xl text-red-600" >${formatNumber(price)} <sup>vnd</sup></span>`

                document.querySelector('#stockProduct').innerHTML = `stock: ${formatNumber(quantity)}`
            }
        })
        // neu mau va size chon thi moi cho add to cart
        btnAddToCart.addEventListener('click', async () => {
            const sku = product.sku.find(item => item.size === dataSize && item.color === dataColor)
            console.log(sku)
            if (dataSize && dataColor) {
                const {data: product} = await ProductApi.get(id);
                await addToCart({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: sku.price,
                    color: sku.color,
                    size: sku.size,
                    shortDescription: product.shortDescription,
                    description: product.description,
                    qty: 1,
                })
                rerender(Header, 'header')
                alert('THem gio hang thanh cong')
            }
            // document.location.hash = `/cart/${id}`;
            // console.log('moi chon mau')
        })

    },
    async render() {
        const {id} = parseRequestUrl();
        const {data: {name, shortDescription, image, description, sku}} = await ProductApi.get(id);
        const size = [...new Set([...sku].map(s => s.size))]
        const price = [...sku].map(s => s.price)
        const color = [...new Set([...sku].map(s => s.color))]
        const minPrice = Math.min(...price)
        const maxPrice = Math.max(...price)


        const colorHTML = color.map(item => {
            return `
                <button data-color="${item}" :class="{ 'border-4 border-green-500': chooseColor === '${item}' }" @click="chooseColor = '${item}'" class="border-gray-300 border-2 rounded-full w-6 h-6 focus:outline-none bg-${item}-500"></button>
            `
        }).join('')
        const sizeHTML = size.map(item => {
            return `
                <option value="${item}" class="uppercase">${item}</option>
            `
        }).join('')

        return `
        <div class="max-w-[1920px] flex flex-wrap items-center justify-start">
             <div class="container mx-auto px-6">
               <section class="text-gray-700 body-font overflow-hidden bg-white">
                  <div class="container px-5 py-10 mx-auto">
                    <div class=" mx-auto flex flex-wrap">
                      <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="${image}">
                      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
<!--                        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>-->
                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">${name}</h1>
                        <div class="flex mb-4 text-red-500 " >
                            <div > 
                                ${new Intl.NumberFormat('vi').format(minPrice)} <sup>vnd</sup>
                               - ${new Intl.NumberFormat('vi').format(maxPrice)} <sup> vnd</sup>
                           </div>
                           <div class="flex ml-6 text-primary" id="stockProduct"> 
                              
                           </div>
                        </div>
                        <p class="leading-relaxed">${shortDescription}</p>
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                          <div class="flex" x-data="{ chooseColor: null,  activeClasses: 'border-2' }" >
                            <span class="mr-3">Color</span>
                            ${colorHTML}
                          </div>
                          <div class="flex ml-6 items-center">
                            <span class="mr-3">Size</span>
                            <div class="relative">
                              <select id="sizeData" class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                ${sizeHTML}
                              </select>
                              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="flex" >
                            <div id="priceProduct" class="text-red-500 font-bold text-xl"> 
                              
                            </div>
                            <button id="cart-button" type="button" disabled class="flex ml-auto text-white bg-red-500  border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded disabled:opacity-50" >Add To Cart</button>
<!--                          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">-->
<!--                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">-->
<!--                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>-->
<!--                            </svg>-->
<!--                          </button>-->
                        </div>
                      </div>
                    </div>
<!-- description - comments - review -->
<div>
  <div 
    x-data="{
      openTab: 1,
      activeClasses: 'border-l border-t border-r rounded-t text-blue-700 focus:outline-none',
      inactiveClasses: 'text-blue-500 hover:text-blue-800 focus:outline-none'
    }" 
    class="p-6"
  >
    <ul class="flex border-b">
      <li @click="openTab = 1" :class="{ '-mb-px': openTab === 1 }" class="-mb-px mr-1">
        <button :class="openTab === 1 ? activeClasses : inactiveClasses" class="bg-white inline-block py-2 px-4 font-semibold" >
          Description
        </button>
      </li>
      <li @click="openTab = 2" :class="{ '-mb-px': openTab === 2 }" class="mr-1">
        <button :class="openTab === 2 ? activeClasses : inactiveClasses" class="bg-white inline-block py-2 px-4 font-semibold" >Comments</button>
      </li>
      <li @click="openTab = 3" :class="{ '-mb-px': openTab === 3 }" class="mr-1">
        <button :class="openTab === 3 ? activeClasses : inactiveClasses" class="bg-white inline-block py-2 px-4 font-semibold" >Review</button>
      </li>
    </ul>
    <div class="w-full pt-4">
      <div x-show="openTab === 1">  
        <div class="p-4">${description}</div>
      </div>
      <div x-show="openTab === 2">Upgrading feature...</div>
      <div x-show="openTab === 3">Upgrading feature...</div>
    </div>
  </div>
</div>


                  </div>
                </section>
            </div>
        </div>
        `;
    },
};
export default ProductDetailPage;