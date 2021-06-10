import sidebarInfo from "../components/sidebarInfo";
import OrderApi from "../api/OrderApi";
import {clearUser} from "../localStorage";
import {parseRequestUrl} from "../utils";

const OrderDetail = {
    async render() {
        const {id} = parseRequestUrl();
        try {
            const {data: order} = await OrderApi.getOrderDetail(id)
            const listItemHTML = order.orderItems.map(item => {
                return `
                <div class="flex justify-between"> 
                    <div class="flex items-center"> 
                        <div class="overflow-hidden">
                            <img class="w-20 rounded-md" src="${item.image}" alt=""> 
                        </div>
                        <div class="px-4 "> 
                            <p>${item.name}</p>
                            <p>qty: ${item.qty}</p>
                        </div>
                    </div>
                    <div> 
                        <span>${item.price}</span>
                    </div>
                </div>
            `;
            })
            return `
            <div class="flex py-10 px-6">
                <div class="w-1/5 border">
                   ${sidebarInfo.render()}
                </div>
                <div class="w-4/5 ml-5 p-6 border">
                   <h3 class="text-2xl font-bold p-4">Order #${order.id}</h3>
                   <div class="flex "> 
                    <div class="w-3/4 border p-4 mr-4"> 
                        <h4 class="text-xl font-bold mb-4">Shopping Cart</h4>
                        ${listItemHTML}
                    </div>
                    <div class="w-1/4 border p-4"> 
                        <h4 class="text-xl font-bold mb-4">Order Summary</h4>
                        <div class="flex justify-between text-red-500 font-bold"> 
                            <p>Order Total</p>
                            <p>${order.totalPrice}</p>
                        </div>
                    </div>
                   </div>
                </div>
</div>
        `;
        } catch (e) {
            alert('Loi ket noi voi order, vui long login lai')
            clearUser();
            document.location.hash = '/login'
        }


    }
}
export default OrderDetail;