import { axiosClient } from "./axiosClient";

const UserApi = {
    register(data) {
        const url = `/register`;
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = `/login`;
        return axiosClient.post(url, data);
    },
    getUser(id,token) {
        const url = `/660/users/${id}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = `/660/users/${data._id}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        return axiosClient.put(url, data);
    }
};
export default UserApi;
