import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("products", () => {
  const API_BASE_URL = "http://localhost:3000/products";
  const products = ref([]);
  const featuredProduct = ref(null);
  const pendingCount = ref(0);
  const isPending = computed(() => pendingCount.value > 0);
  const isLoading = isPending;
  const errorState = ref(null);

  const toErrorMessage = (err) => {
    if (err instanceof Error) return err.message;
    return String(err ?? "Unknown error");
  };

  const upsertProduct = (product) => {
    const index = products.value.findIndex((item) => item.id === product.id);

    if (index === -1) {
      products.value.push(product);
      return;
    }

    products.value[index] = product;
  };

  const getProductById = (id) =>
    products.value.find((product) => Number(product.id) === Number(id)) ?? null;

  const setFeaturedProduct = (id) => {
    featuredProduct.value = getProductById(id);
  };

  const featuredProducts = computed(() => products.value.slice(0, 4));

  const getAllProducts = async () => {
    errorState.value = null;
    pendingCount.value++;
    try {
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      products.value = data;
      if (featuredProduct.value) {
        featuredProduct.value = getProductById(featuredProduct.value.id);
      }
    } catch (err) {
      errorState.value = toErrorMessage(err);
    } finally {
      pendingCount.value--;
    }
  };

  const getOneProduct = async (id, options = {}) => {
    const { preferCache = false } = options;
    errorState.value = null;
    try {
      const cachedProduct = getProductById(id);
      if (cachedProduct) {
        featuredProduct.value = cachedProduct;
        if (preferCache) {
          return cachedProduct;
        }
      }

      pendingCount.value++;
      const response = await fetch(`${API_BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      featuredProduct.value = data;
      upsertProduct(data);
      return data;
    } catch (err) {
      errorState.value = toErrorMessage(err);
      return null;
    } finally {
      if (pendingCount.value > 0) {
        pendingCount.value--;
      }
    }
  };

  const decreaseStock = async (id) => {
    errorState.value = null;
    pendingCount.value++;
    try {
      const product = await fetch(`${API_BASE_URL}/${id}`);
      const data = await product.json();

      if (data.stock <= 0) return;

      const updatedStock = data.stock - 1;

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: updatedStock,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      const updatedProduct = {
        ...data,
        stock: updatedStock,
      };

      upsertProduct(updatedProduct);

      if (Number(featuredProduct.value?.id) === Number(id)) {
        featuredProduct.value = updatedProduct;
      }
    } catch (err) {
      errorState.value = toErrorMessage(err);
    } finally {
      pendingCount.value--;
    }
  };

  const incStock = async (id) => {
    errorState.value = null;
    pendingCount.value++;
    try {
      const product = await fetch(`${API_BASE_URL}/${id}`);
      const data = await product.json();

      const updatedStock = (data.stock || 0) + 1;

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: updatedStock,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      const updatedProduct = {
        ...data,
        stock: updatedStock,
      };

      upsertProduct(updatedProduct);

      if (Number(featuredProduct.value?.id) === Number(id)) {
        featuredProduct.value = updatedProduct;
      }
    } catch (err) {
      errorState.value = toErrorMessage(err);
    } finally {
      pendingCount.value--;
    }
  };

  const decrementLocalStock = (id) => {
    const product = getProductById(id);
    if (!product || product.stock < 1) return;
    product.stock -= 1;
    if (Number(featuredProduct.value?.id) === Number(id)) {
      featuredProduct.value = { ...featuredProduct.value, stock: featuredProduct.value.stock - 1 };
    }
  };

  const incrementLocalStock = (id, qty = 1) => {
    const product = getProductById(id);
    if (!product) return;
    product.stock += qty;
    if (Number(featuredProduct.value?.id) === Number(id)) {
      featuredProduct.value = { ...featuredProduct.value, stock: featuredProduct.value.stock + qty };
    }
  };

  const getRelatedProducts = computed(() => {
    if (!featuredProduct.value) return [];

    return products.value.filter(
      (product) => product.id != featuredProduct.value.id,
    );
  });

  return {
    products,
    featuredProduct,
    errorState,
    pendingCount,
    isPending,
    isLoading,
    featuredProducts,
    getProductById,
    setFeaturedProduct,
    getAllProducts,
    getOneProduct,
    decreaseStock,
    incStock,
    decrementLocalStock,
    incrementLocalStock,
    getRelatedProducts,
  };
});
