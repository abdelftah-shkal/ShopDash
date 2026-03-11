<template>
  <footer
    class="w-full bg-base-100/95 border-t border-primary/15 shadow-sm"
  >
    <div
      class="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <aside class="space-y-1">
        <p class="text-lg font-semibold text-primary">{{ brand }}</p>
        <p class="text-sm text-base-content/70">{{ text }}</p>
      </aside>

      <nav class="flex flex-wrap items-center gap-3">
        <a
          v-for="link in links"
          :key="link.id"
          :href="link.href"
          class="btn btn-ghost btn-sm hover:bg-secondary hover:text-secondary-content"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
type FooterLink = {
  id: number;
  label: string;
  href: string;
};

defineProps<{
  brand: string;
  links: FooterLink[];
  text: string;
}>();
</script>
