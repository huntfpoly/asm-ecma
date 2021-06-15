import Validator from "../../public/js/validator";
import UserApi from "../api/UserApi";
import jwt_decode from "jwt-decode";


const Signup = {
    afterRender() {
        let form = new Validator('#form');
        form.onSubmit = async (data) => {
            const {data: {accessToken: token}} = await UserApi.register({...data, isAdmin: false, avatar: '' });
            localStorage.setItem('token', token);
            const {sub: id} = jwt_decode(token);
            const {data: user} = await UserApi.getUser(id, token);
            localStorage.setItem('user', JSON.stringify(user));
            alert('dang ky thanh cong')

            window.location.href = 'http://localhost:8080/';

        };
    },
    render() {
        return `
            <div class=" flex flex-col" style="background-color: #f3f7f9">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center my-10">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Sign Up</h1>
                        <form action="" method="POST" class="form" id="form">
                            <div class="form-group flex flex-col mb-5">
                                <input type="text" name="firstName" rules="required" class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="First Name">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group flex flex-col mb-5">
                                <input type="text" name="lastName" rules="required" class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="Last Name">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group flex flex-col mb-5">
                                <input type="email" name="email" rules="required" class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="Email">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group flex flex-col mb-5">
                              <input type="text" name="password" rules="required"  class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="Password">
                              <span class="form-message"></span>

                            </div>
                            <button class="form-submit w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                                >Sign Up</button>
                        </form>
                
                    </div>
                     <div class="text-grey-dark mt-6">
                          Already have an account? 
                        <a class="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>

                </div>
            </div>
        `;
    }
}
export default Signup;