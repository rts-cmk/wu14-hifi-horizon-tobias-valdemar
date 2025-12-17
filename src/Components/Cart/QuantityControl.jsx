import { useCartStore } from "./CartStore";

export default function QuantityControl({ item }) {
    const updateQuantity = useCartStore(state => state.updateQuantity);

    return (
        <div className="quantity-control">
            <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
            >
                -
            </button>

            <span>{item.quantity}</span>

            <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
            >
                +
            </button>
        </div>
    )
}