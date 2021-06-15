import {cleanCart, getCartItems, getUserInfo} from "../localStorage";
import Validator from "../../public/js/validator";
import {hideLoading, showLoading} from "../utils";
import OrderApi from "../api/OrderApi";
import InputForm from "../components/InputForm";

const convertCartToOrder = ({data, userId}) => {
    const orderItems = getCartItems();
    const totalPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    return {
        orderItems,
        totalPrice,
        data,
        status: 1,
        userId
    }
}

const Checkout = {
    afterRender() {
        let form = new Validator('#formCheckout');
        form.onSubmit = async (data) => {
            const {_id: userId} = getUserInfo();
            const order = convertCartToOrder({data, userId});

            showLoading();
            try {
                const dataOrder = await OrderApi.createOrder(order);
                cleanCart();
                document.location.hash = `/order/${dataOrder.data.id}`;
            } catch (e) {
                alert(e)
            }
            hideLoading();

        };
    },
    async render() {
        const {lastName, firstName, email} = getUserInfo();
        const cartItems = getCartItems();
        const listItem = cartItems.map(item => {
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
        })
        if (lastName !== '') {
            return `
                <div class="container mx-auto px-6">
            <h3 class="text-gray-700 text-2xl font-medium">Checkout</h3>
            <div class="flex flex-col lg:flex-row mt-8">
                <div class="w-full lg:w-1/2 order-2">
                    <div class="mt-8 lg:w-3/4">
                       <form action="" method="POST" class="form" id="formCheckout">
                            ${InputForm({label:'Fisrt Name',nameInput:'firstName', value: firstName?firstName:''})}
                            ${InputForm({label:'Last Name',nameInput:'lastName', value: lastName?lastName:''})}
                            ${InputForm({label:'Email',nameInput:'email', value: email?email:'', typeInput:'email'})}
                            ${InputForm({label:'Address',nameInput:'address'})}

                            <div class="flex justify-center"> 
                                <button class="form-submit text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 
                                    rounded cursor-pointer">Place Order</button>
                            </div> 
                        </form>
                    </div>
                </div>
                <div class="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2">
                    <div class="flex justify-center lg:justify-end">
                        <div class="border rounded-md max-w-md w-full px-4 py-3">
                            <div class="flex items-center justify-between">
                                <h3 class="text-gray-700 font-medium">Order total (${cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0)})</h3>
                            </div>
                            ${listItem}
                            <div class="flex justify-between items-center"> 
                                <h3 class="text-2xl font-bold uppercase">total price</h3>
                               <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                   ${cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.qty * currentValue.price, 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
             `;
        }
        window.location.href = 'http://localhost:8080/#/login';
    }
}
export default Checkout;