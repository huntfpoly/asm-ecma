import jwt_decode from "jwt-decode";
import UserApi from "./api/UserApi";

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    return cartItems;
};
export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
export const getUserInfo = () => {
    return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {lastName: '', email: '', password: ''};
};
export const clearUser = () => {
    localStorage.removeItem('user');
};
export const setUserInfo = ({
                                _id = '',
                                email = '',
                                password = '',
                                firstName = '',
                                lastName = '',
                                avatar = '',
                                isAdmin = false,
                                token = '',
                            }) => {
    localStorage.setItem(
        'user',
        JSON.stringify({
            _id,
            email,
            password,
            firstName,
            lastName,
            avatar,
            isAdmin,
            token
        })
    );
};
export const cleanCart = () => {
    localStorage.removeItem('cartItems');
};

// export const isToken = localStorage.getItem('token') ? localStorage.getItem('token') : false
// export const isUser = localStorage.getItem('user') ? localStorage.getItem('user') : false
// export const isLogin = (async () => {
//
//         try {
//             const id = JSON.parse(isUser).id;
//             await UserApi.getUser(id, isToken);
//             return true;
//         } catch (e) {
//             return false
//         }
//
//     return false
// })();