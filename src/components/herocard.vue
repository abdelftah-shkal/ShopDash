<template>
  <div class="card card-side bg-base-100 shadow-sm">
    <figure>
      <img
        :src="product.image"
        :alt="product.imageAlt"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.title }}</h2>
      <p>{{ product.description }}</p>

      <div
        v-if="product.badges && product.badges.length"
        class="card-actions justify-start"
      >
        <span
          v-for="badge in product.badges"
          :key="badge"
          :class="[
            'badge capitalize',
            badge.toLowerCase() === 'new' ? 'badge-secondary' : 'badge-primary',
          ]"
        >
          {{ badge }}
        </span>
      </div>

      <div class="card-actions justify-start">
        <span
          :class="[
            'badge',
            product.stock < 1
              ? 'badge-error'
              : product.stock <= 5
                ? 'badge-warning'
                : 'badge-success',
          ]"
        >
          {{
            product.stock < 1
              ? 'Out of stock'
              : product.stock <= 5
                ? `${product.stock} left`
                : `${product.stock} in stock`
          }}
        </span>
      </div>

      <div
        v-if="product.tags && product.tags.length"
        class="card-actions justify-start"
      >
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="badge badge-outline"
        >
          {{ tag }}
        </span>
      </div>  
      <div class="card-actions justify-end">
        <p>Price : {{ product.price }} $</p>
        <button
          class="btn btn-primary"
          :disabled="product.stock < 1"
          @click="buyProduct(product.id)"
        >
          {{product.stock > 0 ? 'Buy' : 'Out of Stock'}}
        </button>
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

const buyProductEmit = defineEmits(["buy"]);

function buyProduct(productId: number) {
  buyProductEmit("buy", productId);
}
</script>
