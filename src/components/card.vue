<template>
  <div
    class="card w-72 bg-base-100 shadow-md hover:shadow-xl transition duration-300"
  >
    <!-- Image -->
    <figure class="h-44 overflow-hidden relative">
      <img
        :src="product.image"
        :alt="product.imageAlt"
        class="w-full h-full object-cover hover:scale-105 transition"
      />

      <!-- Badges -->
      <div
        v-if="product.badges && product.badges.length"
        class="absolute top-2 left-2 flex gap-2"
      >
        <span
          v-for="badge in product.badges"
          :key="badge"
          :class="[
            'badge badge-sm capitalize',
            badge.toLowerCase() === 'new' ? 'badge-secondary' : 'badge-primary',
          ]"
        >
          {{ badge }}
        </span>
      </div>

      <!-- Out of stock -->
      <span
        v-if="product.stock < 1"
        class="badge badge-error badge-sm absolute top-2 right-2"
      >
        Out of stock
      </span>
    </figure>

    <!-- Content -->
    <div class="card-body p-5">
      <h2 class="card-title text-base">
        {{ product.title }}
      </h2>

      <p class="text-sm text-base-content/70 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Tags -->
      <div
        v-if="product.tags && product.tags.length"
        class="flex flex-wrap gap-2 mt-2"
      >
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="badge badge-outline badge-sm"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Price + Button -->
      <div class="flex items-center justify-between mt-4">
        <span class="text-lg font-bold text-primary">
          ${{ product.price }}
        </span>

        <RouterLink
          :to="`/product/${product.id}`"
          class="btn btn-sm btn-primary"
          :class="{ 'btn-disabled pointer-events-none': product.stock === 0 }"
          :aria-disabled="product.stock === 0"
        >
          view details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  tags?: string[];
  badges?: string[];
  stock: number;
};

defineProps<{
  product: Product;
}>();
</script>
