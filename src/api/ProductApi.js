import { axiosClient } from "./axiosClient";

const ProductApi = {
    getAll() {
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    add(product){
        const url = `/products`;
        return axiosClient.post(url, {...product,
            created_at: Date.now(),
            updated_at: Date.now(),
        })
    },
    edit(id, product){
        const url = `/products/${id}`;
        return axiosClient.put(url, product)
    },
    remove(id){
        const url = `/products/${id}`;
        return axiosClient.delete(url)
    }
};
export default ProductApi;
