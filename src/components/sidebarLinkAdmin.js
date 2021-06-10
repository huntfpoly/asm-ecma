const sidebarLinkAdmin = (link, nameLink) => {
    return `
        <li  
         class="w-full cursor-pointer rounded-md transition duration-300 hover:bg-blue-500 " >
            <a href="/#/${link}" class="flex block w-full mb-2 py-2 "> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>${nameLink}</span>
            </a>
        </li>
    `;
}
export default sidebarLinkAdmin;