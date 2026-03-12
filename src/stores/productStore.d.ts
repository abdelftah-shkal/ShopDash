export function useProductStore(): {
  products: any[]
  featuredProduct: any
  errorState: string | null
  pendingCount: number
  isPending: boolean
  isLoading: boolean
  featuredProducts: any[]
  getProductById: (id: number | string) => any
  setFeaturedProduct: (id: number | string) => void
  getAllProducts: () => Promise<void>
  getOneProduct: (
    id: number | string,
    options?: { preferCache?: boolean },
  ) => Promise<any>
  decreaseStock: (id: number | string) => Promise<void>
  incStock: (id: number | string) => Promise<void>
  getRelatedProducts: any[]
}
