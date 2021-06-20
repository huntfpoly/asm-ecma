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
import Button from "../../components/Button";
import LayoutAdmin from "../../components/LayoutAdmin";

const AdminAddProduct = {
  async render() {
    try {
      const { data: categories } = await CategoriesApi.getAll();
      // console.log(categories)
      const categoriesHTML = categories
        .map((cate) => {
          return `
                <option value="${cate.id}">${cate.name}</option>
            `;
        })
        .join("");
      const html = `
                <div class="flex justify-between">
                    <label for="advanced"> Tùy chọn nâng cao
                        <input type="checkbox" id="advanced">
                    </label>
                    <a href="/#/admin-products" class="text-lg bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mr-3
                            rounded cursor-pointer">
                        Back
                    </a>
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
                                  <label class="uppercase">Price</label>
                                  <input type="text" name="price" class="form-control px-4 py-2 border 
                                    focus:ring-gray-500 focus:border-blue-500 w-full sm:text-sm
                                    border-gray-300 rounded-md focus:outline-none text-gray-600" />
                                </div>
                                <div class="form-group flex flex-col mb-5">
                                  <label class="">Category</label>
                                  <select name="categoryId" class="form-control px-4 py-2 border  w-full sm:text-sm border-gray-300 rounded-md focus:outline-none appearance-none text-gray-600">
                                    ${categoriesHTML}
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
                            <div class="w-1/2 p-6 hidden" id="showAdvanced">
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
                ${LayoutAdmin(html, "Add Product")}
            `;
    } catch (e) {
      alert("Loi ket noi voi order, vui long login lai");
      clearUser();
      document.location.hash = "/login";
    }
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
    const btnCheckAdvanced = document.querySelector("#advanced");
    const showAdvanced = document.querySelector("#showAdvanced");
    btnCheckAdvanced.addEventListener("click", () => {
      if (btnCheckAdvanced.checked === true) {
        showAdvanced.classList.replace("hidden", "block");
        document
          .querySelector("form input[name=price]")
          .toggleAttribute("hidden");
      } else {
        showAdvanced.classList.replace("block", "hidden");
        document
          .querySelector("form input[name=price]")
          .toggleAttribute("hidden");
      }
    });

    // Validate
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
      console.log(sku);
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
            image,
            name,
            sku: sku,
            // image: url,
            id: faker.datatype.uuid(),
          };
          console.log("~ newCategory", newCategory);

          await ProductApi.add(newCategory);
          await rerender(AdminProduct);
          window.location.href = "http://localhost:8080/#/admin-products";
        });
      });
    };

    // khi click nut get
    const btnGetAdvanced = document.querySelector("#getAdvanced");
    const btnSubmitForm = document.querySelector("#formAddPro");
    const resultGet = document.querySelector("#resultGet");
    btnGetAdvanced.addEventListener("click", (e) => {
      e.preventDefault();
      const sizeList = [
        ...document.querySelectorAll("input[name=size]:checked"),
      ];
      const colorList = [
        ...document.querySelectorAll("input[name=color]:checked"),
      ];
      const size = sizeList.map((item) => item.value);
      const color = colorList.map((item) => item.value);
      if (size.length > 0 && color.length > 0) {
        let result = ``;
        for (const colorElement of color) {
          for (const sizeElement of size) {
            result += `
              <div class="flex justify-center items-center">
                  <input type="text" value="${sizeElement}" name="size" disabled class="w-10">
                  <input type="text" value="${colorElement}" name="color" disabled class="w-10">
                  <input type="text" name="price" placeholder="price">
                  <input type="text" name="quantity" placeholder="quantity">
              </div>
            `;
          }
        }
        resultGet.innerHTML = result;
      }
    });
    btnSubmitForm.addEventListener("click", (e) => {
      const listNodeValue = [
        ...document.querySelectorAll("#resultGet input[name]"),
      ];
      const listKey = listNodeValue.map((item) => item.name);
      const listValue = listNodeValue.map((item) => item.value);
      // List các cặp giá trị name và value của từng iput để làm object
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
        // ta cắt chuỗi của ar
        products.push(
          arrayList.slice(i * lengthListKey, (i + 1) * lengthListKey),
        );
      }
      sku = products.map((c) => {
        return c.reduce((accumulator, currentValue) => {
          return Object.assign({}, accumulator, currentValue);
        }, {});
      });
      // console.log(sku);
    });
  },
};
export default AdminAddProduct;
