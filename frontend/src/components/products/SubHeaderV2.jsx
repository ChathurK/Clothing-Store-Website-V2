import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  FunnelIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassIcon,
  ShoppingCartSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  InfinityIcon,
  TShirtIcon,
  DressIcon,
  SneakerIcon,
} from "@phosphor-icons/react";
import CategorySelector from "./CategorySelector";
import ToolTip from "../common/ToolTip";

const SubHeader2 = ({
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

  const categories = [
    {
      key: 1,
      label: "All",
      value: "all",
      icon: <InfinityIcon className="size-full" />,
    },
    {
      key: 2,
      label: "Men",
      value: "men",
      icon: <TShirtIcon className="size-full" />,
    },
    {
      key: 3,
      label: "Women",
      value: "women",
      icon: <DressIcon className="size-full" />,
    },
    {
      key: 4,
      label: "Wearables",
      value: "wearables",
      icon: <SneakerIcon className="size-full" />,
    },
  ];

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

  const _handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery("");
    }
  };

  const _handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const _handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div
      className={`sticky ${headerVisible ? "top-16 duration-500 sm:top-12" : "top-0 duration-300"} dark:border-b-black-300 z-40 border-b bg-white/60 backdrop-blur-xs transition-all dark:bg-black/60`}
    >
      <div className="flex h-16 items-center justify-between sm:h-12">
        {/* Left: Filter Toggle & Grid Size Toggle */}
        <div className="flex h-full items-center gap-2">
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
            className="group dark:border-black-300 relative flex h-full w-16 cursor-pointer items-center justify-center gap-2 border-r px-3 transition-colors duration-300 hover:bg-black active:bg-black sm:w-12 dark:hover:bg-white dark:active:bg-white"
            aria-label="Toggle grid size"
            // title={gridState === "comfortable" ? "Compact" : "Comfortable"}
          >
            {gridState === "comfortable" ? (
              <MagnifyingGlassMinusIcon
                size={20}
                className="text-gray-700 transition-colors duration-300 group-hover:text-white group-active:text-white dark:text-zinc-400 dark:group-hover:text-black dark:group-active:text-black"
              />
            ) : (
              <MagnifyingGlassPlusIcon
                size={20}
                className="text-gray-700 transition-colors duration-300 group-hover:text-white group-active:text-white dark:text-zinc-400 dark:group-hover:text-black dark:group-active:text-black"
              />
            )}

            {/* <span className="hidden text-sm font-medium text-gray-700 transition-colors group-hover:text-white sm:inline dark:text-zinc-400 dark:group-hover:text-black">
              {gridState === "comfortable" ? "Compact" : "Comfortable"}
            </span> */}
            <ToolTip
              text={gridState === "comfortable" ? "Compact" : "Comfortable"}
              position="br"
              marginY={1}
              marginX={1}
            />
          </button>
        </div>

        {/* Center: Category Tabs */}
        {/* <div className="absolute left-1/2 hidden -translate-x-1/2 sm:flex"> */}
        <motion.div layout className="hidden h-full p-1 sm:flex">
          {categories.map((category) => {
            const value = category.value;
            const isActive = activeCategory === value;

            return (
              <button
                key={category.key}
                aria-label={category.label}
                onClick={() => onCategoryChange(value)}
                className={`group relative cursor-pointer p-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white duration-500 dark:text-black"
                    : "text-gray-700 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryTab"
                    // transition={{ type: "spring"}}
                    className="pointer-events-none absolute inset-0 bg-black dark:bg-white"
                  ></motion.span>
                )}
                {/* <span className="relative z-10">{category.label}</span> */}
                <span className="relative z-10 inline-block size-5 align-middle">
                  {category.icon}
                </span>
                <ToolTip text={category.label} position={"bc"} marginY={2} />
              </button>
            );
          })}
        </motion.div>
        {/* </div> */}

        {/* Center: Category Selector - Mobile */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 sm:hidden"> */}
        <CategorySelector
          categories={categories.map((category) => category.label)}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
        {/* </div> */}

        {/* Right: Search & Cart */}
        <div className="flex h-full items-center gap-2">
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
            className="group dark:border-black-300 relative flex h-full w-16 cursor-pointer items-center justify-center gap-2 border-l px-3 transition-colors duration-300 hover:bg-black active:bg-black sm:w-12 dark:hover:bg-white dark:active:bg-white"
            aria-label="Shopping cart"
          >
            <ShoppingCartSimpleIcon
              size={20}
              className="rotate-y-180 text-gray-700 transition-colors duration-300 group-hover:text-white group-active:text-white dark:text-zinc-400 dark:group-hover:text-black dark:group-active:text-black"
            />
            {cartCount > 0 && (
              <span className="absolute top-0 left-0 flex items-center justify-center bg-black px-[0.2rem] text-xs font-medium text-white dark:bg-white dark:text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader2;
