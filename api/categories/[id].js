import { connectDB } from "../../../lib/mongodb.js";
import Category from "../../../models/Category.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { id } = req.query;
    const category = await Category.findOne({ id: parseInt(id) })
      .populate("products")
      .lean();

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ error: "Failed to fetch category" });
  }
}
