import * as moment from 'moment'
import OrderApi from "../../api/OrderApi";
import LayoutAdmin from "../../components/LayoutAdmin";
import HighChart from "../../components/HighCharts";
import UserApi from "../../api/UserApi";
import {clearUser, getUserInfo} from "../../localStorage";

const AdminDashboard = {
    async render() {
        try {
            const {data: orders} = await OrderApi.getOrder()
            const {token} = getUserInfo();
            const {data: users} = await UserApi.getAll(token);
            console.log(orders)
            const revenue = orders.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0)
            const html = ` 
            <div class="mt-2">
                <!-- State cards -->
                <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-3">
                    <!-- Value card -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                        <div>
                            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                                Doanh thu
                            </h6>
                            <span class="text-xl font-semibold">
                                ${new Intl.NumberFormat('vi').format(revenue)}<sup>vnd</sup> 
                            </span>
                        </div>
                        <div>
                            <span>
                              <svg
                                  class="w-12 h-12 text-gray-300 dark:text-primary-dark"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                        </div>
                    </div>
        
                    <!-- Users card -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                        <div>
                            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                                Tài khoản
                            </h6>
                            <span class="text-xl font-semibold">${users.length}</span>
                        </div>
                        <div>
                            <span>
                              <svg
                                  class="w-12 h-12 text-gray-300 dark:text-primary-dark"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                            </span>
                        </div>
                    </div>
        
                    <!-- Orders card -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                        <div>
                            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                                Đặt hàng
                            </h6>
                            <span class="text-xl font-semibold">${orders.length}</span>
                        </div>
                        <div>
                            <span>
                              <svg
                                  class="w-12 h-12 text-gray-300 dark:text-primary-dark"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                              </svg>
                            </span>
                        </div>
                    </div>
        
                </div>
        
                <!-- Charts -->
                <div class="grid grid-cols-3 gap-3">
                    <div class="p-6">
                        <div id="revenue"></div>
                    </div>
                    <div class="p-6">
                        <div id="users">column</div>
                    </div>
                    <div class="p-6">
                        <div id="orders">circle</div>
                    </div>
                    
                </div>
            </div>      
        `
            return `
            ${LayoutAdmin(html, 'Admin Dashboard')}
        `;
        } catch (e) {
            alert('het han dang nhap')
            clearUser()
            window.location.hash = '/'
        }
    },
    async afterRender() {
        let revenueMonthJan = 0;
        let revenueMonthFeb = 0;
        let revenueMonthMar = 0;
        let revenueMonthApr = 0;
        let revenueMonthMay = 0;
        let revenueMonthJun = 0;
        let revenueMonthJul = 0;
        let revenueMonthAug = 0;
        let revenueMonthSep = 0;
        let revenueMonthOct = 0;
        let revenueMonthNov = 0;
        let revenueMonthDec = 0;
        let {data: orders} = await OrderApi.getOrder()
        moment.locale('vi')
        const revenueArray = orders.reduce((accumulator, currentValue, index) => {
            if (moment(currentValue.updated_at).year() === 2021) {
                switch (moment(currentValue.updated_at).month()) {
                    case 1:
                        revenueMonthJan += currentValue.totalPrice;
                        accumulator[0] = revenueMonthJan
                        break;
                    case 2:
                        revenueMonthFeb += currentValue.totalPrice
                        accumulator[1] = revenueMonthFeb
                        break;
                    case 3:
                        revenueMonthMar += currentValue.totalPrice
                        accumulator[2] = revenueMonthMar
                        break;
                    case 4:
                        revenueMonthApr += currentValue.totalPrice
                        accumulator[3] = revenueMonthApr
                        break;
                    case 5:
                        revenueMonthMay += currentValue.totalPrice
                        accumulator[4] = revenueMonthMay
                        break;
                    case 6:
                        revenueMonthJun += currentValue.totalPrice
                        accumulator[5] = revenueMonthJun
                        break;
                    case 7:
                        revenueMonthJul += currentValue.totalPrice
                        accumulator[6] = revenueMonthJun
                        break;
                    case 8:
                        revenueMonthAug += currentValue.totalPrice
                        accumulator[7] = revenueMonthAug
                        break;
                    case 9:
                        revenueMonthSep += currentValue.totalPrice
                        accumulator[8] = revenueMonthSep
                        break;
                    case 10:
                        revenueMonthOct += currentValue.totalPrice
                        accumulator[9] = revenueMonthOct
                        break;
                    case 11:
                        revenueMonthNov += currentValue.totalPrice
                        accumulator[10] = revenueMonthNov
                        break;
                    case 12:
                        revenueMonthDec += currentValue.totalPrice
                        accumulator[11] = revenueMonthDec
                        break;

                    default:
                        break;
                }
                return accumulator
            }

        }, [])

        for (let i = 0; i < revenueArray.length; i++) {
            revenueArray[i] = revenueArray[i] === undefined ? 0 : revenueArray[i];
        }

        // console.log(revenueArray)
        const data = {
            id: 'revenue',
            title: 'Doanh thu 2020',
            yAxis: 'don vi nghin do',
            xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [
                {
                    name: "Tiền thu vào",
                    data: revenueArray
                }
            ]
        }
        HighChart(data)
    }
}
export default AdminDashboard;