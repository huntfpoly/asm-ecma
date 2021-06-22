import ProductApi from "../../api/ProductApi";

const faker = require('faker');

import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, parseRequestUrl, rerender, showLoading} from "../../utils";
import InputForm from "../../components/InputForm";
import Button, {ButtonLink} from "../../components/Button";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminEditAttribute = {
    async render() {
        const {id, action} = parseRequestUrl();
        const {data: attribute} = await ProductApi.getAttribute(id);
        let attributeValueHTML = '';
        console.log(action)
        if (attribute.value && attribute.value.length > 0) {
            attributeValueHTML = attribute.value.map(item => {
                return `
                    <tr data-value="${item.id}"> 
                        <td> 
                            <a href="/#/admin-edit-attribute/${id}/${item.name}" class="text-primary-light">${item.name}</a>
                        </td>
                        <td>${item.description}</td>
                        <td>
                            <button data-id="${item.name}">delete</a>
                        </td>
                    </tr>
                `
            }).join('')
        } else {
            attributeValueHTML = `<tr><td> No "${attribute.name}" found</td></tr>`
        }
        const html = `
            <div class="flex">   
                <div class="w-1/3"> 
                    <form action="" id="addNew"> 
                        <h3>Product ${attribute.name}</h3>
                        <p>Các thuộc tính cho phép bạn xác định dữ liệu sản phẩm bổ sung, chẳng hạn như kích thước hoặc màu sắc</p>
                        ${InputForm({placeholder: 'name', nameInput: 'name', rules: 'required'})}
                        ${InputForm({placeholder: 'description', nameInput: 'description', rules: 'required'})}
                        ${attribute.attribute_type === 'color'? `
                            <input type="color" name="${attribute.attribute_type}">
                        `:``}
                        <button  class="bg-primary text-white px-2 py-1 rounded">add new ${attribute.name}</button>
                    </form>
                </div>
                <div class="w-2/3 px-4 bg-white border"> 
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-primary">
                                <th scope="col">Name</th>
                                <th scope="col">description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${attributeValueHTML}
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
        // validate and add new attribute
        const {id, action} = parseRequestUrl();

        let form = new Validator('#addNew')
        form.onSubmit = async (data) => {
            let newAttributeValue = {}
            const {data: attribute} = await ProductApi.getAttribute(id);
            if (attribute.value) {
                newAttributeValue = {
                    ...attribute,
                    value: [...attribute.value, data]
                }
            } else {
                newAttributeValue = {
                    ...attribute,
                    value: [data]
                }
            }
            console.log(newAttributeValue)
            await ProductApi.AttributeValue(id,newAttributeValue)
            await rerender(AdminEditAttribute)
        };

        const btnDel = document.querySelectorAll('button[data-id]')
        btnDel.forEach(btn => {
            btn.addEventListener('click', async (e)=> {
                e.preventDefault();

                const {data: attribute} = await ProductApi.getAttribute(id);
                const attributeValue = attribute.value.filter(item => item.name !== btn.dataset.id);
                const newAttribute = {...attribute, value:attributeValue}
                console.log(newAttribute)
                await ProductApi.RemoveAttributeValue(id,newAttribute)
                await rerender(AdminEditAttribute)
            })
        })
    }
}
export default AdminEditAttribute;