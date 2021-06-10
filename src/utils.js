//  Lấy đường dẫn
import {getCartItems} from "./localStorage";

export const parseRequestUrl = () => {
    const url = window.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
    };
};
export const rerender = async (component) => {
    document.getElementById('root').innerHTML = await component.render();
    if (component.afterRender) await component.afterRender();
};
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
};
export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
};
// Pagination
export const pagination = (products, limit) => {
    const division = products.length / limit;
    const countPage = products.length % limit === 0 ? division : Math.trunc(division) + 1;
    let productCurrent = products.slice(0,10);
    return {
        page: Array.from(new Array(countPage)).map((pageItem, index) => {
            return `
                <button data-pagination="${index + 1}" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  ${index + 1}
                </button>
            `
        }).join(''),
        productCurrent: productCurrent,
    }
}
const showResult = (limit) => {
    return `  
        <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">1</span>
            to
            <span class="font-medium">${limit}</span>
            of
            <span class="font-medium">  ${data.pagination._totalRows}</span>
            results
        </p>
    `
}

export const redirectUser = () => {

    if (getCartItems().length !== 0) {
        document.location.hash = '/checkout';
    } else {
        document.location.hash = '/';
    }
};