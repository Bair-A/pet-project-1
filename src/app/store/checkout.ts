import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import { CheckoutForm, CheckoutState } from '@/shared/types';

const initialForm: CheckoutForm = {
  fullName: '',
  phone: '',
  isDelivery: false,
  address: ''
};

const useCheckoutStore = create<CheckoutState>()(
  persist(
    set => ({
      form: initialForm,
      setForm: patch => set(state => ({ form: { ...state.form, ...patch } })),
      clearForm: () => set({ form: initialForm })
    }),
    { name: 'checkout-form' }
  )
);

export const useCheckoutForm = () => useCheckoutStore(state => state.form);
export const useCheckoutSetForm = () => useCheckoutStore(state => state.setForm);
export const useCheckoutClearForm = () => useCheckoutStore(state => state.clearForm);

