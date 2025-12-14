import { connectDB } from "../../lib/mongodb.js";
import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

// In-memory cache for categories
let cachedCategories = null;
let cacheTime = null;
const CACHE_DURATION = 60000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (
      cachedCategories &&
      cacheTime &&
      Date.now() - cacheTime < CACHE_DURATION
    ) {
      return res.status(200).json(cachedCategories);
    }

    await connectDB();

    const categories = await Category.find({}).populate("products").lean();

    cachedCategories = categories;
    cacheTime = Date.now();

    console.log(`✓ Loaded ${categories.length} categories with products`);

    return res.status(200).json(categories);
  } catch (error) {
    console.error("✗ Error fetching categories:", error);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
}
