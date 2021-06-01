import CategoriesApi from "../api/CategoriesApi";
import "alpinejs";

const Header = {
    async render() {
        const {data: categories} = await CategoriesApi.getAll();
        // console.log(categories)
        const result = categories.map((category) => {
            return `
                <li><a href="#" class="inline-block py-2 px-3 z-30 hover:text-gray-700 no-underline">${category.name}</a></li>
            `;
        })
            .join("");

        return `
        <div class=" w-full" x-data="{ open: false, openCate: false }" >
            <nav class="font-sans h-20 px-6 bg-white text-center flex justify-between items-center py-4 mx-auto max-w-[1920px] overflow-hidden">
                <a href="/" class="block text-left">
                    <img src="https://stitches.hyperyolo.com/images/logo.png" class="h-10 sm:h-10 rounded-full" alt="logo" />
                </a>
                <ul class="text-sm list-none p-0 flex items-center text-base text-gray-900">
                    <li class="pr-2"><a href="/#" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Home</a></li>
                    <li><a href="/#/products" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Products</a></li>
                    <li class="flex items-center group cursor-pointer  px-2 py-3" @click="openCate = true"> 
                        <span class="group-hover:text-blue-500">Categories</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <ul class="absolute z-10 top-20 bg-gray-200" x-show="openCate"  @click.away="openCate = false"> 
                            ${result}
                        </ul>
                    </li>
                    <li class="pl-2 border-l"><a href="/#/sign-in" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Log In</a></li>
                    <li><a href="/#/admin-categories" class="inline-block py-2 px-3  hover:text-blue-500 no-underline">Log In</a></li>
                    <li  >
                        <div class="cursor-pointer" @click="open = true">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            
                        </div>
                        <div  x-show="open"
                            class="w-screen h-screen absolute z-10 bg-opacity-30 bg-black top-0 right-0 " >
                            <div  class="w-3/12 h-full  flex flex-col justify-between absolute bg-white right-0 ">
                                <div class="w-full flex justify-between items-center relative md:px-6 py-0.5 border-b border-gray-100">
                                    <h2 class="font-bold text-xl md:text-2xl m-0 ">Shopping cart</h2>
                                    <button  @click="open = false" class="flex text-2xl items-center justify-center text-gray-500  py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60" aria-label="close">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-black mt-1 md:mt-0.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center" style="opacity: 1; transform-origin: 50% 50% 0px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h3 class="text-lg text-heading font-bold pt-8">Your cart is empty.</h3>
                                </div>
                                <div class="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7">
                                    <a class="w-full px-5 py-3 md:py-4 flex items-center justify-center text-white rounded-md text-sm sm:text-base  focus:outline-none transition duration-300 bg-gray-400 hover:bg-blue-500" href="/">
                                        <span class="w-full -mt-0.5 py-0.5">Proceed To Checkout</span>
                                        <span class="mx-auto flex-shrink-0 -mt-0.5 py-0.5">
                                        <span class="border-s border-white py-0.5"></span>$0.00</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            
        </div>
        
  
        `;
    },
};
export default Header;
