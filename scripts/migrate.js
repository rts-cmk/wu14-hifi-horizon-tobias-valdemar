import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
import Product from "../models/Product.js";
import Category from "../models/Category.js";

async function migrate() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    console.log(
      "Connection string:",
      process.env.MONGODB_URI?.replace(/:[^:]*@/, ":***@")
    ); // Hide password
    console.log("Full URI exists?", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hifidb",
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Existing data cleared");

    // Read db.json
    const dbPath = path.join(__dirname, "../server/db.json");
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    console.log("Migrating products and categories...");

    // First, create all products and store them
    const categoryProductMap = new Map();

    for (const category of dbData.categories) {
      if (!category.products || !Array.isArray(category.products)) {
        continue;
      }

      const productIds = [];

      for (const productData of category.products) {
        // Create product in MongoDB
        const product = await Product.create(productData);
        productIds.push(product._id);
        console.log(`Created product: ${product.name}`);
      }

      categoryProductMap.set(category.id, productIds);
    }

    // Then create categories with product references
    for (const categoryData of dbData.categories) {
      const productIds = categoryProductMap.get(categoryData.id) || [];

      const category = await Category.create({
        id: categoryData.id,
        name: categoryData.name,
        products: productIds,
      });

      console.log(
        `Created category: ${category.name} with ${productIds.length} products`
      );
    }

    console.log("\nMigration completed successfully!");
    console.log(`Total products: ${await Product.countDocuments()}`);
    console.log(`Total categories: ${await Category.countDocuments()}`);

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
