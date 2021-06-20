import firebase from "../../firebase";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, parseRequestUrl, showLoading} from "../../utils";
import Validator from "../../../public/js/validator";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import Button, {ButtonLink} from "../../components/Button";
import InputForm from "../../components/InputForm";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminEditCategory = {
    async render() {
        const {id} = parseRequestUrl();
        const {data: category} = await CategoriesApi.get(id);
        const html = `
            <div class="flex justify-end">   
                           ${ButtonLink(
                {
                    linkUrl:'/#/admin-categories',
                    text:'back',
                    bg: 'bg-gray-500',
                    hoverBg: 'bg-gray-700'
                }
            )}
            </div>
            <div> 
                <form action="" method="POST" class="form" id="formEdit">
                    ${InputForm({label:'name', nameInput:'name',value:category.name, rules:'required'})}
                    ${InputForm({label:'slug', nameInput:'slug',value:category.slug, rules:'required'})}
                    <div class="form-group flex flex-col mb-5">
                      <label class="">image</label>
                      <img src="${category.image}" class="w-3/12 my-3" alt="image">
                      <input type="file" name="image" rules="required" class="form-control px-4 py-2 border focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" >
                    </div>
                    ${Button({})} 
                </form>
               
            </div>
        `
        return `
            ${LayoutAdmin(html, 'Edit Category')} 
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