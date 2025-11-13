import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;

  // Cart actions
  addItem: (product: any, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  clearError: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      addItem: (product: any, quantity: number = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.productId === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image,
              },
            ],
          });
        }
      },

      removeItem: (productId: number) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
