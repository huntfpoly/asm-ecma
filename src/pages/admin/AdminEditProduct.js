import firebase from "../../firebase";

import {parseRequestUrl} from "../../utils";
import silebarAdmin from "../../components/silebar-admin";
import navAdmin from "../../components/nav-admin";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";

const AdminEditProduct = {
    async render() {
        const {id} = parseRequestUrl();
        const {data: product} = await ProductApi.get(id);
        const sidebar = silebarAdmin.render();
        const navBar = navAdmin.render();

        return `
            <div class="max-w-[1920px] px-6 my-5 text-white"> 
                ${navBar}
                <div class="flex "> 
                   ${sidebar}
                    <div class="w-full "> 
                        <div class="bg-gray-700">
                            <div class="h-16 p-4 w-full flex items-center bg-blue-500 rounded-tl-xl "> 
                                <h3 class=" text-2xl font-bold ">Edit Product</h3>
                            </div> 
                        </div>
                        <div class="px-3 py-4 text-gray-700">
                            <div class="flex justify-end">   
                                <a href="/#/admin-categories" class="text-lg bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mr-3 
                                        rounded cursor-pointer">
                                    Back
                                </a>
                              
                            </div>
                            <div> 
                               <form action="" method="POST" class="form" id="formEdit">
                                    <div class="form-group flex flex-col mb-5">
                                      <label class="">Name</label>
                                      <input type="text" name="name" rules="required" value="${product.name}" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name">
                                    </div>
                                    <div class="form-group flex flex-col mb-5">
                                      <label class="">Slug</label>
                                      <input type="text" name="slug" rules="required" value="${product.slug}" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                    </div>
                                    <div class="form-group flex flex-col mb-5">
                                      <label class="">Price</label>
                                      <input type="text" name="price" rules="required" value="${product.price}" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                    </div>
                                    <div class="form-group flex flex-col mb-5">
                                      <label class="">Description</label>
                                      <input type="text" name="description" rules="required" value="${product.description}" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                    </div>
                                    <div class="form-group flex flex-col mb-5">
                                      <label class="">Image</label>
                                      <img src="${product.image}" class="w-3/12 my-3" alt="image">
                                      <input type="file" name="image" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    </div>
                                    <button class="form-submit text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 
                                        rounded cursor-pointer">save</button> 
                                </form>
                               
                               
                            </div>
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
                storageRef.getDownloadURL().then((url) => {
                    const newProduct = {
                        ...data,
                        image: url
                    };
                    ProductApi.edit(id, newProduct);
                    window.location.href = 'http://localhost:8080/#/admin-products';
                })
            })
        };
    }
}
export default AdminEditProduct;