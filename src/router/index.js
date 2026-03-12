import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProductDetailsView from "@/views/productDetails.vue";
import CartView from "@/views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      label: "Home",
      showInNav: true,
      showInFooter: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      label: "About",
      showInNav: true,
      showInFooter: true,
    },
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductDetailsView,
    meta: {
      label: "Product",
      showInNav: false,
      showInFooter: false,
    },
  },
  {
    path: "/product",
    redirect: "/product/101",
    meta: {
      label: "Product",
      href: "/product/101",
      showInNav: true,
      showInFooter: true,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: {
      label: "Cart",
      showInNav: true,
      showInFooter: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
