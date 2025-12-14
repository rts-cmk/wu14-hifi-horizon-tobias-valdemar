import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  color: String,
  stock: Number,
  image: String,
});

const AdditionalInfoSchema = new mongoose.Schema({
  manufacturer: String,
  model_number: String,
  warranty: String,
  manufacturer_website: String,
  delivery_charge: String,
  delivery_time: String,
  card_surcharge: String,
});

const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  discount_price: { type: Number, default: null },
  image: String,
  brand: String,
  description: String,
  variants: [VariantSchema],
  additional_info: AdditionalInfoSchema,
  specifications: mongoose.Schema.Types.Mixed,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
