import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

const STORAGE_KEY = "shopdash-cart";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const errorState = ref(null);

  const loadFromStorage = () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      cartItems.value = savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      errorState.value =
        err instanceof Error ? err.message : "Failed to read cart";
      cartItems.value = [];
    }
  };

  const persistCart = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems.value));
  };

  const addToCart = (product) => {
    errorState.value = null;

    if (!product || product.stock < 1) {
      errorState.value = "This product is out of stock.";
      return;
    }

    const existingItem = cartItems.value.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        errorState.value = "No more stock available for this product.";
        return;
      }

      existingItem.quantity += 1;
      return;
    }

    cartItems.value.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      imageAlt: product.imageAlt,
      stock: product.stock,
      quantity: 1,
    });
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  };

  const updateQuantity = (productId, quantity, maxStock) => {
    errorState.value = null;

    const item = cartItems.value.find((entry) => entry.id === productId);
    if (!item) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > maxStock) {
      errorState.value = "Requested quantity exceeds available stock.";
      item.quantity = maxStock;
      item.stock = maxStock;
      return;
    }

    item.quantity = quantity;
    item.stock = maxStock;
  };

  const syncStock = (products) => {
    cartItems.value = cartItems.value
      .map((item) => {
        const latestProduct = products.find((product) => product.id === item.id);

        if (!latestProduct || latestProduct.stock < 1) {
          return null;
        }

        return {
          ...item,
          price: latestProduct.price,
          title: latestProduct.title,
          image: latestProduct.image,
          imageAlt: latestProduct.imageAlt,
          stock: latestProduct.stock,
          quantity: Math.min(item.quantity, latestProduct.stock),
        };
      })
      .filter(Boolean);
  };

  const clearCart = () => {
    cartItems.value = [];
    errorState.value = null;
  };

  const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0),
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity * item.price, 0),
  );

  const checkout = async (productStore) => {
    errorState.value = null;

    if (!cartItems.value.length) {
      errorState.value = "Your cart is empty.";
      return null;
    }

    await productStore.getAllProducts();
    syncStock(productStore.products);

    if (!cartItems.value.length) {
      errorState.value = "Cart items are no longer available.";
      return null;
    }

    const lastPurchasedProductId = cartItems.value[cartItems.value.length - 1]?.id ?? null;

    for (const item of cartItems.value) {
      const latestProduct = productStore.getProductById(item.id);

      if (!latestProduct || latestProduct.stock < item.quantity) {
        errorState.value = `Insufficient stock for ${item.title}.`;
        return null;
      }
    }

    for (const item of cartItems.value) {
      for (let count = 0; count < item.quantity; count += 1) {
        await productStore.decreaseStock(item.id);
      }
      const latestProduct = productStore.getProductById(item.id);
      if (latestProduct) {
        item.stock = latestProduct.stock;
      }
    }

    clearCart();
    return lastPurchasedProductId;
  };

  watch(cartItems, persistCart, { deep: true });

  return {
    cartItems,
    errorState,
    cartCount,
    cartTotal,
    loadFromStorage,
    addToCart,
    removeFromCart,
    updateQuantity,
    syncStock,
    clearCart,
    checkout,
  };
});
