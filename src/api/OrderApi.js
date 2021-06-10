import { axiosClient } from "./axiosClient";
import {getUserInfo} from "../localStorage";
const OrderApi = {
    createOrder(order) {
        const url = '/660/orders';
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.post(url, order);
    },
    getOrder() {
        const url = '/660/orders';
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.get(url);
    },
    getOrderDetail(id) {
        const url = `/660/orders/${id}`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.get(url);
    },
    remove(id) {
        const url = `/660/orders/${id}`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.delete(url);
    },

}
export default OrderApi;