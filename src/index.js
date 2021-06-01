import "owl.carousel";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import {hideLoading, parseRequestUrl, showLoading} from "./utils";
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
import Signin from "./pages/Signin";

const $$ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

const routes = {
    "/": HomePage,
    "/products": ProductsPage,
    "/products/:id": ProductDetailPage,
    "/cart/:id": CartProduct,
    "/cart": CartProduct,
    "/admin-categories": AdminCategory,
    "/admin-add-category": AdminAddCategory,
    "/admin-edit-category/:id": AdminEditCategory,
    "/admin-products": AdminProduct,
    "/admin-add-product": AdminAddProduct,
    "/admin-edit-product/:id": AdminEditProduct,
    "/sign-in": Signin,
};

const router = async () => {
    const {resource, id} = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : "/") + (id ? `/:id` : "");
    const page = routes[parseUrl] ? routes[parseUrl] : Error404;
    showLoading();
    let [header, root, footer] = await Promise.all([
        Header.render(),
        page.render(),
        Footer.render()
    ])
    $$("#header").innerHTML = header;
    $$("#root").innerHTML = root;
    $$("#footer").innerHTML = footer;
    hideLoading();
    if (page.afterRender) {
        await page.afterRender()
    }
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