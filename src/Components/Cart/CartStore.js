import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                const items = get().items
                const existing = items.find(item => item.product.id === product.id)

                if (existing) {
                    const newQuantity = Math.min(
                        existing.quantity + quantity,
                        product.stock
                    )

                    set({
                        items: items.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: newQuantity }
                                : item
                        )
                    })
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                ...product,
                                quantity: Math.min(quantity, product.stock),
                            }
                        ]
                    })
                }
            },

            updateQuantity: (productId, quantity) => {
                const item = get().items.find(item => item.product.id === productId)
                if (!item) return

                if (quantity < 1) {
                    set({ items: get().items.filter(item => item.product.id !== productId) })
                    return
                }

                if (quantity > item.product.stock) return

                set({
                    items: get().items.map(item =>
                        item.product.id === productId
                            ? { ...item, quantity }
                            : item
                    )
                })
            },

            clearCart: () => set({ items: []}),

            totalItems: () => 
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                )
        }),
        {
            name: "cart-storage", // name of the item in the storage
        }
    )
)