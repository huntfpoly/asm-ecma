import CategoriesApi from "../../api/CategoriesApi";
import silebarAdmin from "../../components/silebar-admin";
import navAdmin from "../../components/nav-admin";

const AdminCategory = {
    async render() {
        const slidebar = silebarAdmin.render();
        const navBar = navAdmin.render();
        const {data: categories} = await CategoriesApi.getAll()
        const result = categories.map((cate) => {
            return ` 
                <tr class="border-b   bg-gray-100">
                    <td class="p-3 px-5">${cate.id}</td>
                    <td class="p-3 px-5">${cate.name}</td>
                    <td class="p-3 px-5">${cate.slug}</td>
                    <td class="p-3 px-5"> 
                        <img class="w-16 h-16" src="${cate.image}" alt="image">
                    </td>
                     <td class="p-3 px-5 flex justify-end">
                        <a href="/#/admin-edit-category/${cate.id}" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Edit
                        </a>
                        <button type="button" data-id="${cate.id}" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded 
                                focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join("");

        return `
            <div class="max-w-[1920px] px-6 my-5 text-white"> 
                ${navBar}
                <div class="flex "> 
                   ${slidebar}
                    <div class="w-full "> 
                        <div class="bg-gray-700">
                            <div class="h-16 p-4 w-full flex items-center bg-blue-500 rounded-tl-xl "> 
                                <h3 class=" text-2xl font-bold ">Categories</h3>
                            </div> 
                        </div>
                        <div class="px-3 py-4 text-gray-700">
                            <div class="flex justify-end">   
                                <a href="/#/admin-add-category" class="text-lg bg-green-500 hover:bg-green-700 text-white py-1 px-2 
                                        rounded cursor-pointer">
                                    Create
                                </a>
                            </div>
                            <table class="w-full text-md bg-white shadow-md rounded mb-4">
                                <thead> 
                                    <tr class="border-b"> 
                                        <th class="text-left p-3 px-5">Id</th>
                                        <th class="text-left p-3 px-5">Name</th>
                                        <th class="text-left p-3 px-5">Slug</th>
                                        <th class="text-left p-3 px-5">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        ${result}
                                </tbody>
                            </table>
                         </div>
                    </div>
                </div>
            </div>
        `;
    },
     afterRender() {
        let btns = document.querySelectorAll('button[data-id]');

        btns.forEach(btn => {
            const id = btn.dataset.id;

            btn.addEventListener('click',() => {
                const question = confirm('Ban co muon xoa k?')
                if (question){
                    btn.parentNode.parentNode.remove();
                    CategoriesApi.remove(id)
                }
            })
        })

    }
}
export default AdminCategory;