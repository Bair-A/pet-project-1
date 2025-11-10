import { CartItem } from '@/shared/types';

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
