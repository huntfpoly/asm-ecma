import {parseRequestUrl} from "../utils";
const BreakCrumbs = {
    render() {
        const {resource, id} = parseRequestUrl();
        return `
            <nav aria-label="breadcrumb">
              <ol class=" flex justify-center items-center py-5 leading-none text-blue-500 divide-x divide-blue-500 select-none">
                <li class="pr-4 "><a href="/#/">Home</a></li>
                <li class="px-2"><a href="/#/${resource}">${resource}</a></li>
                
                ${id? `<li class="px-4 text-gray-700" aria-current="page">${id}</li>` : ''}
              </ol>
            </nav>
        `;
    }
}
export default BreakCrumbs;