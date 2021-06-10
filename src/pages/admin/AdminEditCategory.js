import firebase from "../../firebase";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, parseRequestUrl, showLoading} from "../../utils";
import Validator from "../../../public/js/validator";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";

const AdminEditCategory = {
    async render() {
        const {id} = parseRequestUrl();
        const {data: category} = await CategoriesApi.get(id);

        return `
            <div class="max-w-[1920px] flex px-6 my-5 text-white"> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('Edit Category')}
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
                                  <input type="text" name="name" rules="required" value="${category.name}" 
                                    class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name">
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Slug</label>
                                  <input type="text" name="slug" rules="required" value="${category.slug}"  
                                  class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Slug">
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">image</label>
                                  <img src="${category.image}" class="w-3/12 my-3" alt="image">
                                  <input type="file" name="image" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" >
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
        let form = new Validator('#formEdit');
        console.log('edit')
        const {id} = parseRequestUrl();
        form.onSubmit = function (data) {
            showLoading();
            const file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(function () {
                console.log('ok');
                storageRef.getDownloadURL().then((url) => {
                    const newCategory = {
                        ...data,
                        image: url
                    };
                    CategoriesApi.edit(id, newCategory);
                    hideLoading();
                    window.location.href = 'http://localhost:8080/#/admin-categories';
                })
            })
        };
    }
}
export default AdminEditCategory;