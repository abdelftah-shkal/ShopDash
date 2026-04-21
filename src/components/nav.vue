<template>
  <div class="w-full bg-base-100/95 border-b border-primary/15 shadow-sm backdrop-blur flex items-center justify-center">
    <div class="navbar max-w-6xl mx-auto px-4">
      <div class="navbar-start mx-auto">
        <div class="dropdown md:hidden">
          <button tabindex="0" class="btn btn-ghost btn-circle" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabindex="-1" class="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 border border-primary/10">
            <li v-for="link in links" :key="`mobile-${link.id}`">
              <RouterLink :to="link.href">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <RouterLink to="/" class="text-xl font-semibold text-primary">
          ShopDash
        </RouterLink>
      </div>

      <div class="navbar-center hidden md:flex">
        <ul class="menu menu-horizontal gap-1 px-1">
          <li v-for="link in links" :key="link.id">
            <RouterLink :to="link.href" active-class="bg-primary text-primary-content">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <RouterLink to="/cart" class="btn btn-ghost btn-circle" aria-label="Cart">
          <div class="indicator">
            <span
              v-if="cartCount"
              class="badge badge-primary badge-sm indicator-item"
            >
              {{ cartCount }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.2 6H19m-8-6v6m6-6v6" />
            </svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

type NavLink = {
  id: string;
  label: string;
  href: string;
};

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cartCount);

defineProps<{
  links: NavLink[];
}>();
</script>
