const table = (arrayField, data) => {
    const thead = arrayField.map(item => {
        return item`<th>${item}</th>`;
    })
    return `
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
                    
            </tbody>
        </table>
    `
}
export default table;