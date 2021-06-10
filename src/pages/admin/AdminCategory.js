import CategoriesApi from "../../api/CategoriesApi";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";

const result = (categories) => {
    return categories.map(cate => {
        return `<tr class="border-b   bg-gray-100">
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
                </tr>`
    }).join('');
}

const AdminCategory = {
    async render() {
        const {data: categories} = await CategoriesApi.getAll()
        const resultHTML = result(categories);

        return `
            <div class="flex max-w-[1920px] px-6 my-5 text-white"> 
               ${sidebarAdmin()}
                <div class="w-full "> 
                    ${titleHeaderAdmin('List Categories')}
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
                                    <th class="text-left p-3 px-5"  class=" flex items-center">
                                        Name
                                        <button data-sort="name">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                            </svg>  
                                        </button>
                                    </th>
                                    <th class="text-left p-3 px-5">Slug</th>
                                    <th class="text-left p-3 px-5">Image</th>
                                </tr>
                            </thead>
                            <tbody id="cate-sort">
                                    ${resultHTML}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        `;
    },
    afterRender() {
        let btns = document.querySelectorAll('button[data-id]');
        let btnSort = document.querySelectorAll('button[data-sort]');
        // Remove
        btns.forEach(btn => {
            const id = btn.dataset.id;

            btn.addEventListener('click', () => {
                const question = confirm('Ban co muon xoa k?')
                if (question) {
                    btn.parentNode.parentNode.remove();
                    CategoriesApi.remove(id)
                }
            })
        })
        btnSort.forEach(btn => {
            const id = btn.dataset.sort;
            let typeSort = ['desc', 'asc'];
            let icon = [
                `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                                </svg>`,
                `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>`
            ]
            btn.addEventListener('click', async (e) => {
                typeSort.reverse();
                icon.reverse();
                const {data: categories} = await CategoriesApi.getAllSort(id, typeSort[0]);
                document.querySelector('#cate-sort').innerHTML = result(categories);
                btn.innerHTML = icon[0];
            })
        })

    }
}
export default AdminCategory;