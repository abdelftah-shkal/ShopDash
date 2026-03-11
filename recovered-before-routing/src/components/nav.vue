<template>
  <div class="w-full bg-base-100/95 border-b border-primary/15 shadow-sm backdrop-blur">
    <div class="navbar max-w-6xl mx-auto px-4">
      <div class="navbar-start">
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
        <button class="btn btn-ghost btn-circle" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type NavLink = {
  id: number;
  label: string;
  href: string;
};

defineProps<{
  links: NavLink[];
}>();
</script>
