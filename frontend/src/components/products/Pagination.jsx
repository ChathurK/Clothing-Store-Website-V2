import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add pages around current
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:bg-black hover:text-white active:border-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:active:border-gray-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white dark:disabled:hover:bg-transparent dark:disabled:hover:text-zinc-400 dark:disabled:active:border-zinc-700"
        aria-label="Previous page"
      >
        <CaretLeftIcon size={18} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-gray-600 dark:text-zinc-400"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center border border-gray-300 text-sm font-medium transition-colors dark:border-zinc-700 ${
              currentPage === page
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-gray-600 hover:bg-gray-100 active:border-black dark:text-zinc-400 dark:hover:bg-zinc-800 dark:active:border-white "
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center border border-gray-300 text-gray-600 transition-colors hover:bg-black hover:text-white active:border-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:active:border-gray-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black dark:active:border-white dark:disabled:hover:bg-transparent dark:disabled:hover:text-zinc-400 dark:disabled:active:border-zinc-700"
        aria-label="Next page"
      >
        <CaretRightIcon size={18} />
      </button>
    </div>
  );
};

export default Pagination;
