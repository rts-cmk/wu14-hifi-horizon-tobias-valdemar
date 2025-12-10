import ShopFilterItem from "../shop_filter_item/shop_filter_item";
import { useLoaderData } from "react-router";

export default function ShopFilter() {
  const filters = useLoaderData();
  return (
    <>
      <h2>Sort by</h2>
      <ShopFilterItem name="Brand" options={filters.brands} />
      <ShopFilterItem name="Color" options={filters.colors} />
      <ShopFilterItem
        name="Price"
        type="range"
        priceRange={filters.priceRange}
      />
    </>
  );
}
