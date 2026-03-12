<script setup lang="ts">
import Navbar from "@/components/nav.vue";
import FooterComp from "@/components/footerComp.vue";
import { RouterView, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";

type AppLink = {
  id: string;
  label: string;
  href: string;
};

const footerBrand = "ShopDash";
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const toAppLink = (route: any): AppLink => ({
  id: String(route.name ?? route.path),
  label: String(route.meta?.label ?? route.name ?? route.path),
  href: String(route.meta?.href ?? route.path),
});

const navLinks = computed(() =>
  router.options.routes
    .filter((route) => route.meta?.showInNav)
    .map(toAppLink),
);

const footerLinks = computed(() =>
  router.options.routes
    .filter((route) => route.meta?.showInFooter)
    .map(toAppLink),
);

const footerText = "The most interisting shop";

onMounted(() => {
  cartStore.loadFromStorage();
  if (!productStore.products.length) {
    productStore.getAllProducts();
  }
});
</script>

<template>
  <div
    data-theme="royal-garden"
    class="min-h-screen bg-base-200 flex flex-col"
  >
    <header class="w-full">
      <Navbar
        :links="navLinks"
      />
    </header>

    <main class="w-full flex-1 flex justify-center p-4">
      <RouterView />
    </main>

    <footer class="w-full mt-auto">
      <FooterComp
        :brand="footerBrand"
        :links="footerLinks"
        :text="footerText"
      />
    </footer>
  </div>
</template>
