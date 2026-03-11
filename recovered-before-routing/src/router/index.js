import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProductDetailsView from "@/views/productDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductDetailsView,
  },
  {
    path: "/product",
    redirect: "/product/101",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
