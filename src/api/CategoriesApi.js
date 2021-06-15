import { axiosClient } from "./axiosClient";
import {getUserInfo} from "../localStorage";

const CategoriesApi = {
    getAll() {
        const url = `/categories`;
        return axiosClient.get(url);
    },
    getAllSort(field, typeSort) {
        const url = `/categories?_sort=${field}&_order=${typeSort}`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(category){
        const url = `/660/categories`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.post(url,category)
    },
    edit(id, category){
        const url = `/660/categories/${id}`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.put(url, category)
    },
    remove(id){
        const url = `/660/categories/${id}`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.delete(url)
    }
};
export default CategoriesApi;
