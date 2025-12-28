import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import ToolTip from "../common/ToolTip";
import { ShoppingBagOpenIcon } from "@phosphor-icons/react/dist/ssr";

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  // Initial position of the pill
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    height: 0,
  });

  const tabRefs = useRef({});

  // Update pill position on activeCategory change
  useEffect(() => {
    const activeButton = tabRefs.current[activeCategory];
    if (activeButton) {
      const { width, height } = activeButton.getBoundingClientRect();
      setPosition({
        left: activeButton.offsetLeft,
        width,
        height,
      });
    }
  }, [activeCategory]);

  return (
    <div className="relative hidden h-full p-1 sm:flex">
      {categories.map((category) => {
        const value = category.value;
        const isActive = activeCategory === value;

        return (
          <button
            ref={(el) => (tabRefs.current[value] = el)}
            key={category.key}
            aria-label={category.label}
            onClick={() => {
              onCategoryChange(value);
            }}
            className={`group relative cursor-pointer p-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "text-white duration-500 dark:text-black"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="relative z-10 inline-block size-5 align-middle">
              {category.icon || <ShoppingBagOpenIcon />}
            </span>

            <ToolTip text={category.label} position={"bc"} marginY={2} />
          </button>
        );
      })}

      <Pill position={position} />
    </div>
  );
};

const Pill = ({ position }) => {
  return (
    <motion.span
      animate={{ ...position }}
      className="pointer-events-none absolute inset-0 top-1/2 -translate-y-1/2 bg-black dark:bg-white"
    ></motion.span>
  );
};

export default CategoryTabs;
