import "owl.carousel";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import {hideLoading, parseRequestUrl, rerender, showLoading} from "./utils";
import Error404 from "./pages/Error404";
import Header from "./components/Header";
import CartProduct from "./pages/CartProduct";
import Footer from "./components/Footer";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminAddCategory from "./pages/admin/AdminAddCategory";
import AdminEditCategory from "./pages/admin/AdminEditCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import CategoryPage from "./pages/CategoryPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BreakCrumbs from "./components/BreakCrumbs";
import {getUserInfo} from "./localStorage";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import AdminOrder from "./pages/admin/AdminOrder";

const $$ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

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
    "/admin-categories": AdminCategory,
    "/admin-add-category": AdminAddCategory,
    "/admin-edit-category/:id": AdminEditCategory,
    "/admin-products": AdminProduct,
    "/admin-add-product": AdminAddProduct,
    "/admin-edit-product/:id": AdminEditProduct,
    "/admin-order": AdminOrder,
    "/sign-in": Signin,
    "/login": Signin,
    "/sign-up": Signup
};

const router = async () => {
    const {resource, id} = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : "/") + (id ? `/:id` : "");
    const {lastName} = getUserInfo();


    if (resource && resource.includes("admin")) {
        if (lastName === '') {
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