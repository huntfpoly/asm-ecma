import tinymce from "tinymce/tinymce";

const faker = require("faker");
import { clearUser } from "../../localStorage";

import firebase from "../../firebase";
import Validator from "../../../public/js/validator";
import ProductApi from "../../api/ProductApi";
import { rerender } from "../../utils";
import AdminProduct from "./AdminProduct";
import CategoriesApi from "../../api/CategoriesApi";
import InputForm from "../../components/InputForm";
import Button, { ButtonLink } from "../../components/Button";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminAddProduct = {
	async render () {
		try {
			const { data: categories } = await CategoriesApi.getAll();
			const { data: attributes } = await ProductApi.getAllAttributes();
			// console.log(attributes);
			const categoriesHTML = categories.map((cate) => {
				return `
                        <option value="${cate.id}">${cate.name}</option>
                    `;
			}).join("");

			const attributeHTML = attributes.map(item => {
				if (item.value) {
					const html = item.value.map(i => {
						// console.log(i)
						return `
                        <label for="${item.name}${i.name}">
                            ${i.name}
                            <input type="checkbox" id="${item.name}${i.name}" name="${item.name}" value="${i.color ? i.color : i.name}">
                        </label>
                        `;
					}).join("");
					return `
                    <div> 
                        ${item.name}
                        ${html}
                    </div>
                `;
				}

			}).join("");
			const html = `
                <div>
                  <form action="" method="POST" class="form" id="formAddPro">
                    <div class="flex">
                      <div class="w-3/4">
                        ${InputForm({
													placeholder: "Product name",
													nameInput: "name",
													rules: "required|min:4",
												})}
                        ${InputForm({
													placeholder: "slug",
													nameInput: "slug",
													rules: "required|min:4",
												})}
                        <textarea name="shortDescription">shortDescription</textarea>
                        <textarea id="mytextarea" name="description">Hello, World!</textarea>
                        <div class="bg-white mt-6 border">
                          <div class="p-2 border-b">Product data </div>
                          <div class="flex"
                            x-data="{
                              openTab: 1,
                              activeClasses: 'text-gray-500 bg-gray-100 focus:outline-none',
                              inactiveClasses: 'text-blue-500 hover:text-blue-800 focus:outline-none'
                            }" >
                            <ul class=" border text-lef">
                              <li @click="openTab = 1" :class="{ '-mb-px': openTab === 1 }" class="-mb-px ">
                                <button type="button" :class="openTab === 1 ? activeClasses : inactiveClasses" class="w-full bg-white inline-block py-2 px-4" >
                                  Variations
                                </button>
                              </li>
                              <li @click="openTab = 2" :class="{ '-mb-px': openTab === 2 }" class="">
                                <button type="button" :class="openTab === 2 ? activeClasses : inactiveClasses" class="w-full bg-white inline-block py-2 px-4" >
                                  Variations
                                </button>
                              </li>
                              <li @click="openTab = 3" :class="{ '-mb-px': openTab === 3 }" class="">
                                <button type="button" :class="openTab === 3 ? activeClasses : inactiveClasses" class="w-full bg-white inline-block py-2 px-4" >Review</button>
                              </li>
                            </ul>
                            <div class="w-full">
                              <div x-show="openTab === 1">  
                                <div class="border-b px-4"> 
                                     ${attributes.length > 0 ?
				`${attributeHTML}
	                                          <div> 
	                                              <button id="getAdvanced" class="border-2 px-2">render</button>
	                                          </div>
	                                          <div id="resultGet">a</div>
	                                          ` :
				`Before you can add a variation you need to add some variation attributes on the Attributes tab.`
			}
                                </div>
                              </div>
                              <div x-show="openTab === 2">
                                <div class=""> 
                                   pgrading feature...
                                </div>
                              </div>
                              <div x-show="openTab === 3">Upgrading feature...</div>
                            </div>
                          </div>
                        </div>               
                        ${InputForm({
				label: "image",
				nameInput: "image",
				rules: "required",
				typeInput: "file",
			})}
                      </div>
                      <div class=" p-6" id="showAdvanced">
                        <div class="form-group flex flex-col mb-5">
                          <label class="">Category</label>
                          <select name="categoryId" class="form-control px-4 py-2 border  w-full sm:text-sm border-gray-300 rounded-md focus:outline-none appearance-none text-gray-600">
                            ${categoriesHTML}
                          </select>
                          <span class="form-message"></span>
                        </div>
                      </div>
                      </div>
                    ${Button({})}
                  </form>
                </div>
            `;
			return `
                ${LayoutAdmin(html, "Add Product")}
            `;
		} catch (e) {
			// alert("Loi ket noi voi order, vui long login lai");
			// clearUser();
			// document.location.hash = "/login";
		}
	},
	async afterRender () {
		tinymce.init({
			selector: "#mytextarea",
			height: "500px",
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
		let sku = "";
		let form = new Validator("#formAddPro");
		form.onSubmit = async ({
			categoryId,
			shortDescription,
			description,
			slug,
			image,
			name,
		}) => {
			// console.log(sku);
			const file = image[0];
			const storageRef = firebase.storage().ref(`images/${file.name}`);
			storageRef.put(file).then(function () {
				console.log("ok");
				storageRef.getDownloadURL().then(async (url) => {
					const newCategory = {
						categoryId,
						shortDescription,
						description,
						slug,
						// image,
						name,
						sku: sku,
						image: url,
						id: faker.datatype.uuid(),
					};
					console.log("~ newCategory", newCategory);

					await ProductApi.add(newCategory);
					await rerender(AdminProduct);
					window.location.href = "http://localhost:8080/#/admin-products";
				});
			});
		};

		const { data: attributes } = await ProductApi.getAllAttributes();
		const btnGetAdvanced = document.querySelector("#getAdvanced");
		const resultGet = document.querySelector("#resultGet");

		// khi click nut render thì nó render ra field variations
		btnGetAdvanced.addEventListener("click", (e) => {
			e.preventDefault();
			// tìm các nodeList theo name trong attributes.
			// nhận được 1 mảng chứa các nodeList
			let nodeListVariation = attributes.filter(item => item.value && item.value.length > 0).map(item => {
				return [...document.querySelectorAll(`input[name=${item.name}]:checked`)];
			}).filter(i => i.length > 0);
			// console.log(arrListVariation)

			// lấy ra các giá trị value ( là tên các thuộc tính như color, size...) từ nodeList
			nodeListVariation = nodeListVariation.map(item => {
				console.log(item);
				return item.map(i => {
					return i.color ? [i.name, i.value, i.color] : [i.name, i.value];
				});
			});
			// console.log(arrListVariation)
			// render input variation

			// Xử lý các nodeList thành tổ hợp cấp số nhân theo từng phần tử trong mảng
			// output là các mảng chứa các thuộc tính
			function concat (a, b) {
				return a.concat(b);
			}

			function renderArrayMul (a) {
				return a.length === 0
					? [[]]
					: a[0]
						.map((x) => {
							// console.log(x);
							return renderArrayMul(a.slice(1)).map(concat.bind(null, [x]));
						})
						.reduce(concat, []);
			}

			const arrayListBeforeRender = renderArrayMul(nodeListVariation);
			// console.log(arrayListBeforeRender)

			// Khi nhận được mảng thì render ra view cùng giá và số lượng
			const result = arrayListBeforeRender.map(item => {
				// console.log(item)
				return `
                      <div class="flex items-center">
                          ${item.map(x => {
					console.log(x);
					return `
                                ${x[0] === "color" ?
						`<input type="${x[0]}" value="${x[1]}" name="${x[0]}" disabled class="w-10">`
						:
						`<input type="text" value="${x[1]}" name="${x[0]}" disabled class="w-10">`
					}    
                            `;
				}).join("")}
                          <input type="text" name="price" placeholder="price">
                          <input type="text" name="quantity" placeholder="quantity">
                      </div>
                    `;
			}).join("");
			resultGet.innerHTML = result;

		});
		// click Save để lấy ra các giá trị variation thành 1 object có key là sku
		document.querySelector(".form-submit").addEventListener("click", (e) => {
			// e.preventDefault();

			// tìm nodeList input có attribute name và nằm trong thẻ div#resultGet
			const listNodeValue = [
				...document.querySelectorAll("#resultGet input[name]"),
			];
			console.log(listNodeValue);
			// Từ nodeList lấy ra các giá trị "name" để làm key
			const listKey = listNodeValue.map((item) => item.name);

			// List các cặp giá trị name và value của từng node input để làm object
			const arrayList = listNodeValue.map((c) => {
				return { [c.name]: c.value };
			});
			// tìm số lượng node
			const lengthListNode = listNodeValue.length;
			// Vì input có name lặp lại theo tổ hợp của thuộc tính đã chọn nên dùng set để loại bỏ giá trị trùng nhau
			// và ta dùng số lượng note chia cho số lượng thuộc tính để lặp lại số lần sản phẩm gồm các thuộc tính khác nhau
			const lengthListKey = [...new Set(listKey)].length;

			let products = [];
			for (let i = 0; i < lengthListNode / lengthListKey; i++) {
				// ta cắt chuỗi của arr
				products.push(
					arrayList.slice(i * lengthListKey, (i + 1) * lengthListKey)
				);
			}
			sku = products.map((c) => {
				return c.reduce((accumulator, currentValue) => {
					return Object.assign({}, accumulator, currentValue);
				}, {});
			});

		});
	},
};
export default AdminAddProduct;
