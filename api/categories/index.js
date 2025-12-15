import { connectDB } from "../../lib/mongodb.js";
import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

let cachedCategories = null;
let cacheTime = null;
const CACHE_DURATION = 60000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check cache first
    if (
      cachedCategories &&
      cacheTime &&
      Date.now() - cacheTime < CACHE_DURATION
    ) {
      console.log("✓ Served from cache");
      return res.status(200).json(cachedCategories);
    }

    const totalStart = Date.now();

    // Connect to DB
    await connectDB();
    console.log(`✓ Connection: ${Date.now() - totalStart}ms`);

    // Fetch categories and products in parallel
    const queryStart = Date.now();
    const [categories, products] = await Promise.all([
      Category.find({}).lean(),
      Product.find({}).lean(),
    ]);
    console.log(`✓ Query: ${Date.now() - queryStart}ms`);

    // Join them in memory
    const joinStart = Date.now();
    const categoriesWithProducts = categories.map((cat) => ({
      ...cat,
      products: products.filter((p) =>
        cat.products.some(
          (catProdId) => catProdId.toString() === p._id.toString()
        )
      ),
    }));
    console.log(`✓ Join: ${Date.now() - joinStart}ms`);

    console.log(`✓ TOTAL: ${Date.now() - totalStart}ms`);

    // Update cache
    cachedCategories = categoriesWithProducts;
    cacheTime = Date.now();

    console.log(
      `✓ Loaded ${categories.length} categories with ${products.length} products`
    );

    return res.status(200).json(categoriesWithProducts);
  } catch (error) {
    console.error("✗ Error fetching categories:", error);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
}
