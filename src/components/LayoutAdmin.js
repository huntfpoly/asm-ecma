import sidebarAdmin from "./SidebarAdmin";
import titleHeaderAdmin from "./titleHeaderAdmin";

const LayoutAdmin = (content, title) => {
    return `
        <div class="flex min-h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">  
            ${sidebarAdmin()}
                <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
                    ${titleHeaderAdmin(title)}
                    <div class="px-3 py-4 text-gray-700">    
                        ${content}
                    </div>
                </div>
        </div>
    `;
}
export default LayoutAdmin;