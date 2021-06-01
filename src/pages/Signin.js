import Validator from "../../public/js/validator";


const Signin ={
    afterRender() {
        let form = new Validator('#form');
        form.onSubmit =  (data) => {
            console.log(data)
        };
    },
    render() {
        return `
            <div class=" flex flex-col" style="background-color: #f3f7f9">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center my-10">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Sign in</h1>
                        <form action="" method="POST" class="form" id="form">
                            <div class="form-group flex flex-col mb-5">
                              <input type="email" name="email" rules="required" class="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Email">
                            </div>
                            <div class="form-group flex flex-col mb-5">
                              <input type="text" name="password" rules="required"  class="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Password">
                            </div>
                            <button class="form-submit w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                                >Sign In</button>
                        </form>
                
                    </div>

                </div>
            </div>
        `;
    }
}
export default Signin;