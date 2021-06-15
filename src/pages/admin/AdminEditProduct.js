import firebase from "../../firebase";
import {parseRequestUrl} from "../../utils";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import CategoriesApi from "../../api/CategoriesApi";
import Button, {ButtonLink} from "../../components/Button";
import InputForm from "../../components/InputForm";

const AdminEditProduct = {
    async render() {
        const {id} = parseRequestUrl();
        const {data: product} = await ProductApi.get(id);
        const {data: categories} = await CategoriesApi.getAll();
        const categoriesHTML = (cateId) => categories.map(cate => {
            return `
                <option value="${cate.id}" ${cate.id === cateId ? `selected` : null} >${cate.name}</option>
            `;
        }).join('')
        return `
            <div class="max-w-[1920px] flex px-6 my-5 text-white"> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('Edit Products')}
                    <div class="px-3 py-4 text-gray-700">
                        <div class="flex justify-end">   
                        ${ButtonLink(
                            {
                                linkUrl: `/#/admin-products`,
                                text:'back',
                                bg: 'bg-gray-500',
                                hoverBg: 'bg-gray-700'
                            }
                        )}
                        </div>
                        <div> 
                           <form action="" method="POST" class="form" id="formEdit">
                                ${InputForm({label:'name', nameInput:'name',value:product.name, rules:'required'})}
                                ${InputForm({label:'slug', nameInput:'slug',value:product.slug, rules:'required'})}
                                ${InputForm({label:'price', nameInput:'price',value:product.price, rules:'required'})}
                                
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Category</label>
                                  <select name="categoryId" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    ${categoriesHTML(product.categoryId)}
                                  </select>
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Description</label>
                                  <input type="text" name="description" rules="required" value="${product.description}" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Image</label>
                                  <img src="${product.image}" class="w-3/12 my-3" alt="image">
                                  <input type="file" name="image" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                  <span class="form-message"></span>
                                </div>
                                ${Button({})}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    afterRender() {
        let form = new Validator('#formEdit');
        console.log('edit')
        const {id} = parseRequestUrl();
        form.onSubmit = function (data) {

            const file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(function () {
                console.log('ok');
                storageRef.getDownloadURL().then(async (url) => {
                    const newProduct = {
                        ...data,
                        image: url
                    };
                    await ProductApi.edit(id, newProduct);
                    window.location.href = 'http://localhost:8080/#/admin-products';
                })
            })
        };
    }
}
export default AdminEditProduct;