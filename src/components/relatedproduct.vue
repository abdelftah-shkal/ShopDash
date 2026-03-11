<template>
  <section class="bg-base-200 py-16">

    <div class="max-w-6xl mx-auto px-6">

      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">Related Products</h2>
        <p class="text-base-content/60 mt-2">
          Discover more products you might like
        </p>
      </div>

      <!-- Cards container -->
      <div class="bg-base-100 rounded-2xl shadow-xl p-10">

        <div
          class="grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
          gap-12
          justify-items-center"
        >
          <Card
            v-for="product in relatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

      </div>

    </div>

  </section>
</template>
<script setup lang="ts">
import Card from "@/components/card.vue";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  tags?: string[];
  stock: number;
};

defineProps<{
  relatedProducts: Product[];
}>();
</script>
