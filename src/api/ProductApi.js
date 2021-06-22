import { axiosClient } from "./axiosClient";
import { getUserInfo } from "../localStorage";

const {token} = getUserInfo()
const ProductApi = {
  getAll() {
    const url = `/products?_sort=updated_at&_order=desc`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getPage(countPage = 1, limit = 10) {
    const url = `/products?_page=${countPage}&_limit=${limit}`;
    return axiosClient.get(url);
  },
  getCatePage(id) {
    const url = `/categories/${id}/products`;
    return axiosClient.get(url);
  },
  add(product) {
    const url = `/products`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosClient.post(url, product);
  },
  edit(id, product) {
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `/products/${id}`;
    return axiosClient.put(url, product);
  },
  remove(id) {
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  search(name) {
    const url = `/products?name_like=${name}`;
    return axiosClient.get(url);
  },

  // Attribute product
  getAllAttributes() {
    const url = `/attributes`;
    return axiosClient.get(url);
  },
  AddAttribute(data) {
    const url = `/attributes`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return axiosClient.post(url,data);
  },
  getAttribute(id) {
    const url = `/attributes/${id}`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  RemoveAttribute(id) {
    const url = `/attributes/${id}`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosClient.delete(url);
  },
  AttributeValue(id, data) {
    const url = `/attributes/${id}`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return axiosClient.put(url,data);
  },
  EditAttributeValue(id, data) {
    const url = `/attributes/${id}`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return axiosClient.put(url,data);
  },
  RemoveAttributeValue(id, data) {
    const url = `/attributes/${id}`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return axiosClient.put(url, data);
  },
};
export default ProductApi;
