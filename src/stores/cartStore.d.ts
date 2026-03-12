export function useCartStore(): {
  cartItems: any[]
  errorState: string | null
  cartCount: number
  cartTotal: number
  loadFromStorage: () => void
  addToCart: (product: any) => void
  removeFromCart: (productId: number | string) => void
  updateQuantity: (
    productId: number | string,
    quantity: number,
    maxStock: number,
  ) => void
  syncStock: (products: any[]) => void
  clearCart: () => void
  checkout: (productStore: any) => Promise<number | string | null>
}
