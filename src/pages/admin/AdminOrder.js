import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import OrderApi from "../../api/OrderApi";


const result = (orders) => {
    return orders.map(order => {
        return `<tr class="border-b bg-gray-100">
                    <td class="p-3 px-5">${order.id}</td>
                    <td class="p-3 px-5">${order.data.name}</td>
                    <td class="p-3 px-5">${order.data.email}</td>
                    <td class="p-3 px-5">${new Date(order.created_at)}</td>
                    <td class="p-3 px-5">${order.totalPrice}</td>
                    <td class="p-3 px-5">${order.status === 1 ? `dang xu ly`: `da hoan thanh`}</td>
                     <td class="p-3 px-5 flex justify-end">
                        <a href="/#/admin-edit-ordergory/${order.id}" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Edit
                        </a>
                        <button type="button" data-id="${order.id}" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </td>
                </tr>`
    }).join('');
}

const AdminOrder = {
    async afterRender() {
        let btns = document.querySelectorAll('button[data-id]');
        btns.forEach(btn => {
            const id = btn.dataset.id;

            btn.addEventListener('click', () => {
                const question = confirm('Ban co muon xoa k?')
                if (question) {
                    btn.parentNode.parentNode.remove();
                    OrderApi.remove(id)
                }
            })
        })
    },
    async render() {
        const {data: orders} = await OrderApi.getOrder();
        console.log(orders)
        const resultHTML = result(orders);

        return `
            <div class="flex max-w-[1920px] px-6 my-5 text-white"> 
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
                     </div>
                </div>
            </div>
        `;
    }
}
export default AdminOrder;