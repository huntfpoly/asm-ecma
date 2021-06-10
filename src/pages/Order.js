import sidebarInfo from "../components/sidebarInfo";
import OrderApi from "../api/OrderApi";
import {clearUser} from "../localStorage";

const Order = {

    async render() {
        try {
            const {data: listOrder} = await OrderApi.getOrder();
            const listOrderHTML = listOrder.map(item => {
                return `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-blue-500">#${item.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap ">${new Date(item.created_at)}</td>
                    
                     <td class="px-6 py-4 whitespace-nowrap text-green-500">
                       ${item.orderItems.length}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-500">
                       ${item.totalPrice}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap ">
                            <p>Đang xử lý</p>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                        <a href="/#/order/${item.id}"
                           class="rounded bg-gray-300 px-3 py-1 hover:text-white hover:bg-gray-500">Xem</a>
                    </td>
                </tr>`;
            }).join('')
            return `
            <div class="flex py-10 px-6">
                <div class="w-1/5 border">
                   ${sidebarInfo.render()}
                </div>
                <div class="w-4/5 ml-5 ">
                    ${listOrder.length > 0 ?
                `<table class=" border-collapse divide-y divide-gray-200 border-2 w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đơn hàng
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số lượng item
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tình trạng
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Các thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 text-sm">
                            ${listOrderHTML}
                        </tbody>
                    </table>`
                : `<p>Chưa có đơn hàng nào</p>`}
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
export default Order;