import { GiSettingsKnobs } from "react-icons/gi";
import { API_BASE_URL } from "../../config/api";
import "./product_card.scss";

export default function ProductCard({
  itemId,
  name,
  image,
  price,
  stock,
  compareEnabled,
  stockEnabled,
}) {
  return (
    <article className="product-card">
      {compareEnabled && (
        <div className="product-card__compare">
          <button className="product-card__compare-button">Compare</button>
          <GiSettingsKnobs />
        </div>
      )}
      <img
        className="product-card__image"
        src={`${API_BASE_URL}/${image}`}
        alt={name}
      />
      <h3 className="product-card__name">{name}</h3>
      <p className="product-card__price">{price}</p>
      <button className="product-card__add-to-cart">Add to Cart</button>
      {stockEnabled && (
        <p className="product-card__stock">
          {stock ? `In stock: ${stock}` : "Out of stock"}
        </p>
      )}
    </article>
  );
}
