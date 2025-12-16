import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

const SizeGuide = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;

      return () => {
        // Restore scroll
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          /> */}

          {/* Size Guide Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          >
            <div className="relative max-h-[90vh] max-w-4xl overflow-auto bg-white dark:bg-zinc-900">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 flex items-center justify-center border border-gray-300 bg-white p-2 text-gray-700 transition-colors hover:bg-black hover:text-white active:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white"
                aria-label="Close size guide"
              >
                <XIcon size={24} />
              </button>

              {/* Size Chart Image */}
              <img
                src={`${import.meta.env.BASE_URL}/products/size chart.jpg`}
                alt="Size Chart"
                className="h-auto w-full object-contain"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
