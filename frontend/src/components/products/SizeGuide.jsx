import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

const SizeGuide = ({ isOpen, onClose }) => {
  useEffect(() => {
    const scrolledPosition = window.scrollY;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrolledPosition}px`;
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrolledPosition);
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {/* Size Guide Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      >
        <div className="relative bg-white max-md:w-full md:h-11/12 dark:bg-zinc-900">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 flex items-center justify-center bg-white p-2 text-gray-700 transition-colors hover:bg-black hover:text-white active:bg-black active:text-white dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black"
            aria-label="Close size guide"
          >
            <XIcon size={20} />
          </button>

          {/* Size Chart Image */}
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}/products/size_chart/Size_Chart_480x480.avif`}
              type="image/avif"
            />
            <img
              alt="Size Chart"
              src={`${import.meta.env.BASE_URL}/products/size_chart/Size_Chart_480x480.webp`}
              className="size-full cursor-default object-contain max-md:scale-125"
            />
          </picture>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SizeGuide;
