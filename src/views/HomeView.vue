<template>
  <section class="w-full max-w-6xl px-6 py-12">
    <div class="bg-base-100 rounded-2xl shadow-sm border border-primary/10 p-6 md:p-10 space-y-8">
      <carouselcomp :products="featuredProducts" />

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p class="text-base-content/75 max-w-2xl">
          Browse premium electronics curated for comfort, productivity, and performance.
        </p>
        <RouterLink to="/product/101" class="btn btn-primary">
          Explore Products
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import carouselcomp from "@/components/carouselcomp.vue";
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const featuredProducts = computed(() => productStore.featuredProducts);

onMounted(() => {
  if (!productStore.products.length) {
    productStore.getAllProducts();
  }
});
</script>
