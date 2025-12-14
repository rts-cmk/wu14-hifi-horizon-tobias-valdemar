import { useEffect, useState } from "react";
import ProductCard from "../../product_card/product_card";
import { API_BASE_URL } from "../../../config/api";
import { useNavigate } from "react-router";

import "../PopularProduct/popularproduct.sass";

const CACHE_KEY = "shop_categories_cache";

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data } = JSON.parse(cached);
      const categoryProducts = data.AllCategories?.[0]?.products || [];
      setProducts(categoryProducts.slice(0, 4));
      setLoading(false);
      return;
    }

    // Fetch if no cache
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((data) => {
        const categoryProducts = data[0]?.products || [];
        setProducts(categoryProducts.slice(0, 4));
        setLoading(false);
      });
  }, []);

  const handleNavigate = () => {
    navigate("/shop");
  };

  return (
    <div className="popular-products">
      <div className="popular-products__section-header">
        <h2>Popular Products</h2>
        <button
          onClick={handleNavigate}
          className="popular-products__see-all-button">
          See all products
        </button>
      </div>
      {loading ? (
        <div className="popular-products__loading">Loading...</div>
      ) : (
        <div className="popular-products__grid">
          {products.map((product) => (
            <ProductCard
              className="popular-products__product-card"
              key={product.id}
              itemId={product.id}
              name={product.name}
              image={product.image}
              price={`€${product.price}`}
              stock={product.variants?.[0]?.stock || 0}
              compareEnabled={false}
              stockEnabled={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
