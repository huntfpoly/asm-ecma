import CategoriesApi from "../../api/CategoriesApi";
import sidebarAdmin from "../../components/SidebarAdmin";
import titleHeaderAdmin from "../../components/titleHeaderAdmin";
import Button, {ButtonLink} from "../../components/Button";

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
                        ${ButtonLink(
                            {
                                linkUrl: `/#/admin-edit-category/${cate.id}`,
                                text:'edit',
                                bg: 'bg-blue-500',
                                hoverBg: 'bg-blue-700'
                            }
                        )}
                        ${Button({bg:'bg-red-500', text:'delete', name:cate.id})}
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
                            ${ButtonLink(
                                {
                                    linkUrl:'/#/admin-add-category',
                                    text: 'create',
                                    bg:'bg-green-500',
                                    hoverBg:'bg-green-700'
                                }
                            )}
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
        let btns = document.querySelectorAll('button[name]');
        let btnSort = document.querySelectorAll('button[data-sort]');
        // Remove
        btns.forEach(btn => {
            const id = btn.name;

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