<template>
  <section class="w-full max-w-6xl px-6 py-12">
    <div class="bg-base-100 rounded-2xl shadow-sm border border-primary/10 p-8 space-y-8">
      <div class="space-y-4">
        <h1 class="text-3xl font-bold text-primary">About ShopDash</h1>
        <p class="text-base-content/80">
          ShopDash is a Vue and Pinia storefront demo that loads products from a local API, keeps the cart in localStorage, and completes checkout without leaving the SPA flow.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl bg-base-200 p-5">
          <p class="text-sm text-base-content/60">Products loaded</p>
          <p class="mt-2 text-3xl font-semibold text-primary">{{ productCount }}</p>
        </div>
        <div class="rounded-2xl bg-base-200 p-5">
          <p class="text-sm text-base-content/60">Items in cart</p>
          <p class="mt-2 text-3xl font-semibold text-primary">{{ cartCount }}</p>
        </div>
        <div class="rounded-2xl bg-base-200 p-5">
          <p class="text-sm text-base-content/60">Cart total</p>
          <p class="mt-2 text-3xl font-semibold text-primary">${{ cartTotal }}</p>
        </div>
      </div>

      <div class="space-y-3 text-base-content/75">
        <p>
          The Product page shows the selected item and related products from the shared Pinia store.
        </p>
        <p>
          The Cart page stores items locally, validates stock before checkout, and updates product inventory only after purchase is completed.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";

const cartStore = useCartStore();
const productStore = useProductStore();

const productCount = computed(() => productStore.products.length);
const cartCount = computed(() => cartStore.cartCount);
const cartTotal = computed(() => cartStore.cartTotal.toFixed(2));

onMounted(() => {
  cartStore.loadFromStorage();
  if (!productStore.products.length) {
    productStore.getAllProducts();
  }
});
</script>
