const ProductComponent = (data) => {
    return `
        <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <a href="/#/products/${data.id}" class="group">
                <div class="flex items-end justify-end h-56 w-full bg-cover" 
                style="background-image: url('${data.image}')">
                </div>
            </a>      
            <a href="/#/products/${data.id}" class="group">
                <div class="px-5 py-3">
                    <h3 class="text-gray-700 uppercase group-hover:text-blue-500">${data.name}</h3>
                    <span class="text-gray-500 mt-2">${data.price}</span> 
                </div>
            </a>
        </div>
    `
}
export default ProductComponent;