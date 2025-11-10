import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import { CartItem, CartState, Product } from '@/shared/types';

function upsertItem(items: CartItem[], product: Product, qty = 1): CartItem[] {
  const index = items.findIndex(i => i.product.id === product.id);
  if (index === -1) {
    return [...items, { product, quantity: qty > 0 ? qty : 1 }];
  }
  const next = [...items];
  next[index] = { ...next[index], quantity: next[index].quantity + (qty > 0 ? qty : 1) };
  return next;
}

function removeItem(items: CartItem[], productId: number): CartItem[] {
  return items.filter(i => i.product.id !== productId);
}

function decrementItem(items: CartItem[], productId: number): CartItem[] {
  const index = items.findIndex(i => i.product.id === productId);
  if (index === -1) return items;
  const item = items[index];
  if (item.quantity <= 1) return removeItem(items, productId);
  const next = [...items];
  next[index] = { ...item, quantity: item.quantity - 1 };
  return next;
}

const useCartStore = create<CartState>()(
  persist(
    set => ({
      items: [],
      addItem: (product, qty = 1) =>
        set(state => ({ items: upsertItem(state.items, product, qty) })),
      removeItem: productId => set(state => ({ items: removeItem(state.items, productId) })),
      decrementItem: productId => set(state => ({ items: decrementItem(state.items, productId) })),
      clear: () => set({ items: [] })
    }),
    { name: 'cart-storage' }
  )
);

// Selectors / hooks
export const useCartItems = () => useCartStore(state => state.items);
export const useCartAddItem = () => useCartStore(state => state.addItem);
export const useCartRemoveItem = () => useCartStore(state => state.removeItem);
export const useCartDecrementItem = () => useCartStore(state => state.decrementItem);
export const useCartClear = () => useCartStore(state => state.clear);
export const useCartCount = () =>
  useCartStore(state => state.items.reduce((sum, i) => sum + i.quantity, 0));

