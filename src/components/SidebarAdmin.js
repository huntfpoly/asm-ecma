import 'alpinejs';
import sidebarLinkAdmin from "./sidebarLinkAdmin";

const sidebarAdmin = () => {
    return `
             <div class="flex w-48 bg-gray-700 min-h-screen" x-data="{ show: true }"> 
                <ul class="w-full mx-2 pt-5">
                    ${sidebarLinkAdmin('admin-dashboard', 'Dashboard')}
                    ${sidebarLinkAdmin('admin-categories', 'Categories')}
                    ${sidebarLinkAdmin('admin-products', 'Products')}
                    ${sidebarLinkAdmin('admin-order', 'Orders')}
                </ul>
            </div>    
        `;

}
export default sidebarAdmin;