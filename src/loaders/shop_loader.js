import { API_BASE_URL } from "../config/api";

const CACHE_KEY = "shop_categories_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_DISPLAY = 100;

export const loadShop = async () => {
  // Check localStorage first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data: cachedData, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("✓ Loader using cached shop data");
      const allProducts =
        cachedData.AllCategories?.flatMap((cat) => cat.products || []) || [];
      const maxProducts = Math.min(allProducts.length, MAX_DISPLAY);

      return {
        ...cachedData,
        loadedProducts: allProducts.slice(0, maxProducts),
        fromCache: true,
      };
    }
  }

  // Fetch from API
  console.log("✓ Loader fetching fresh shop data...");
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  if (!categoriesResponse.ok) {
    throw new Error("Failed to load categories");
  }
  const categories = await categoriesResponse.json();

  // Extract all products from all categories
  const allProducts = categories.flatMap((category) => category.products || []);

  // Get unique brands
  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].sort();

  // Get unique colors
  const colors = [
    ...new Set(
      allProducts.flatMap(
        (product) => product.variants?.map((variant) => variant.color) || []
      )
    ),
  ].sort();

  // Get price range (use discount_price if available)
  const prices = allProducts.map(
    (product) => product.discount_price ?? product.price
  );
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const processedData = {
    brands,
    colors,
    priceRange: { min: minPrice, max: maxPrice },
    categories: categories.map((cat) => cat.name),
    AllCategories: categories,
  };

  // Cache it
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data: processedData,
      timestamp: Date.now(),
    })
  );

  const maxProducts = Math.min(allProducts.length, MAX_DISPLAY);

  return {
    ...processedData,
    loadedProducts: allProducts.slice(0, maxProducts),
    fromCache: false,
  };
};
