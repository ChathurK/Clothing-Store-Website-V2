import { XIcon } from "@phosphor-icons/react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose, cartItems = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      // document.body.style.width = "fixed";

      return () => {
        // Restore scroll
        document.body.style.position = "";
        document.body.style.top = "";
        // document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    // TODO: Navigate to checkout page
    console.log("Proceeding to checkout");
  };

  return (
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

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-l-gray-300 bg-white dark:border-l-zinc-700 dark:bg-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-b-gray-300 p-4 dark:border-b-zinc-700">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="group flex items-center justify-center border border-gray-300 p-1 transition-colors hover:bg-black active:border-black dark:border-zinc-700 dark:hover:bg-white dark:active:border-white"
                aria-label="Close cart"
              >
                <XIcon
                  size={20}
                  className="text-gray-700 transition-colors group-hover:text-white dark:text-zinc-400 dark:group-hover:text-black"
                />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12">
                  <p className="mb-4 text-gray-600 dark:text-zinc-400">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/products");
                    }}
                    className="border border-gray-300 bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800 active:border-black dark:border-zinc-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:active:border-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-b-gray-300 pb-4 dark:border-b-zinc-700"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="size-20 border border-gray-300 object-cover dark:border-zinc-700"
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 text-sm font-medium">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-zinc-400">
                          ${item.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-t-gray-300 p-4 dark:border-t-zinc-700">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold">
                    $
                    {cartItems
                      .reduce((sum, item) => sum + item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full border border-gray-300 bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800 active:border-black dark:border-zinc-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:active:border-white"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
