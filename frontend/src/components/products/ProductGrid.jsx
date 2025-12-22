import ProductCard from "./ProductCard";

const ProductGrid = ({ products, gridState }) => {
  const getGridColumns = () => {
    if (gridState === "comfortable") {
      return "grid-cols-2 md:grid-cols-4"; // Mobile: 2, Desktop: 4
    }
    return "grid-cols-3 md:grid-cols-6"; // Mobile: 3, Desktop: 6
  };

  if (!products || products.length === 0)
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-600 dark:text-zinc-400">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );

  return (
    <div className={`grid gap-4 ${getGridColumns()} lg:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
