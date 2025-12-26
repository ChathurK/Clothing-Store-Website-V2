/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import ProductsHeader from "../components/products/ProductsHeader";
import SubHeader from "../components/products/SubHeader";
import SubHeader2 from "../components/products/SubHeaderV2";
import SubHeader3 from "../components/products/SubHeaderV3";
import FilterPanel from "../components/products/FilterPanel";
import ProductGrid from "../components/products/ProductGrid";
import CartModal from "../components/products/CartModal";
import ScrollerToTopBtn from "../components/common/ScrollerToTopBtn";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [gridState, setGridState] = useState(() => {
    return sessionStorage.getItem("gridState") || "comfortable";
  });

  // Filter States
  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
    priceRange: [0, 1000],
    sizes: [],
    brands: [],
    availability: [],
  });

  // Pagination States
  const productsPerPage = 20;
  const [visibleCount, setVisibleCount] = useState(productsPerPage);

  // Set document title
  useEffect(() => {
    document.title = "Products - Integral";
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Add stock information to products (simulated)
        const productsWithStock = data.map((product) => ({
          ...product,
          stock: Math.floor(Math.random() * 20), // Random stock 0-20
        }));

        const doubledProductsWithSeparateId = productsWithStock.map(
          (product) => ({
            ...product,
            id: product.id + productsWithStock.length, // Create a new unique ID
          }),
        );
        const allProducts = [
          ...productsWithStock,
          ...doubledProductsWithSeparateId,
        ];

        setProducts(allProducts);
        // throw new Error("Failed to fetch products"); // For testing error state
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      if (filters.category === "men") {
        result = result.filter((p) => p.category.toLowerCase().includes("men"));
      } else if (filters.category === "women") {
        result = result.filter((p) =>
          p.category.toLowerCase().includes("women"),
        );
      } else if (filters.category === "wearables") {
        result = result.filter(
          (p) =>
            p.category.toLowerCase().includes("jewelery") ||
            p.category.toLowerCase().includes("electronics"),
        );
      }
    }

    // Search filter
    if (filters.searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(filters.searchQuery.toLowerCase()),
      );
    }

    // Price filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter((p) => {
        if (filters.availability.includes("in-stock") && p.stock >= 5)
          return true;
        if (
          filters.availability.includes("low-stock") &&
          p.stock > 0 &&
          p.stock < 5
        )
          return true;
        if (filters.availability.includes("out-of-stock") && p.stock === 0)
          return true;
        return false;
      });
    }

    setFilteredProducts(result);
    setVisibleCount(productsPerPage); // Reset visible items when filters change
  }, [filters, products]);

  // Load More batching (20 by 20)
  const currentProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  // Handlers
  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleGridStateChange = () => {
    setGridState((prevState) => {
      return prevState === "comfortable" ? "compact" : "comfortable";
    });
  };

  useEffect(() => {
    sessionStorage.setItem("gridState", gridState);
  }, [gridState]);

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handleSearch = (query) => {
    setFilters({ ...filters, searchQuery: query });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + productsPerPage, filteredProducts.length),
    );
  };

  return (
    <div id="pg-products" className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header */}
      <ProductsHeader />

      <div className="h-16 sm:h-12"></div>

      {/* Sub Header */}
      <SubHeader2
        onFilterToggle={handleFilterToggle}
        isFilterOpen={isFilterOpen}
        gridState={gridState}
        onGridStateChange={handleGridStateChange}
        activeCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        cartCount={10}
        onCartClick={handleCartClick}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Filter Panel - Desktop/Mobile */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Products Section */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Loading State */}
          {loading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 inline-block size-12 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-zinc-700 dark:border-t-white"></div>
                <p className="text-gray-600 dark:text-zinc-400">
                  Loading products...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-lg font-semibold text-red-600">
                  Error loading products
                </p>
                <p className="text-gray-600 dark:text-zinc-400">{error}</p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <ProductGrid products={currentProducts} gridState={gridState} />
          )}

          {/* Results Count and Load More */}
          {!loading && !error && (
            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              <p className="text-xs text-gray-600 dark:text-zinc-400">
                Showing {filteredProducts.length === 0 ? 0 : 1}-
                {Math.min(visibleCount, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={!hasMoreProducts}
                className="cursor-pointer bg-black px-4 py-2 text-sm font-medium text-white active:ring-1 active:ring-black disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:active:ring-white"
              >
                {hasMoreProducts ? "Load More" : "No More Products"}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-t-gray-300 py-6 dark:border-t-zinc-700">
        <p className="text-center text-xs text-gray-500 dark:text-zinc-500">
          © 2025 Integral Clothing. All rights reserved.
        </p>
      </footer>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={[]}
      />

      {/* Scroll to Top Button */}
      <ScrollerToTopBtn percentage={25} />
    </div>
  );
};

export default Products;
