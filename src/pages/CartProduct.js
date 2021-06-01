import "alpinejs";

import {hideLoading, parseRequestUrl, rerender, showLoading} from "../utils";
import ProductApi from "../api/ProductApi";
import {getCartItems, setCartItems} from "../localStorage";


const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    // Kiểm tra tồn tại của product trong cartItem
    const existItem = cartItems.find((x) => x.product === item.product);

    if (existItem) {
        if (forceUpdate) {
            // item đã được thay đổi qty ở phần afterRender()
            // và ta đã kiểm tra item có trong mảng cartItem hay không
            // nên giờ Gán lại item vào mảng mới thay thế cho các item đã tồn tại

            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }

    } else {
        cartItems = [...cartItems, item];
    }
    // Sau đó thay đổi setItem trong localStorage. phương thức này có sẵn
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(CartProduct);
    }
}
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));

    if (id === parseInt(parseRequestUrl().id)) {
        document.location.hash = '/cart';
    } else {
        rerender(CartProduct);
    }
}

const CartProduct = {
    async afterRender() {
        // Tìm ra các button có attribute là plus và minus
        // Sau đó dùng forEach gắn event onClick cho chúng
        let btnPlus = document.querySelectorAll('button[plus]');
        let btnMinus = document.querySelectorAll('button[minus]');
        let btnRemove = document.querySelectorAll('button[delete]');
        btnPlus.forEach(btn => {
            const id = parseInt(btn.dataset.id);
            btn.addEventListener('click', () => {
                const item = getCartItems().find(x => x.product === id);
                addToCart({...item, qty: (item.qty + 1)}, true);
            })
        })
        btnMinus.forEach(btn => {
            const id = parseInt(btn.dataset.id);
            btn.addEventListener('click', () => {
                const item = getCartItems().find(x => x.product === id);
                // nếu qty > 1 thì mới cho giảm
                if (item.qty > 1) {
                    addToCart({...item, qty: (item.qty - 1)}, true);
                }
            })
        })
        btnRemove.forEach(btn => {
            btn.addEventListener('click', () => {

                const id = parseInt(btn.dataset.id);
                removeFromCart(id)
            })
        })
        document.querySelector('#checkout').addEventListener('click', () => {

        })

    },
    async render() {
        const request = parseRequestUrl();
        if (request.id) {
            const {data: product} = await ProductApi.get(request.id);
            addToCart({
                product: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                qty: 1,
            })
        }
        const cartItems = getCartItems();
        return `

    <div class="px-6 my-5">
    <!-- component -->
        <div class="flex justify-center my-6">
            <div class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg md:w-4/5 lg:w-4/5">
                <div class="flex-1">
                   ${cartItems.length === 0
            ? `<div>Cart is empty</div>`
            : `<table class="w-full text-sm lg:text-base" cellspacing="0">
                                <thead>
                                <tr class="h-12 uppercase">
                                    <th class="hidden md:table-cell"></th>
                                    <th class="text-left">Product</th>
                                    <th class="text-center pl-5 lg:pl-0">
                                        <span class="lg:hidden" title="Quantity">Qtd</span>
                                        <span class="hidden lg:inline">Quantity</span>
                                    </th>
                                    <th class="hidden text-right md:table-cell">Unit price</th>
                                    <th class="text-right">Total price</th>
                                </tr>
                                </thead>
                                <tbody>` + cartItems.map(item => `
                                        <tr>
                                            <td class="hidden pb-4 md:table-cell">
                                                <a href="#">
                                                    <img src="${item.image}"
                                                         class="w-20 rounded" alt="Thumbnail">
                                                </a>
                                            </td>
                                            <td>
                                                <div class="flex justify-between items-center"> 
                                                    <a href="/#/products/${item.product}">
                                                        <p>${item.name}</p>
                                                    </a>
                                                    <button class="text-gray-700 p-2 hover:text-red-500 focus:outline-none delete-btn" delete data-id="${item.product}">
                                                       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                
                                            </td>
                                             <td class="hidden text-right md:table-cell">
                                                <div class="flex justify-center items-center">
                                                      <button class="p-2 border" minus data-id="${item.product}" /> 
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span class="mx-3 text-sm lg:text-base font-medium">
                                                        ${item.qty}
                                                    </span> 
                                                    <button class="p-2 border" plus data-id="${item.product}"> 
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="hidden text-right md:table-cell">
                                                      <span class="text-sm lg:text-base font-medium">
                                                        ${item.price}
                                                      </span>
                                            </td>
                                            <td class="text-right">
                                                      <span class="text-sm lg:text-base font-medium">
                                                        ${item.qty * item.price}
                                                      </span>
                                            </td>
                                        </tr>
                                   
                                `).join('')
            + ` </tbody>
                        </table>`
        }
                    <hr class="pb-6 mt-6">
                    <div class="my-4 mt-6 -mx-2 lg:flex">
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Coupon Code</h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-4 italic">If you have a coupon code, please enter it in the box below</p>
                                <div class="justify-center md:flex">
    
                                </div>
                            </div>
                            <div class="p-4 mt-6 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Instruction for seller</h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-4 italic">If you have some information for the seller you can leave them in the
                                    box below</p>
                                <textarea class="w-full h-24 p-2 bg-gray-100 rounded border"></textarea>
                            </div>
                        </div>
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h2 class="ml-2 font-bold uppercase">Order Details</h2>
                                
                            </div>
                            <div class="p-4">
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Total ( ${cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0)} item) 
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                       ${cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.qty * currentValue.price, 0)}
                                    </div>
                                </div>
                                <a href="#">
                                    <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor"
                                                  d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/>
                                        </svg>
                                        <span class="ml-2 mt-5px" id="checkout">Procceed to checkout</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
`;
    },
};

export default CartProduct;
