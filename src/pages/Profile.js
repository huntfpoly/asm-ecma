import sidebarInfo from "../components/sidebarInfo";
import {clearUser, getUserInfo, setUserInfo} from "../localStorage";
import UserApi from "../api/UserApi";
import Validator from "../../public/js/validator";
import {hideLoading, rerender, showLoading} from "../utils";
import firebase from "../firebase";

const Profile = {
    async afterRender() {
        let form = new Validator('#form');
        const file = document.querySelector("input[type=file]")
        const preview = document.querySelector('#preview');
        const user = getUserInfo();

        form.onSubmit = (data) => {
            const file = data.avatar[0];
            showLoading();
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(() => {
                console.log('ok');
                storageRef.getDownloadURL().then(async (url) => {
                    const newUser = {
                        ...user,
                        ...data,
                        avatar: url
                    }
                    const {data: u} = await UserApi.update(newUser);
                    setUserInfo(u)
                    rerender(Profile)
                    hideLoading();
                })
            })

        }
        // Preview avatar
        file.addEventListener('change', (event) => {
            // lấy ra files
            const fileToLoad = file.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                preview.src = reader.result;
            }, false);
            reader.readAsDataURL(fileToLoad);
        })
    },
    async render() {
        try {
            const {_id, token} = getUserInfo();
            const {data: user} = await UserApi.getUser(_id, token);

            return `
            <div class="flex py-10 px-6">
                <div class="w-1/5 border">
                   ${sidebarInfo.render()}
                </div>
                <div class="w-4/5 ml-5 p-4 border ">
                   <h4 class="text-xl font-bold ">Profile</h4>
                   <div class="flex"> 
                        <div class="w-2/3"> 
                           <form action="" method="POST" class="form" id="form">
                                <div class="form-group flex items-center justify-between mb-5">
                                    <div class="flex items-center justify-between w-2/3"> 
                                        <lable>Email</lable>
                                        <input type="email" name="email" value="${user.email}" rules="required" 
                                        class="form-control block border border-grey-light w-2/3 p-3 rounded " placeholder="Email">
                                    </div>
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group flex items-center justify-between mb-5">
                                    <div class="flex items-center justify-between w-2/3"> 
                                        <lable>First Name</lable>
                                        <input type="text" name="firstName" value="${user.firstName}" rules="required" 
                                        class="form-control block border border-grey-light w-2/3 p-3 rounded " placeholder="Email">
                                    </div>
                                    <span class="form-message"></span>
                                </div>
                                <div class="form-group flex items-center justify-between mb-5">
                                    <div class="flex items-center justify-between w-2/3"> 
                                        <lable>Last Name</lable>
                                        <input type="text" name="lastName" value="${user.lastName}" rules="required" 
                                        class="form-control block border border-grey-light w-2/3 p-3 rounded " placeholder="Email">
                                    </div>
                                    <span class="form-message"></span>
                                </div>
                                
                                <div class="form-group flex items-center justify-between mb-5">
                                    <div class="flex items-center justify-between w-2/3"> 
                                        <lable>Avatar</lable>
                                        <input type="file" name="avatar" accept=".png,.jpg" rules="required" 
                                        class="form-control block border border-grey-light w-2/3 p-3 rounded " placeholder="Email">
                                    </div>
                                    <span class="form-message"></span>
                                </div>
                                <button class="form-submit text-center p-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                                    >Update</button>
                            </form>
                       </div>
                       <div class="w-1/3">
                            ${user.avatar
                ? ` <img src="${user.avatar}" class="w-1/2" alt="" id="preview"/> `
                : `<img src="" alt="preview..." id="preview"/>`}
                       </div>
                   </div>
                </div>
            </div>
        `;
        } catch (e) {
            alert('Loi ket noi voi order, vui long login lai')
            clearUser();
            document.location.hash = '/login'
        }
    }
}
export default Profile;