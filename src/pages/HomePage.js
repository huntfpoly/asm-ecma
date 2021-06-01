// import $ from 'owl.carousel';
const HomePage = {

    render() {
        return `
        <div class=" mx-auto">
        
            <div class="mb-8 md:mb-10 xl:mb-12 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto overflow-hidden">
                <div class="mx-auto col-span-full sm:col-span-5">
                    <a href="" class="group h-full flex justify-center relative overflow-hidden">
                        <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-1.jpg&w=1080&q=100" alt="">
                        <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
                <div class="mx-auto col-span-1 sm:col-span-2">
                    <a href="" class="group h-full flex justify-center relative overflow-hidden">
                         <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=640&q=100" alt="">
                         <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
                <div class="mx-auto col-span-1 sm:col-span-2">
                    <a href="" class="group h-full flex justify-center relative overflow-hidden">
                        <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=640&q=100" alt="">
                        <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
              
                <div class="mx-auto col-span-1 sm:col-span-2">
                    <a href="" class="group h-full flex justify-center relative overflow-hidden">
                        <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=640&q=100" alt="">
                        <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
                <div class="mx-auto col-span-1 sm:col-span-2">
                  <a href="" class="group h-full flex justify-center relative overflow-hidden">
                       <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=640&q=100" alt="">
                       <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
               <div class="mx-auto col-span-full sm:col-span-5">
                    <a href="" class="group h-full flex justify-center relative overflow-hidden">
                        <img class="w-full h-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-1.jpg&w=1080&q=100" alt="">
                        <div class="absolute top-0 -left-full h-full w-1/4 z-10 block transform -skew-x-12 bg-gradient-white opacity-40  group-hover:animate-shine"></div>
                    </a>
                </div>
            </div>
            
            <!-- Feature Products -->
            <div class="mx-auto max-w-[1920px] px-2 md:px-4 2xl:px-6">
                <div class="mb-6 md:mb-8 xl:mb-10 border border-solid border-gray-300 rounded-md pt-2 md:pt-3 lg:pt-5 pb-3 lg:pb-5 px-2 md:px-4 lg:px-5">
                    <div class="flex justify-between items-center flex-wrap mb-5 md:mb-6">
                        <div class="flex items-center justify-between -mt-2 lg:-mt-2.5 mb-0">
                            <h3 class=" text-md md:text-lg lg:text-xl 2xl:text-2xl xl:leading-6 font-bold">Featured Products</h3>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-x-2 md:gap-x-4 xl:gap-x-5 gap-y-2 lg:gap-y-4 xl:lg:gap-y-5 2xl:gap-y-6">
                        <div class=" group flex rounded-md cursor-pointer pe-0 md:pb-1 flex-col items-start bg-white" title="Adidas Shoes Black">
                            <div class="flex mb-3 md:mb-3.5 pb-0 overflow-hidden">
                                <img class="w-full bg-gray-300 object-cover rounded-s-md rounded-md transition duration-150 ease-linear transform group-hover:scale-105" 
                                    src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-26-md.png&w=384&q=100" alt="">
                            </div>
                            <div class="w-full overflow-hidden ps-0">
                                <h2 class="truncate mb-1 md:mb-1.5 text-sm md:text-sm lg:text-base xl:text-lg">Adidas Shoes Black</h2>
                                <p class="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">Men Black top sleeveless gown</p>
                                <div class=" text-sm sm:text-base mt-1.5 space-s-2 sm:text-xl  lg:text-xl md:mt-2.5 2xl:mt-3">
                                    <span class="inline-block">450.000</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            
            <!-- slider -->
            <div class="mb-6 px-2.5 md:mb-14 xl:mb-8 mx-auto max-w-[1920px] overflow-hidden">
                <div class="owl-carousel owl-theme">
                  <div class="item">
                      <img class="w-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-2.jpg&w=1920&q=100" alt=""> 
                  </div>
                  <div class="item">
                      <img class="w-full" src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-2.jpg&w=1920&q=100" alt=""> 
                  </div>
                </div>
            </div>
            
            <!-- Shop by Category -->
            <div class="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
                <div class="mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0">
                    <div class="flex items-center justify-between -mt-2 lg:-mt-2.5 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
                        <h3 class=" text-md md:text-lg lg:text-xl 2xl:text-2xl xl:leading-6 font-bold">Shop By
                        Category</h3>
                    </div>

            </div>            
            
        </div>
      
        `;
    },
};

export default HomePage;
