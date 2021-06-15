import titleHeaderAdmin from "../../components/titleHeaderAdmin";

const faker = require('faker');

import firebase from "../../firebase";
import sidebarAdmin from "../../components/SidebarAdmin";
import Validator from "../../../public/js/validator";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, showLoading} from "../../utils";
import InputForm from "../../components/InputForm";
import Button, {ButtonLink} from "../../components/Button";

const AdminAddCategory = {
    async render() {
        return `
           
        <div class="max-w-[1920px] px-6 my-5 flex text-white"> 
           ${sidebarAdmin()}
            <div class="w-full "> 
                ${titleHeaderAdmin('Create Category')}
                <div class="px-3 py-4 text-gray-700">
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
                    <form action="" method="POST" class="form" id="formAdd">
                       ${InputForm({label:'name', nameInput:'name', rules:'required|min:4'})}
                       ${InputForm({label:'image', nameInput:'image', rules:'required',typeInput:'file'})}
                       ${Button({})}

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