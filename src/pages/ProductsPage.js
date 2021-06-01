import ProductApi from "../api/ProductApi";


const ProductsPage = {
    async render() {
        const {data: products} = await ProductApi.getAll();
        const result = products
            .map((product) => {
                return `
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                            <div class="flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('${product.image}')">
                                <button id="add-button" class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </button>
                            </div>
                        <a href="/#/products/${product.id}" class="group">
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase group-hover:text-blue-500">${product.name}</h3>
                            <span class="text-gray-500 mt-2">${product.price}</span> 
                        </div>
                        </a>
                    </div>
                `;
            })
            .join("");

        return `
            <div class="max-w-7xl m-auto grid grid-cols-3 gap-5 items-center justify-start">
            ${result}
            </div>
            
        `;
    },
};
export default ProductsPage;
