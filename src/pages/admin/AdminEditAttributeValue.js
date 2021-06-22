import ProductApi from "../../api/ProductApi";

const faker = require('faker');

import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import CategoriesApi from "../../api/CategoriesApi";
import {hideLoading, parseRequestUrl, rerender, showLoading} from "../../utils";
import InputForm from "../../components/InputForm";
import Button, {ButtonLink} from "../../components/Button";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminEditAttributeValue = {
    async render() {
        let {id, action} = parseRequestUrl();
        const {data: attribute} = await ProductApi.getAttribute(id);
        action = action.split('%20').join(' ')
        // console.log(action)
        const attributeValue = attribute.value.find(item => item.name === action);

        let attributeValueHTML = '';
        if (attribute.value && attribute.value.length > 0) {
            attributeValueHTML = attribute.value.map(item => {
                return `
                    <tr data-value="${item.id}"> 
                        <td> 
                            <a href="/#/admin-edit-attribute/${id}/${item.name}" class="text-primary-light">${item.name}</a>
                        </td>
                        <td>${item.description}</td>
                        <td>
                            <button data-id="${item.id}">delete</a>
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
                    <form action="" id="updateAttributeValue"> 
                        <h3>Product ${attribute.name}</h3>
                        <p>Các thuộc tính cho phép bạn xác định dữ liệu sản phẩm bổ sung, chẳng hạn như kích thước hoặc màu sắc</p>
                        ${InputForm({
            placeholder: 'name',
            nameInput: 'name',
            rules: 'required',
            value: attributeValue.name
        })}
                        ${InputForm({
            placeholder: 'description',
            nameInput: 'description',
            rules: 'required',
            value: attributeValue.description
        })}
                        ${attribute.attribute_type === 'color' ? `
                        <input type="color" name="${attribute.attribute_type}" value="${attributeValue.color}">
                        ` : ``}
                        <button  class="bg-primary text-white px-2 py-1 rounded">update</button>
                    </form>
                </div>
                
            </div>
        `
        return `
           ${LayoutAdmin(html, 'Attributes')}
        `;

    },
    afterRender() {

        // validate and add new attribute
        let form = new Validator('#updateAttributeValue')
        form.onSubmit = async (data) => {
            const {id, action} = parseRequestUrl();
            const url = window.location.hash.toLowerCase();
            const {data: attribute} = await ProductApi.getAttribute(id);
            const attributeValue = attribute.value.map(item => item.name === action.split('%20').join(' ') ? data : item);
            const newAttribute = {...attribute, value:attributeValue}
            // console.log(newAttribute)
            await ProductApi.EditAttributeValue(id,newAttribute)
            await history.back();
        };
        // Delete

    }
}
export default AdminEditAttributeValue;