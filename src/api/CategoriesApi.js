import { axiosClient } from "./axiosClient";

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
        const url = `/categories`;
        return axiosClient.post(url,
            {...category,
                created_at: Date.now(),
                updated_at: Date.now(),
            })
    },
    edit(id, category){
        const url = `/categories/${id}`;
        return axiosClient.put(url, category)
    },
    remove(id){
        const url = `/categories/${id}`;
        return axiosClient.delete(url)
    }
};
export default CategoriesApi;
