import { useState } from "react";
import { XIcon } from "@phosphor-icons/react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Zara",
    "H&M",
    "Uniqlo",
    "Gucci",
    "Levi's",
  ];
  const availabilityOptions = [
    { label: "In Stock", value: "in-stock" },
    { label: "Low Stock", value: "low-stock" },
    { label: "Out of Stock", value: "out-of-stock" },
  ];

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleSizeToggle = (size) => {
    const currentSizes = filters.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleBrandToggle = (brand) => {
    const currentBrands = filters.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleAvailabilityToggle = (value) => {
    const currentAvailability = filters.availability || [];
    const newAvailability = currentAvailability.includes(value)
      ? currentAvailability.filter((a) => a !== value)
      : [...currentAvailability, value];
    onFilterChange({ ...filters, availability: newAvailability });
  };

  const handleClearAll = () => {
    setPriceRange([0, 1000]);
    onFilterChange({
      priceRange: [0, 1000],
      sizes: [],
      brands: [],
      availability: [],
    });
  };

  const FilterContent = () => (
    <div className="h-full overflow-y-auto p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="group flex items-center justify-center border border-gray-300 p-1 transition-colors hover:bg-black md:hidden dark:border-zinc-700 dark:hover:bg-white"
            aria-label="Close filters"
          >
            <XIcon
              size={18}
              className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
            />
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
              placeholder="Min"
            />
            <span className="text-sm text-gray-600 dark:text-zinc-400">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`border border-gray-300 px-3 py-2 text-sm font-medium transition-colors dark:border-zinc-700 ${
                (filters.sizes || []).includes(size)
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="size-4 cursor-pointer border-gray-300 dark:border-zinc-700"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-400">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Availability</h3>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={(filters.availability || []).includes(option.value)}
                onChange={() => handleAvailabilityToggle(option.value)}
                className="size-4 cursor-pointer border-gray-300 dark:border-zinc-700"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-400">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        {/* Desktop: Side panel */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-72 border-r border-r-gray-300 bg-white dark:border-r-zinc-700 dark:bg-black"
            >
              <FilterContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: Overlay/popover */}
      <div className="block md:hidden">
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/50"
              />

              {/* Panel */}
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-28 right-4 left-4 z-50 max-h-[70vh] overflow-hidden border border-gray-300 bg-white shadow-lg sm:left-auto sm:w-80 dark:border-zinc-700 dark:bg-black"
              >
                <FilterContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FilterPanel;
