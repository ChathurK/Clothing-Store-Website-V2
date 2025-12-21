import { useState, useRef, useEffect } from "react";
import {
  FunnelIcon,
  SquaresFourIcon,
  DotsNineIcon,
  MagnifyingGlassIcon,
  ShoppingCartSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import CategorySelector from "./CategorySelector";

const SubHeader = ({
  onFilterToggle,
  isFilterOpen,
  gridState,
  onGridStateChange,
  activeCategory,
  onCategoryChange,
  onSearch,
  cartCount = 0,
  onCartClick,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const searchInputRef = useRef(null);
  let lastScrollYRef = useRef(window.scrollY);

  const categories = ["All", "Men", "Women", "Wearables"];
  // Track Product Header visibility
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight =
        document.getElementsByTagName("header")[0].offsetHeight;
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScrollYRef.current &&
        currentScrollY > headerHeight
      ) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div
      className={`sticky ${headerVisible ? "top-16 duration-500 sm:top-12" : "top-0 duration-300"} z-40 border-b border-b-gray-300 bg-white/60 backdrop-blur-xs transition-all dark:border-b-zinc-700 dark:bg-black/60`}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
        {/* Left: Filter Toggle & Grid Size Toggle */}
        <div className="flex items-center gap-2">
          {/* Filter Toggle */}
          {/* <button
            onClick={onFilterToggle}
            className={`group flex h-10 cursor-pointer items-center gap-2 border border-gray-300 px-3 transition-colors ${isFilterOpen ? "bg-black dark:bg-white" : ""} hover:bg-black active:border-black dark:border-zinc-700 dark:hover:bg-white dark:active:border-white`}
            aria-label="Toggle filters"
            title="Toggle filters"
          >
            <FunnelIcon
              size={18}
              className={`${isFilterOpen ? "text-white dark:text-black" : "text-gray-700 dark:text-zinc-400"} transition-colors group-hover:text-white dark:group-hover:text-black`}
            />
            <span
              className={`hidden ${isFilterOpen ? "text-white dark:text-black" : "text-gray-700 dark:text-zinc-400"} text-sm font-medium transition-colors group-hover:text-white sm:inline dark:group-hover:text-black`}
            >
              Filters
            </span>
          </button> */}

          {/* Grid Size Toggle */}
          <button
            onClick={onGridStateChange}
            className="group relative flex h-10 cursor-pointer items-center gap-2 border border-gray-300 px-3 transition-colors hover:bg-black active:border-black dark:border-zinc-700 dark:hover:bg-white dark:active:border-white"
            aria-label="Toggle grid size"
            // title={gridState === "comfortable" ? "Compact" : "Comfortable"}
          >
            {gridState === "comfortable" ? (
              <DotsNineIcon
                size={18}
                className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
              />
            ) : (
              <SquaresFourIcon
                size={18}
                className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
              />
            )}

            {/* <span className="hidden text-sm font-medium text-gray-700 transition-colors group-hover:text-white sm:inline dark:text-zinc-400 dark:group-hover:text-black">
              {gridState === "comfortable" ? "Compact" : "Comfortable"}
            </span> */}
            <span className="absolute top-full left-full mt-1 ml-1 bg-gray-800/50 p-2 text-xs text-gray-200 opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100 group-hover:delay-1000 dark:bg-zinc-800/50 dark:text-zinc-400">
              {gridState === "comfortable" ? "Compact" : "Comfortable"}
            </span>
          </button>
        </div>

        {/* Center: Category Tabs */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 sm:flex">
          <div className="flex gap-1 border border-gray-300 dark:border-zinc-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category.toLowerCase())}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.toLowerCase()
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-gray-700 transition-colors hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Category Selector - Mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 sm:hidden">
          <CategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {/* Right: Search & Cart */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {/* <div className="relative flex items-center">
            {isSearchExpanded ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-10 w-32 border border-gray-300 bg-white px-3 text-sm transition-all outline-none placeholder:text-xs placeholder:italic focus:w-40 sm:w-48 sm:placeholder:text-sm sm:focus:w-64 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleSearchClose}
                  className="group -ml-px flex h-10 cursor-pointer items-center border border-gray-300 bg-black px-2 dark:border-zinc-700 dark:bg-white"
                  aria-label="Close search"
                >
                  <XIcon size={18} className="text-white dark:text-gray-700" />
                </button>
              </form>
            ) : (
              <button
                onClick={handleSearchToggle}
                className="group flex h-10 cursor-pointer items-center gap-2 border border-gray-300 px-3 transition-colors hover:bg-black active:border-black dark:border-zinc-700 dark:hover:bg-white dark:active:border-white"
                aria-label="Search"
              >
                <MagnifyingGlassIcon
                  size={18}
                  className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
                />
              </button>
            )}
          </div> */}

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="group relative flex h-10 cursor-pointer items-center gap-2 border border-gray-300 px-3 transition-colors hover:bg-black active:border-black dark:border-zinc-700 dark:hover:bg-white dark:active:border-white"
            aria-label="Shopping cart"
          >
            <ShoppingCartSimpleIcon
              size={18}
              className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-black text-xs font-medium text-white dark:bg-white dark:text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
