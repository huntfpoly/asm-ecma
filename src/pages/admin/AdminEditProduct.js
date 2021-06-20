import tinymce from "tinymce/tinymce";

import firebase from "../../firebase";
import {parseRequestUrl} from "../../utils";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";
import CategoriesApi from "../../api/CategoriesApi";
import Button, {ButtonLink} from "../../components/Button";
import InputForm from "../../components/InputForm";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminEditProduct = {
    async render() {
        const {id} = parseRequestUrl();
        const {data: product} = await ProductApi.get(id);
        const {data: categories} = await CategoriesApi.getAll();
        console.log(product)
        const categoriesHTML = (cateId) =>
            categories
                .map((cate) => {
                    return ` 
                <option value="${cate.id}" ${
                    cate.id === cateId ? `selected` : null
                } >${cate.name}</option>
            `;
                })
                .join("");
        const html = `
            <div class="flex justify-end">   
                ${ButtonLink({
            linkUrl: `/#/admin-products`,
            text: "back",
            bg: "bg-gray-500",
            hoverBg: "bg-gray-700",
        })}
            </div>
            <div> 
               <form action="" method="POST" class="form" id="formAddPro">
                        <!-- attribute name trong input để giá trị là các key bên trong db
                            để khi add ta dùng shorthand object literal -->
                        <div class="flex">
                            <div class="w-1/2">
                                ${InputForm({
            label: "name",
            nameInput: "name",
            rules: "required|min:4",
        })}
                                ${InputForm({
            label: "slug",
            nameInput: "slug",
            rules: "required|min:4",
        })}

                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Category</label>
                                  <select name="categoryId" class="form-control px-4 py-2 border  w-full sm:text-sm border-gray-300 rounded-md focus:outline-none appearance-none text-gray-600">
                                    ${categoriesHTML(product.id)}
                                  </select>
                                  <span class="form-message"></span>
                                </div>
                                ${InputForm({
            label: "Short description",
            nameInput: "shortDescription",
            rules: "required",
        })}
                                ${InputForm({
            label: "image",
            nameInput: "image",
            rules: "required",
            typeInput: "file",
        })}

                            </div>
                            <div class="w-1/2 p-6" id="showAdvanced">
                                <div> size
                                    <label for="sizesm">sm<input type="checkbox" id="sizesm" name="size" value="sm"></label>
                                    <label for="sizemd">md<input type="checkbox" id="sizemd" name="size" value="md"></label>
                                    <label for="sizel">l<input type="checkbox" id="sizel" name="size" value="l"></label>
                                    <label for="sizexl">xl<input type="checkbox" id="sizexl" name="size" value="xl"></label>
                                </div>
                                <div> color
                                    <label for="red">red<input type="checkbox" id="red" name="color" value="red"></label>
                                    <label for="blue">blue<input type="checkbox" id="blue" name="color" value="blue"></label>
                                    <label for="white">white<input type="checkbox" id="white" name="color" value="white"></label>
                                </div>
                                <div id="resultGet" class="overflow-hidden">
                                </div>
                                <button id="getAdvanced" class="border-2 px-2">render</button>
                                <button id="getValue" class="border-2 px-2">getValue</button>
                            </div>

                        </div>

                        <textarea id="mytextarea" name="description">Hello, World!</textarea>
                        ${Button({})}
                    </form>
            </div>
        `;
        return `
            ${LayoutAdmin(html, "Edit Product")}
        `;
    },
    afterRender() {
        tinymce.init({
            selector: "#mytextarea",
            plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
            imagetools_cors_hosts: ["picsum.photos"],
            menubar: "file edit view insert format tools table help",
            toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: "30s",
            autosave_prefix: "{path}{query}-{id}-",
            autosave_restore_when_empty: false,
            autosave_retention: "2m",
            image_advtab: true,
        });
        let form = new Validator("#formEdit");
        console.log("edit");
        const {id} = parseRequestUrl();
        form.onSubmit = function (data) {
            const file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(function () {
                console.log("ok");
                storageRef.getDownloadURL().then(async (url) => {
                    const newProduct = {
                        ...data,
                        image: url,
                    };
                    await ProductApi.edit(id, newProduct);
                    window.location.href = "http://localhost:8080/#/admin-products";
                });
            });
        };
    },
};
export default AdminEditProduct;
