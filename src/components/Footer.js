const Footer = {
    render () {
        return `
            <footer
                    class="lg:pt-5 border-t mb-8 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
                <div class="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 text-gray-500">
                    <div
                            class="
                        grid grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        
                        gap-5
                        md:gap-9
                        xl:gap-5
                        pb-9
                        md:pb-14
                        lg:pb-16
                        2xl:pb-20
                        3xl:pb-24
                        lg:mb-0.5
                        2xl:mb-0
                        3xl:-mb-1
                      "
                    >
                        <div class="pb-3 md:pb-0">
                            <h4 class="text-sm text-gray-900 xl:text-lg mb-2 2xl:mb-6 3xl:mb-7">
                                Social
                            </h4>
                            <ul class="text-xs lg:text-sm text-body flex flex-col">
                                <li class="flex items-center">
                            <span class="me-3 relative top-0.5 lg:top-1 text-sm"
                            ><svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"
                                ></path>
                                <path
                                        d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"
                                ></path></svg></span
                            ><a class="duration-200 hover:text-black" href="#">Instagram</a>
                                </li>
                                <li class="flex items-center">
                            <span class="me-3 relative top-0.5 lg:top-1 text-sm"
                            ><svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"
                                ></path></svg></span
                            ><a class="duration-200 hover:text-black" href="#">Twitter</a>
                                </li>
                                <li class="flex items-center">
                            <span class="me-3 relative top-0.5 lg:top-1 text-sm"
                            ><svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        fill-rule="evenodd"
                                        d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
                                ></path></svg></span
                            ><a class="duration-200 hover:text-black" href="#">Facebook</a>
                                </li>
                                <li class="flex items-center">
                            <span class="me-3 relative top-0.5 lg:top-1 text-sm"
                            ><svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"
                                ></path></svg></span
                            ><a class="duration-200 hover:text-black" href="#">Youtube</a>
                                </li>
                            </ul>
                        </div>
                        <div class="pb-3 md:pb-0">
                            <h4 class="text-sm text-gray-900 xl:text-lg mb-2 2xl:mb-6 3xl:mb-7">
                                Contact
                            </h4>
                            <ul class="text-xs lg:text-sm text-body flex flex-col">
                                <li class="flex items-center">
                                    <a class="duration-200 hover:text-black" href="/contact-us"
                                    >Contact Us</a
                                    >
                                </li>
                                <li class="flex items-center">
                                    <a class="duration-200 hover:text-black" href="/"
                                    >yourexample@email.com</a
                                    >
                                </li>
                                <li class="flex items-center">
                                    <a class="duration-200 hover:text-black" href="/"
                                    >example@email.com</a
                                    >
                                </li>
                                <li class="flex items-center">
                                    <a class="duration-200 hover:text-black" href="/"
                                    >Call us: +1 254 568-5479</a
                                    >
                                </li>
                            </ul>
                        </div>
                        <div class="pb-3 md:pb-0">
                            <h4 class="text-sm text-gray-900 xl:text-lg mb-2 2xl:mb-6 3xl:mb-7">
                                About
                            </h4>
                            <ul class="text-xs lg:text-sm text-body flex flex-col">
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/contact-us"
                                    >Support Center</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/"
                                    >Customer Support</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/contact-us"
                                    >About Us</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/">Copyright</a>
                                </li>
                            </ul>
                        </div>
            
                        <div class="pb-3 md:pb-0">
                            <h4 class="text-sm text-gray-900 xl:text-lg mb-2 2xl:mb-6 3xl:mb-7">
                                Our Information
                            </h4>
                            <ul
                                    class="
                            text-xs
                            lg:text-sm
                            text-body
                            flex flex-col
                            space-y-3
                            lg:space-y-3.5
                          "
                            >
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/privacy"
                                    >Privacy policy update</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/terms"
                                    >Terms &amp; conditions</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/privacy"
                                    >Return Policy</a
                                    >
                                </li>
                                <li class="flex">
                                    <a class="duration-200 hover:text-black" href="/">Site Map</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}
export default Footer;