import { create } from "zustand"

export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  badge: string
  badgeColor: string
  shortDesc: string
  longDesc: string
  rating: number
  stock: number
  weight: string
  origin: string
}

export type CartItem = {
  product: Product
  qty: number
}

type ShopState = {
  cart: Record<number, CartItem>
  wishlist: number[]
  cartOpen: boolean
  
  setCartOpen: (open: boolean) => void
  toggleWishlist: (id: number) => void
  addToCart: (product: Product) => void
  updateQty: (id: number, delta: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useShopStore = create<ShopState>((set, get) => ({
  cart: {},
  wishlist: [],
  cartOpen: false,

  setCartOpen: (open) => set({ cartOpen: open }),

  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((x) => x !== id)
        : [...state.wishlist, id],
    })),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart[product.id]
      const nextQty = (existing?.qty || 0) + 1
      if (nextQty > product.stock) return state 
      return {
        cart: {
          ...state.cart,
          [product.id]: { product, qty: nextQty },
        },
      }
    }),

  updateQty: (id, delta) =>
    set((state) => {
      const item = state.cart[id]
      if (!item) return state
      const next = item.qty + delta
      if (next <= 0) {
        const { [id]: _removed, ...rest } = state.cart
        return { cart: rest }
      }
      if (next > item.product.stock) return state
      return { cart: { ...state.cart, [id]: { ...item, qty: next } } }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.cart
      return { cart: rest }
    }),

  clearCart: () => set({ cart: {} }),
}))


export const selectCartCount = (s: ShopState) =>
  Object.values(s.cart).reduce((acc, it) => acc + it.qty, 0)

export const selectCartTotal = (s: ShopState) =>
  Object.values(s.cart).reduce((acc, it) => acc + it.product.price * it.qty, 0)

export const selectIsWishlisted = (id: number) => (s: ShopState) =>
  s.wishlist.includes(id)

export const selectWishlistCount = (s: ShopState) => s.wishlist.length

export const selectCartItems = (s: ShopState) => Object.values(s.cart)
