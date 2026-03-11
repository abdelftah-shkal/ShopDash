<script setup lang="ts">
import Navbar from "@/components/nav.vue";
import FooterComp from "@/components/footerComp.vue";
import { RouterView } from "vue-router";
const footerBrand = "ShopDash";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "About", href: "/about" },
  { id: 3, label: "Product", href: "/product/101" },
];

const footerLinks = [
  { id: 1, label: "Privacy", href: "#" },
  { id: 2, label: "Terms", href: "#" },
  { id: 3, label: "Support", href: "#" },
];

const footerText = "Sample footer using DaisyUI";
</script>

<template>
  <div
    data-theme="royal-garden"
    class="min-h-screen bg-base-200 flex flex-col"
  >
    <header class="w-full">
      <Navbar
        :links="navLinks"
      />
    </header>

    <main class="w-full flex-1 flex justify-center p-4">
      <RouterView />
    </main>

    <footer class="w-full mt-auto">
      <FooterComp
        :brand="footerBrand"
        :links="footerLinks"
        :text="footerText"
      />
    </footer>
  </div>
</template>
