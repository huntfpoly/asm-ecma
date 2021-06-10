import titleHeaderAdmin from "../../components/titleHeaderAdmin";

const faker = require('faker');

import firebase from "../../firebase";
import sidebarAdmin from "../../components/SidebarAdmin";
import Validator from "../../../public/js/validator";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, showLoading} from "../../utils";

const AdminAddCategory = {
    async render() {
        return `
           
        <div class="max-w-[1920px] px-6 my-5 flex text-white"> 
           ${sidebarAdmin()}
            <div class="w-full "> 
                ${titleHeaderAdmin('Create Category')}
                <div class="px-3 py-4 text-gray-700">
                    <div class="flex justify-end">
                        <a href="/#/admin-categories" class="text-lg bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mr-3 
                                rounded cursor-pointer">
                            Back
                        </a>
                    </div>
                <div> 
                       <form action="" method="POST" class="form" id="formAdd">
                            <div class="form-group flex flex-col mb-5">
                              <label class="">Name</label>
                              <input type="text" name="name" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name">
                               <span class="form-message"></span>
                            </div>
                            <div class="form-group flex flex-col mb-5">
                                <label class="">image</label>
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
        let form = new Validator('#formAdd');

        form.onSubmit =  (data) => {
            const file = data.image[0];
            showLoading();
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(function () {
                console.log('ok');
                storageRef.getDownloadURL().then((url) => {
                    const newCategory = {
                        ...data,
                        image: url,
                        id: faker.datatype.uuid(),
                        slug: faker.helpers.slugify(data.name)
                    }
                    CategoriesApi.add(newCategory);
                    hideLoading();
                    window.location.href = 'http://localhost:8080/#/admin-categories';
                })
            })
        };
    }
}
export default AdminAddCategory;