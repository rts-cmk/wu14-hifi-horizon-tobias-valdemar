import { useCartStore } from "./CartStore";
import QuantityControl from "./QuantityControl";

export default function CartDropdown() {
    const items = useCartStore(state => state.items);
    const totalPrice = useCartStore(state => state.totalPrice())
    const clearCart = useCartStore(state => state.clearCart);

    if (items.length === 0) {
        return <p>Your cart is empty</p>
    }

    return (
        <div className="cart-dropdown">
            {items.map(item => (
                <div key={item.product.id} className="cart-dropdown__item">
                    <img src={item.image} alt={item.name} />

                    <div className="cart-dropdown__item-details">
                        <p>{item.name}</p>
                        <p>€{item.price.toFixed(2)}</p>
                    </div>

                    <QuantityControl item={item} />
                </div>
            ))}

            <hr />

            <div className="cart-dropdown__total">
                <span>Total:</span>
                <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={clearCart}>Remove all</button>
            <button>Checkout</button>
        </div>
    )
}