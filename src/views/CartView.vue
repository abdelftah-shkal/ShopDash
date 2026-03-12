<template>
  <section class="w-full max-w-6xl px-6 py-12">
    <div class="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div class="bg-base-100 rounded-2xl shadow-sm border border-primary/10 p-6 space-y-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-primary">Your Cart</h1>
            <p class="text-base-content/70">
              Review items before completing your order.
            </p>
          </div>
          <button
            v-if="cartStore.cartItems.length"
            class="btn btn-ghost"
            @click="cartStore.clearCart()"
          >
            Clear cart
          </button>
        </div>

        <p
          v-if="cartStore.errorState"
          class="rounded-xl bg-error/10 px-4 py-3 text-sm text-error"
        >
          {{ cartStore.errorState }}
        </p>

        <div
          v-if="!cartStore.cartItems.length"
          class="rounded-2xl border border-dashed border-primary/20 p-10 text-center space-y-4"
        >
          <p class="text-lg font-medium">Your cart is empty.</p>
          <RouterLink to="/" class="btn btn-primary">Browse products</RouterLink>
        </div>

        <div v-else class="space-y-4">
          <article
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="flex flex-col gap-4 rounded-2xl border border-primary/10 p-4 md:flex-row md:items-center"
          >
            <img
              :src="item.image"
              :alt="item.imageAlt"
              class="h-28 w-full rounded-xl object-cover md:w-36"
            />

            <div class="flex-1 space-y-2">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                  <p class="text-sm text-base-content/60">
                    {{ item.stock }} available
                  </p>
                </div>
                <button
                  class="btn btn-ghost btn-sm"
                  @click="cartStore.removeFromCart(item.id)"
                >
                  Remove
                </button>
              </div>

              <div class="flex items-center justify-between gap-4">
                <div class="join">
                  <button
                    class="btn join-item"
                    @click="updateQuantity(item.id, item.quantity - 1, item.stock)"
                  >
                    -
                  </button>
                  <button class="btn join-item pointer-events-none">
                    {{ item.quantity }}
                  </button>
                  <button
                    class="btn join-item"
                    :disabled="item.quantity >= item.stock"
                    @click="updateQuantity(item.id, item.quantity + 1, item.stock)"
                  >
                    +
                  </button>
                </div>

                <p class="text-lg font-semibold text-primary">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <aside class="bg-base-100 rounded-2xl shadow-sm border border-primary/10 p-6 h-fit space-y-4">
        <h2 class="text-xl font-semibold">Order Summary</h2>
        <div class="flex items-center justify-between text-base-content/70">
          <span>Items</span>
          <span>{{ cartStore.cartCount }}</span>
        </div>
        <div class="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        <button
          class="btn btn-primary w-full"
          :disabled="isCheckingOut || !cartStore.cartItems.length"
          @click="completeCheckout"
        >
          
          {{ isCheckingOut ? "Processing..." : "Complete Purchase" }}
        </button>
        <p
          v-if="checkoutMessage"
          class="rounded-xl bg-success/10 px-4 py-3 text-sm text-success"
        >
          {{ checkoutMessage }}
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

const router = useRouter();
const cartStore = useCartStore();
const productStore = useProductStore();
const isCheckingOut = ref(false);
const checkoutMessage = ref("");

const updateQuantity = (productId: number, quantity: number, maxStock: number) => {
  checkoutMessage.value = "";
  cartStore.updateQuantity(productId, quantity, maxStock);
};

const completeCheckout = async () => {
  checkoutMessage.value = "";
  isCheckingOut.value = true;

  const purchasedProductId = await cartStore.checkout(productStore);

  if (purchasedProductId) {
    productStore.setFeaturedProduct(purchasedProductId);
    await router.push(`/product/${purchasedProductId}`);
  }

  isCheckingOut.value = false;
};

onMounted(async () => {
  cartStore.loadFromStorage();
  if (!productStore.products.length) {
    await productStore.getAllProducts();
  }
  cartStore.syncStock(productStore.products);
});
</script>
