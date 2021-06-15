import {clearUser} from "../../localStorage";

const faker = require('faker');

import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";
import {rerender} from "../../utils";
import AdminProduct from "./AdminProduct";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import CategoriesApi from "../../api/CategoriesApi";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";


const AdminAddProduct = {
    async render() {
        try {
            const {data: categories} = await CategoriesApi.getAll();
            console.log(categories)
            const categoriesHTML = categories.map(cate => {
                return `
                <option value="${cate.id}">${cate.name}</option>
            `;
            }).join('')
            return `
            <div class="max-w-[1920px] px-6 my-5 text-white flex "> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('Create Product')}
                    <div class="px-3 py-4 text-gray-700">
                        <div class="flex justify-end">   
                            <a href="/#/admin-products" class="text-lg bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mr-3 
                                    rounded cursor-pointer">
                                Back
                            </a>
                        </div>
                        <div> 
                           <form action="" method="POST" class="form" id="formAddPro">
                                <!-- attribute name trong input để giá trị là các key bên trong db 
                                    để khi add ta dùng shorthand object literal -->
                                ${InputForm({label:'name', nameInput:'name', rules:'required|min:4'})}
                                ${InputForm({label:'slug', nameInput:'slug', rules:'required|min:4'})}
                                ${InputForm({label:'price', nameInput:'price', rules:'required|number'})}
                                
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Category</label>
                                  <select name="categoryId" class="form-control px-4 py-2 border  w-full sm:text-sm border-gray-300 rounded-md focus:outline-none appearance-none text-gray-600">
                                    ${categoriesHTML}
                                  </select>
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Description</label>
                                  <input type="text" name="description" rules="required"  class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                  <span class="form-message"></span>
                                </div>
                                ${InputForm({label:'image', nameInput:'image', rules:'required', typeInput:'file'})}
                                ${Button({})}
                            </form>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
        } catch (e) {
            alert('Loi ket noi voi order, vui long login lai')
            clearUser();
            document.location.hash = '/login'
        }

    },
     afterRender() {
        let form = new Validator('#formAddPro');
        form.onSubmit =  (data) => {
            console.log(data)
            const file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
             storageRef.put(file).then(function () {
                console.log('ok');
                storageRef.getDownloadURL().then((url) => {
                    const newCategory = {
                        ...data,
                        image: url,
                        id: faker.datatype.uuid()
                    }
                    ProductApi.add(newCategory);
                    rerender(AdminProduct);

                    window.location.href = 'http://localhost:8080/#/admin-products';
                })
            });
        };
    }
}
export default AdminAddProduct;