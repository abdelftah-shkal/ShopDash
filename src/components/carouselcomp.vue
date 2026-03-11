<template>
  <section class="space-y-4">
    <div class="flex items-end justify-between">
      <div>
        <p class="text-sm text-primary/80 font-medium">Featured Picks</p>
        <h2 class="text-2xl md:text-3xl font-bold text-primary">Top Products</h2>
      </div>
      <div class="hidden md:flex gap-2">
        <a
          v-for="product in products"
          :key="`dot-${product.id}`"
          :href="`#slide-${product.id}`"
          class="w-2.5 h-2.5 rounded-full bg-primary/35 hover:bg-secondary transition"
          :aria-label="`Go to ${product.title}`"
        />
      </div>
    </div>

    <div class="carousel w-full rounded-2xl border border-primary/10 bg-base-200 shadow-inner">
      <div
        v-for="product in products"
        :id="`slide-${product.id}`"
        :key="product.id"
        class="carousel-item relative w-full"
      >
        <img
          :src="product.image"
          :alt="product.imageAlt"
          class="h-72 md:h-[420px] w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-neutral/60 via-neutral/10 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-neutral-content">
          <p class="text-xs tracking-[0.2em] uppercase text-secondary">Featured</p>
          <h3 class="text-xl md:text-3xl font-semibold">{{ product.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Product = {
  id: number;
  title: string;
  image: string;
  imageAlt: string;
};

defineProps<{
  products: Product[];
}>();
</script>
