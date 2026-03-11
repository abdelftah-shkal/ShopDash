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
import { onMounted, onUnmounted } from "vue";
const featuredProducts = [
  {
    id: 101,
    title: "Orbit Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Black wireless headphones on a white background",
  },
  {
    id: 102,
    title: "Pulse Smartwatch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Smartwatch close-up on a soft background",
  },
  {
    id: 103,
    title: "Aero Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Mechanical keyboard on a desk",
  },
  {
    id: 104,
    title: "Nova 4K Webcam",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Webcam mounted on top of a monitor",
  },
];

onMounted(() => {
  console.log("Mounted", featuredProducts);
});

onUnmounted(() => {
  console.log("Removed", featuredProducts);
});
</script>
