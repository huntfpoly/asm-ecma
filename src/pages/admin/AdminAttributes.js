import ProductApi from "../../api/ProductApi";

const faker = require('faker');

import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, parseRequestUrl, rerender, showLoading} from "../../utils";
import InputForm from "../../components/InputForm";
import Button, {ButtonLink} from "../../components/Button";
import LayoutAdmin from "../../components/LayoutAdmin";
import AdminEditAttribute from "./AdminEditAttribute";
import {parseUrl} from "query-string";

const AdminAttributes = {

    async render() {
        const {data: attributes} = await ProductApi.getAllAttributes();
        console.log(attributes)
        const attributeHTML = attributes.map(item => {
            return `
                <tr> 
                    <td> 
                        <a href="/#/admin-edit-attribute/${item.id}" class="text-primary-light">${item.name}</a>
                    </td>
                    <td>${item.attribute_type}</td>
                    <td>${item.value? item.value.map(i =>  `${i.name}`).join(', ') : '-'}</td>
                    <td>
                            <button id="del-attribute" data-id="${item.id}">delete</a>
                    </td>
                </tr>
            `
        }).join('')
        const html = `
            <div class="flex">   
                <div class="w-1/3"> 
                    <form action="" id="addAttribute"> 
                        <h3>Add new attribute</h3>
                        <p>Các thuộc tính cho phép bạn xác định dữ liệu sản phẩm bổ sung, chẳng hạn như kích thước hoặc màu sắc</p>
                        ${InputForm({placeholder: 'name', nameInput: 'name', rules: 'required'})}
                        <div> 
                            <select name="attribute_type" id="attribute_type"> 
                                <option value="select">select</option>
                                <option value="color">color</option>
                            </select>
                        </div>
                        <button  class="bg-primary text-white px-2 py-1 rounded">add attribute</button>
                    </form>
                </div>
                <div class="w-2/3 px-4 bg-white border"> 
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-primary">
                                <th scope="col">Name</th>
                                <th scope="col">type</th>
                                <th scope="col">Terms</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${attributeHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        `
        return `
           ${LayoutAdmin(html, 'Attributes')}

        `;
    },
    afterRender() {

        let form = new Validator('#addAttribute')
        form.onSubmit = async (data) => {
            // console.log(data)
            await ProductApi.AddAttribute(data)
            await rerender(AdminAttributes)
        };

        // Delete
        const btnDel = document.querySelectorAll('button[data-id]')
        btnDel.forEach(btn => {
            btn.addEventListener('click', async (e)=> {
                e.preventDefault();
                await ProductApi.RemoveAttribute(btn.dataset.id)
                await rerender(AdminAttributes)
            })
        })
    }
}
export default AdminAttributes;