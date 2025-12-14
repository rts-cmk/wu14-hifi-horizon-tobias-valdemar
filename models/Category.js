import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
