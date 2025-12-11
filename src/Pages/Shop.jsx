import { useState } from "react";
import ShopFilter from "../Components/shop_filter/shop_filter";
import ProductCard from "../Components/product_card/product_card";
import { useLoaderData } from "react-router";
import "../Styles/shop.scss";

export default function Shop() {
  const data = useLoaderData();
  const [filters, setFilters] = useState({
    brands: new Set(),
    colors: new Set(),
    minPrice: data.priceRange?.min || 0,
    maxPrice: data.priceRange?.max || Infinity,
  });

  // Get all products from all categories
  const allProducts =
    data.categories?.flatMap((cat) => cat.products || []) || [];

  // Filter products based on active filters
  const filteredProducts = allProducts.filter((product) => {
    // Filter by brand
    if (filters.brands.size > 0 && !filters.brands.has(product.brand)) {
      return false;
    }

    // Filter by color (check if product has any variant with selected color)
    if (filters.colors.size > 0) {
      const hasMatchingColor = product.variants?.some((variant) =>
        filters.colors.has(variant.color)
      );
      if (!hasMatchingColor) return false;
    }

    // Filter by price (use discount_price if available)
    const productPrice = product.discount_price ?? product.price;
    if (productPrice < filters.minPrice || productPrice > filters.maxPrice) {
      return false;
    }

    return true;
  });

  const getStock = (product) => {
    // Assuming stock information is stored in product.variants
    if (!product.variants) return 0;
    return product.variants.reduce(
      (total, variant) => total + (variant.stock || 0),
      0
    );
  };

  return (
    <div className="shop-page">
      <div className="shop-page__shop-filters">
        <ShopFilter filters={data} onFilterChange={setFilters} />
      </div>

      <div className="shop-page__products-grid">
        {filteredProducts.map((item) => (
          <ProductCard
            key={`${item.id}-${item.name}`}
            itemId={item.id}
            name={item.name}
            image={item.image}
            price={item.discount_price ?? item.price}
            stock={getStock(item)}
            compareEnabled={true}
            stockEnabled={true}
            cartEnabled={true}
          />
        ))}
      </div>
    </div>
  );
}
