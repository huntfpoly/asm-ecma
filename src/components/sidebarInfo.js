const sidebarInfo = {
    render() {
        return `
        <ul class="w-full p-4">
            <li  
            class=" w-full cursor-pointer rounded-md transition duration-300 hover:bg-blue-500 hover:text-white" >
                <a href="/#/profile" class="flex block w-full mb-2 py-2 "> 
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Profile</span>
                </a>
            </li>
            <li  
             class="w-full cursor-pointer rounded-md transition duration-300 hover:bg-blue-500 hover:text-white " >
                <a href="/#/orders" class="flex block w-full mb-2 py-2 "> 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>Order</span>
                </a>
            </li>
        </ul>
        `;
    }
}
export default sidebarInfo