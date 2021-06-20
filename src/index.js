import 'owl.carousel';

import {hideLoading, parseRequestUrl, showLoading} from "./utils";
import {getUserInfo} from "./localStorage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import CartProduct from "./pages/CartProduct";
import Checkout from "./pages/Checkout";
import OrderDetail from "./pages/OrderDetail";
import Order from "./pages/Order";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAddCategory from "./pages/admin/AdminAddCategory";
import AdminEditCategory from "./pages/admin/AdminEditCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminOrder from "./pages/admin/AdminOrder";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BreakCrumbs from "./components/BreakCrumbs";

const $$ = document.querySelector.bind(document);
// const $$$ = document.querySelectorAll.bind(document);

const routes = {
    "/": HomePage,
    "/profile": Profile,
    "/products": ProductsPage,
    "/products/:id": ProductDetailPage,
    "/category/:id": CategoryPage,
    "/cart/:id": CartProduct,
    "/cart": CartProduct,
    "/checkout": Checkout,
    "/orders": Order,
    "/order/:id": OrderDetail,
    "/admin-dashboard": AdminDashboard,
    "/admin-categories": AdminCategory,
    "/admin-add-category": AdminAddCategory,
    "/admin-edit-category/:id": AdminEditCategory,
    "/admin-products": AdminProduct,
    "/admin-add-product": AdminAddProduct,
    "/admin-edit-product/:id": AdminEditProduct,
    "/admin-order": AdminOrder,
    "/sign-in": Signin,
    "/login": Signin,
    "/sign-up": Signup,

}
const router = async () => {
    const {resource, id} = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : "/") + (id ? `/:id` : "");

    const {isAdmin, email} = getUserInfo();


    if (resource && resource.includes("admin")) {
        if (email) {
            if (!isAdmin) {
                alert('ban k co quyen truy cap, vui long quay tro lai trang chu')
                document.location.hash = '/'
            }
        } else {
            document.location.hash = '/login'
        }
    }
    const page = routes[parseUrl] ? routes[parseUrl] : Error404;

    showLoading();
    let [header, root, footer] = await Promise.all([
        Header.render(),
        page.render(),
        Footer.render()
    ])
    $$("#header").innerHTML = header;
    resource ? $$("#breakCrumb").innerHTML = BreakCrumbs.render() : $$("#breakCrumb").innerHTML = '';
    $$("#root").innerHTML = root;
    $$("#footer").innerHTML = footer;
    hideLoading();
    if (page.afterRender) {
        await page.afterRender()
    }
    await Header.afterRender();
    // dấu $ này của jquery từ thằng webpack
    $(".owl-carousel").owlCarousel({
        loop: true,
        center: true,
        margin: 10,
        // nav:true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 1,
            },
        },
    });

};
window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
