import { useState, useRef, useEffect } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

const CategorySelector = ({ categories, activeCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // console.group("Click Outside Detected");
        // console.log(dropdownRef.current);
        // console.log(dropdownRef.current.contains(event.target));
        // console.log(event.target);
        // console.groupEnd();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (category) => {
    onCategoryChange(category.toLowerCase());
    setIsOpen(false);
  };

  const getDisplayName = () => {
    return (
      categories.find((cat) => cat.toLowerCase() === activeCategory) || "All"
    );
  };

  return (
    <div ref={dropdownRef} className="relative h-full sm:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-full cursor-pointer border-gray-300 px-3 py-2 text-sm font-medium transition-colors focus:border-black dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus:border-white"
        aria-label="Select category"
      >
        <div className="inline-flex items-center space-x-2">
          <span>{getDisplayName()}</span>
          <CaretDownIcon
            weight="fill"
            size={16}
            className={`transition-transform dark:text-zinc-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-1/2 z-50 mt-1 flex w-fit translate-x-1/2 flex-col divide-y divide-gray-300 border border-gray-300 shadow-lg dark:divide-zinc-700 dark:border-zinc-700">
          {categories.map((category) => {
            return (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`w-full px-3 py-2 text-center text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-black/80 text-white dark:bg-white/90 dark:text-black"
                    : "bg-white/80 text-gray-700 hover:bg-white/90 active:bg-white/90 dark:bg-black/80 dark:text-zinc-300 dark:hover:bg-black/90 dark:active:bg-black/90"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
