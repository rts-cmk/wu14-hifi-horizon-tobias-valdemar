import { createContext, useEffect, useState } from "react";

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    })

    // Persist cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])
}