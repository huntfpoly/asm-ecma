import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import OrderApi from "../../api/OrderApi";
import {clearUser} from "../../localStorage";
import Button, {ButtonLink} from "../../components/Button";
import 'alpinejs'

const result = (orders) => {
    return orders.map(order => {

        return `<tr class="border-b bg-gray-100">
                    <td class="p-3 px-5">${order.id}</td>
                    <td class="p-3 px-5">${order.data.lastName}</td>
                    <td class="p-3 px-5">${order.data.email}</td>
                    <td class="p-3 px-5">${new Date(order.created_at)}</td>
                    <td class="p-3 px-5">${order.totalPrice}</td>
                    <td class="p-3 px-5">
                        <button type="button" data-status="${order.id}" class="bg-yellow-300" name="status" data-value="${order.status}"> 
                            ${order.status === false? `dang xu ly`: `Da xac nhan`}
                       </button>
                    </td>
                    <td class="p-3 px-5 flex justify-end">
                        <button type="button" @click="showModal = !showModal" name="${order.id}" class="text-lg text-white bg-green-500 hover:bg-green-700  py-1 px-2 mx-1 
                                rounded focus:outline-none">View</button>
                        <button data-update="${order.id}" disabled class="text-lg text-white bg-blue-500 hover:bg-blue-700  py-1 px-2 mx-1 
                                rounded focus:outline-none disabled:opacity-50">Update</button>
                    </td>
                </tr>`
    }).join('');
}

const AdminOrder = {
    async afterRender() {
        let btnViewOrder = document.querySelectorAll('button[name]')
        let btnStatus = document.querySelectorAll('button[name="status"]')
        let btnUpdate = document.querySelectorAll('button[name=update]')
        btnViewOrder.forEach(btn => {
            const id = btn.name
            btn.addEventListener('click', async () => {

                const {data: {data, id: idOrder, orderItems, totalPrice}} = await OrderApi.getOrderDetail(id)
                const bodyOrderDetail = orderItems.map(item => {
                    return `
                        <div class="flex justify-between hover:bg-gray-50 md:space-y-0 space-y-1 border-b">
                            <p class="text-green-600">${item.name}</p>
                            <span>x ${item.qty}</span>
                        </div>
                    `;
                }).join('')
                const orderDetailHTML = `
                    <span class="font-bold block text-2xl mb-3">Order Detail - #${id}</span>
                    <div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p class="text-gray-600">
                                Full name
                            </p>
                            <p>
                                ${data.firstName} ${data.lastName}
                            </p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p class="text-gray-600">Total Item: </p>
                            <p>${orderItems.length}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p class="text-gray-600">Total Price: </p>
                            <p>${totalPrice}</p>
                        </div>
                        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p class="text-gray-600">Products: </p>
                            <div> 
                                ${bodyOrderDetail}
                            </div>
                        </div>
                        
                    </div>
                `;

                document.querySelector('#showModalContent').innerHTML = orderDetailHTML;
            })
        })

        btnStatus.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const idStatus = btn.dataset.status;
                const isAccept = btn.dataset.value

                if (isAccept === 'true'){
                    btn.setAttribute('data-value','false')
                } else {

                    btn.setAttribute('data-value','true')
                }
                btn.innerHTML = btn.dataset.value === 'true' ? 'Da xac nhan': 'dang xu ly';

                const btnUpdate = document.querySelector(`button[data-update="${idStatus}"]`)
                btnUpdate.disabled = false
                btnUpdate.addEventListener('click', async () => {

                    const status = btn.dataset.value === "true";
                    const {data} = await OrderApi.getOrderDetail(idStatus)
                    const newOrder = {...data,status}
                    console.log(newOrder)
                    await OrderApi.update(idStatus, newOrder)
                    alert('update success')
                    btnUpdate.disabled = true;
                })
            })
        })
        btnUpdate.forEach(btn => {
            btn.addEventListener('click', () => {
                const b = document.querySelector('button[name=status]')
            })
        })
    },
    async render() {
        try {
            const {data: orders} = await OrderApi.getOrder();
            orders.sort((a,b) => b.created_at - a.created_at)
            const resultHTML = result(orders);

            return `
            
            <div class="flex max-w-[1920px] px-6 my-5 text-white" x-data="{ showModal : false, status: true }"> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('List Order')}
                    <div class="px-3 py-4 text-gray-700">
<!--                        <div class="flex justify-end">   -->
<!--                            <a href="/#/admin-add-category" class="text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 -->
<!--                                    rounded cursor-pointer">-->
<!--                                Create-->
<!--                            </a>-->
<!--                        </div>-->
                        <table class="w-full text-md bg-white shadow-md rounded mb-4">
                            <thead> 
                                <tr class="border-b"> 
                                    <th class="text-left p-3 px-5">Id</th>
                                    <th class="text-left p-3 px-5">Name</th>
                                    <th class="text-left p-3 px-5">Email</th>
                                    <th class="text-left p-3 px-5"  class=" flex items-center">
                                        Date
                                        <button data-sort="name">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                            </svg>  
                                        </button>
                                    </th>
                                    <th class="text-left p-3 px-5">Total price</th>
                                    <th class="text-left p-3 px-5">Status</th>
                                    <th class="text-left p-3 px-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody id="cate-sort">
                                    ${resultHTML}
                            </tbody>
                        </table>
                        <div class="m-10">
                            <div x-show="showModal" class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0" x-transition:enter="transition ease duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">
                                <!-- Modal -->
                                <div x-show="showModal" class="bg-white rounded-xl shadow-2xl p-6 sm:w-1/3 mx-10" @click.away="showModal = false" x-transition:enter="transition ease duration-100 transform" x-transition:enter-start="opacity-0 scale-90 translate-y-1" x-transition:enter-end="opacity-100 scale-100 translate-y-0" x-transition:leave="transition ease duration-100 transform" x-transition:leave-start="opacity-100 scale-100 translate-y-0" x-transition:leave-end="opacity-0 scale-90 translate-y-1">
                                    <div id="showModalContent"> 
                                        
                                    </div>
                                    <!-- Buttons -->
                                    <div class="text-right space-x-5 mt-5">
                                        <button @click="showModal = !showModal" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Cancel</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        `;
        } catch (e) {
            alert('Loi ket noi voi order, vui long login lai')
            // clearUser();
            // document.location.hash = '/login'
        }

    }
}
export default AdminOrder;