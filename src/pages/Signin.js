import Validator from "../../public/js/validator";
import UserApi from "../api/UserApi";
import jwt_decode from "jwt-decode"
import {setUserInfo} from "../localStorage";
// import {isLogin, isToken, isUser} from "../localStorage";


const Signin = {
    afterRender() {
        let form = new Validator('#form');
        form.onSubmit = async (data) => {
            try {
                const {data: {accessToken: token}} = await UserApi.login(data);
                localStorage.setItem('token', token)
                const {sub: _id} = jwt_decode(token)
                const {data: user} = await UserApi.getUser(_id, token)
                setUserInfo({
                    _id,
                    ...user,
                    token
                })
                alert('dang nhap thanh cong')
                window.location.href = 'http://localhost:8080/';

            } catch (e) {
                alert('sai tai khoan hoac mat khau')
                console.log(e)
            }
        };
    },
    async render() {
        // if(await isLogin)  document.location.hash = '/' ;
        return `
            <div class=" flex flex-col" style="background-color: #f3f7f9">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center my-10">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Sign in</h1>
                        <form action="" method="POST" class="form" id="form">
                            <div class="form-group flex flex-col mb-5">
                              <input type="email" name="email" value="admin@gmail.com" rules="required" 
                                class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="Email">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group flex flex-col mb-5">
                              <input type="text" name="password" value="admin" rules="required"  
                              class="form-control block border border-grey-light w-full p-3 rounded mb-4" placeholder="Password">
                              <span class="form-message"></span>

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