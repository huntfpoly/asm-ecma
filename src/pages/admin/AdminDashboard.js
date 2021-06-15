import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
// Exporting(Highcharts);
import OrderApi from "../../api/OrderApi";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import HighChart from "../../components/HighCharts";

const AdminDashboard = {
    render() {
            return `
            <div class="flex max-w-[1920px] px-6 my-5 text-white" x-data="{ showModal : false, status: true }"> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('Dashboard')}
                    <div class="px-3 py-4 text-gray-700">
                        <div>
                        <div class="mt-2">
                            <!-- State cards -->
                            <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-3">
                                <!-- Value card -->
                                <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
                                    <div>
                                        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                                            Doanh thu
                                        </h6>
                                        <span class="text-xl font-semibold">212<sup>d</sup></span>
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
                                        <span class="text-xl font-semibold">10</span>
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
                                        <span class="text-xl font-semibold">12312</span>
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
                                    <div id="users">2</div>
                                </div>
                                <div class="p-6">
                                    <div id="orders">3</div>
                                </div>
                                
                            </div>
                        </div>        
                     </div>
                </div>
            </div>
        `;
        // } catch (e) {
        //     alert('Loi ket noi voi dashboard, vui long login lai')
        //     // clearUser();
        //     // document.location.hash = '/login'
        // }
    },
    async afterRender() {
        const {data: revenue} = await OrderApi.getOrder()
        console.log(revenue)

        const data ={
            id:'revenue',
            title: 'Doanh thu 2020',
            yAxis:'don vi nghin do',
            xAxis:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data:[
                {
                    name:"Tiền thu vào",
                    data: [1,2,3,4,5,6,7,8,9,10,11,12]
                }
            ]
        }
        HighChart(data)
    }
}
export default AdminDashboard;