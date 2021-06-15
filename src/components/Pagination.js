import ProductApi from "../api/ProductApi";
import {rerender} from "../utils";

const Pagination = ({data, result, categories = '', limit = 10}) => {
    data.sort((a,b) => b.created_at - a.created_at)
    const division = data.length / limit;
    const countPage = data.length % limit === 0 ? division : Math.trunc(division) + 1;
    let productCurrent = data.slice(0, limit);

    const page = Array.from(new Array(countPage)).map((pageItem, index) => {
        return `
                <button data-pagination="${index + 1}" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    ${index + 1}
                </button>
            `
    }).join('')

    document.querySelector('#productContent').innerHTML = result(productCurrent, categories);
    document.querySelector('#pagination').innerHTML = page;

    const btnPagination = document.querySelectorAll('button[data-pagination]');

    btnPagination.forEach(btn => {

        const id = btn.dataset.pagination;
        btn.addEventListener('click', async () => {
            const start = (parseInt(id) - 1) * limit;
            const stop = parseInt(id) * limit;
            if (parseInt(id) === 1) {
                productCurrent = data.slice(0, limit)
            } else {
                productCurrent = data.slice(start, stop)
            }
            document.querySelector('#productContent').innerHTML = result(productCurrent, categories);
            // remove products
            const btns = document.querySelectorAll('button[name]');
            // console.log(btns)
            btns.forEach(btn => {
                const id = btn.name;

                btn.addEventListener('click', () => {
                    const question = confirm('Ban co muon xoa k?')
                    if (question) {
                        btn.parentNode.parentNode.remove();
                        ProductApi.remove(id)
                    }
                })
            })
        })
    })

}
export default Pagination;