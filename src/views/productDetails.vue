<template>
  <div class="w-full py-10 flex justify-center">
    <div class="w-full max-w-6xl px-6 space-y-16">
      <main class="flex justify-center">
        <div class="w-full max-w-5xl">
          <div
            v-if="productStore.isLoading && !currentProduct"
            class="card bg-base-100 shadow-sm p-8 text-center"
          >
            Loading product...
          </div>
          <div
            v-else-if="productStore.errorState && !currentProduct"
            class="card bg-base-100 shadow-sm p-8 text-center text-error"
          >
            {{ productStore.errorState }}
          </div>
          <div
            v-else-if="!currentProduct"
            class="card bg-base-100 shadow-sm p-8 text-center"
          >
            Product not found.
          </div>
          <Herocard
            v-else
            :product="currentProduct"
            @buy="buyHandler"
          />
        </div>
      </main>

      <section v-if="currentProduct">
        <relatedproduct />
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import Herocard from "@/components/herocard.vue";
import relatedproduct from "@/components/relatedproduct.vue";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const productId = computed(() => Number(route.params.id));

const buyHandler = (productId: number) => {
  const product = productStore.getProductById(productId);
  if (product) {
    cartStore.addToCart(product);
    productStore.decrementLocalStock(productId);
  }
};

const currentProduct = computed(() => productStore.featuredProduct);

watch(
  productId,
  async (newId) => {
    if (!Number.isFinite(newId)) {
      return;
    }

    if (!productStore.products.length) {
      await productStore.getAllProducts();
    }

    await productStore.getOneProduct(newId, { preferCache: true });
  },
  { immediate: true },
);
</script>
