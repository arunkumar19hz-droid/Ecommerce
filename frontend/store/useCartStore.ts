// Zustand State Management Store for GrowX Fashion
// File: frontend/store/useCartStore.ts

import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed_amount';
  value: number;
}

interface CartState {
  cartItems: CartItem[];
  wishlistItems: string[]; // List of product IDs
  appliedCoupon: Coupon | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (coupon: Coupon | null) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getDiscountAmount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  wishlistItems: [],
  appliedCoupon: null,

  addToCart: (item) => set((state) => {
    const existingIndex = state.cartItems.findIndex(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color
    );

    if (existingIndex > -1) {
      const updatedItems = [...state.cartItems];
      updatedItems[existingIndex].quantity += item.quantity;
      return { cartItems: updatedItems };
    }
    return { cartItems: [...state.cartItems, item] };
  }),

  removeFromCart: (id, size, color) => set((state) => ({
    cartItems: state.cartItems.filter(
      (i) => !(i.id === id && i.size === size && i.color === color)
    )
  })),

  updateQuantity: (id, size, color, quantity) => set((state) => ({
    cartItems: state.cartItems.map((i) => 
      (i.id === id && i.size === size && i.color === color) 
        ? { ...i, quantity: Math.max(1, quantity) }
        : i
    )
  })),

  toggleWishlist: (productId) => set((state) => {
    const exists = state.wishlistItems.includes(productId);
    const updated = exists 
      ? state.wishlistItems.filter(id => id !== productId)
      : [...state.wishlistItems, productId];
    return { wishlistItems: updated };
  }),

  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

  clearCart: () => set({ cartItems: [], appliedCoupon: null }),

  getCartSubtotal: () => {
    return get().cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getCartSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    
    if (coupon.discountType === 'percentage') {
      return subtotal * (coupon.value / 100);
    }
    return Math.min(coupon.value, subtotal);
  },

  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().getDiscountAmount();
    const tax = subtotal * 0.18; // 18% GST standard
    const shipping = subtotal > 1500 ? 0 : 100; // Free shipping for orders above ₹1500
    return Math.max(0, subtotal - discount + tax + shipping);
  }
}));
