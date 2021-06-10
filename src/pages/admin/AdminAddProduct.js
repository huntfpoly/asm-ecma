import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";
import {rerender} from "../../utils";
import AdminProduct from "./AdminProduct";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import CategoriesApi from "../../api/CategoriesApi";


const AdminAddProduct = {
    async render() {
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
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Name</label>
                                  <input type="text" name="name" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name">
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Slug</label>
                                  <input type="text" name="slug" rules="required"  class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Price</label>
                                  <input type="text" name="price" rules="required"  class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Category</label>
                                  <select name="categoryId" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    ${categoriesHTML}
                                  </select>
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Description</label>
                                  <input type="text" name="description" rules="required"  class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                  <span class="form-message"></span>
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Image</label>
                                  <input type="file" name="image" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                  <span class="form-message"></span>
                                </div>
                                <button class="form-submit text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 
                                    rounded cursor-pointer">save</button> 
                            </form>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
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
                        image: url
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