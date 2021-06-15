import CategoriesApi from "../api/CategoriesApi";
import "alpinejs";
import {clearUser, getCartItems, getUserInfo} from "../localStorage";
import ProductApi from "../api/ProductApi";
import {rerender} from "../utils";
import HomePage from "../pages/HomePage";
import {addToCart, removeFromCart} from "../pages/CartProduct";

const listCart = (itemCart) =>
    itemCart.map(item => {
        return `
       <div class="flex justify-between mt-6">
            <div class="flex">
                <img class="h-20 w-20 object-cover rounded" src="${item.image}" alt="">
                <div class="mx-3">
                    <h3 class="text-sm text-gray-600">${item.name}</h3>
                    <div class="flex items-center mt-2">
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span class="text-gray-700 mx-2">${item.qty}</span>
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <span class="text-gray-600">${item.price}</span>
        </div>
        `;
        }).join('')
const Header = {
    async afterRender() {
        // Search
        const inputSearch = document.querySelector("input[type='search']");

        inputSearch.addEventListener('keyup', async () => {
            if (inputSearch.value !== '') {
                const {data: products} = await ProductApi.search(inputSearch.value)
                products.length = products.length > 5 ? 5 : products.length;
                const result = products.map(pro => {
                    return `
                        <a href="/#/products/${pro.id}" class="block"> 
                            <div class="w-full hover:text-white"> 
                             <div class="flex flex-col ">
                                <div class="bg-white shadow-md p-4 text-gray-600 hover:bg-blue-500 hover:text-white">
                                    <div class="lg:flex ">
                                        <div class="mb-3 w-1/4">
                                            <img src="${pro.image}"
                                                alt="Just a flower" class=" object-scale-down lg:object-cover rounded">
                                        </div>
                                        <div class="flex-auto ml-3 justify-evenly py-2">
                                            <div class="py-4  text-sm ">
                                                <p class="">${pro.name}</p>
                                            </div>
                                            <div class="py-4  text-sm ">
                                                <p class="">${pro.price}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                    `;
                }).join('');

                document.querySelector('#search').innerHTML = result;
            } else {
                document.querySelector('#search').innerHTML = '';
            }
        })
        // Logout
        if (document.querySelector('#signOut-btn')) {
            document.querySelector('#signOut-btn').addEventListener('click', async () => {
                clearUser();
                document.location.hash = '/';
            });
        }
        // Cart

        let btnPlus = document.querySelectorAll('button[plusCartHeader]');
        let btnMinus = document.querySelectorAll('button[minusCartHeader]');
        let btnRemove = document.querySelectorAll('button[deleteCartHeader]');

        btnPlus.forEach(btn => {
            const id = btn.dataset.id;
            console.log(btnPlus)
            btn.addEventListener('click', () => {
                console.log(id)
                const item = getCartItems().find(x => x.product === id);
                addToCart({...item, qty: (item.qty + 1)}, true);
                // let cartItems = getCartItems();
                // document.querySelector('#productCartHeader').innerHTML = listCart(cartItems)
            })
        })
        btnMinus.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', () => {
                const item = getCartItems().find(x => x.product === id);
                // nếu qty > 1 thì mới cho giảm
                if (item.qty > 1) {
                    addToCart({...item, qty: (item.qty - 1)}, true);
                }
            })
        })
        btnRemove.forEach(btn => {
            const id = btn.dataset.id;

            btn.addEventListener('click', () => {
                console.log(btn)
                removeFromCart(id)
            })
        })
    },
    async render() {
        const {token, isAdmin, avatar, lastName} = getUserInfo();
        const cartItems = getCartItems();
        const {data: categories} = await CategoriesApi.getAll();


        const result = categories.map((category) => {
            return `
                <li><a href="/#/category/${category.id}" class="inline-block w-full py-2 px-3 z-30 hover:bg-blue-500 hover:text-white no-underline">${category.name}</a></li>
            `;
        })
            .join("");

        const listCartItem = listCart(cartItems)


        return `
        <div class=" w-full select-none relative" x-data="{ cartOpen: false, openCate: false, openUser: false }" >
            <nav class="font-sans h-20 px-6 bg-white text-center flex  justify-between items-center py-4 mx-auto max-w-[1920px] ">
                <a href="/" class="block text-left">
                    <img src="https://stitches.hyperyolo.com/images/logo.png" class="h-10 sm:h-10 rounded-full" alt="logo" />
                </a>
                <div class="w-1/3 pt-2 relative mx-auto text-gray-600 relative">
                    <input class="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                      type="search" name="search" placeholder="Search">
                    <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                      <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                        viewBox="0 0 56.966 56.966" xml:space="preserve"
                        width="512px" height="512px">
                        <path
                          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                      </svg>
                    </button>
                    <div id="search" class="absolute w-full top-full left-0 bg-gray-100 rounded z-10 overflow-hidden"> 
                        
                        
                    </div>
                  </div>
                <ul class="text-sm list-none p-0 flex items-center text-base text-gray-900">
                    <li class="pr-2"><a href="/#" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Home</a></li>
                    <li><a href="/#/products" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Products</a></li>
                    <li class="relative flex items-center group cursor-pointer  px-2 py-3" @click="openCate = true"> 
                        <span class="group-hover:text-blue-500">Categories</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <ul class="absolute z-10  top-full right-0 bg-gray-100 rounded" x-show="openCate"  @click.away="openCate = false"> 
                            ${result}
                        </ul>
                    </li>
                    
                    ${token ? `<li class=" relative flex items-center group cursor-pointer  px-2 py-3" @click="openUser = true"> 
                        <div class="flex justify-center items-center space-x-3 cursor-pointer">
                          <div class="h-10 w-10 rounded-full overflow-hidden ">
                            <img src="${avatar}" alt="" class="w-full h-full object-cover">
                          </div>
                          <div class="">
                            <div class="cursor-pointer">${lastName}</div>
                          </div>
                        </div>
                        <ul class="w-full absolute z-10 top-full right-0 bg-gray-100 rounded" x-show="openUser"  @click.away="openUser = false"> 
                            <li > 
                                ${isAdmin?`<a href="/#/admin-categories" class="inline-block w-full py-2 px-3  hover:text-blue-500 no-underline">DashBoard</a>`:''}
                            </li>
                                <li > 
                                <a href="/#/profile" class="inline-block w-full py-2 px-3  hover:text-blue-500 no-underline">Profile</a>
                            </li>
                            <li > 
                                <a href="/#/orders" class="inline-block w-full py-2 px-3  hover:text-blue-500 no-underline">Order</a>
                            </li>
                            
                             <li > 
                                <button id="signOut-btn" class="inline-block w-full py-2 px-3  hover:text-blue-500 no-underline">Log out</button>
                            </li>
                        </ul>
                    </li>` :
                    `<li class="pl-2 border-l">
                        <a href="/#/sign-in" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Log In</a>
                        <a href="/#/sign-up" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Sign Up</a>
                    </li>`
                    }
                    <li  >
                        <div class="cursor-pointer relative" @click="cartOpen = !cartOpen">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span class="absolute -top-2/3 text-red-500 font-bold">${cartItems.length}</span>
                        </div>
                        <div :class="cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'" class="z-10 fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300">
                            <div class="flex items-center justify-between">
                                <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
                                <button @click="cartOpen = !cartOpen" class="text-gray-600 focus:outline-none">
                                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <hr class="my-3">
                            ${listCartItem}           
                            <a href="/#/checkout" class="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                <span>Chechout</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            
        </div>
        
  
        `;
    },
};
export default Header;
