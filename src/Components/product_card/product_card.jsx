import { GiSettingsKnobs } from "react-icons/gi";
import { API_BASE_URL } from "../../config/api";
import { Link } from "react-router";
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
      <Link to={`/productdetails/${itemId}`} className="product-card__link">
        <img
          className="product-card__image"
          src={`${API_BASE_URL}/${image}`}
          alt={name}
        />
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">$ {price}</p>
      </Link>
      <section className="product-card__cart-stock">
        <button className="product-card__add-to-cart">Add to Cart</button>
        {stockEnabled && (
          <p className="product-card__stock">
            {stock ? `In stock: ${stock}` : "Out of stock"}
          </p>
        )}
      </section>
    </article>
  );
}
