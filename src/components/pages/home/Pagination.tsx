import React from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const siblingCount = 1;
  const boundaryCount = 1;

  // Helper to build the displayed pages array
  const getPages = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= boundaryCount; i++) pages.push(i);

    if (currentPage - siblingCount - boundaryCount > 2) {
      pages.push("...");
    } else if (currentPage - siblingCount - boundaryCount === 2) {
      pages.push(boundaryCount + 1);
    }

    const start = Math.max(currentPage - siblingCount, boundaryCount + 1);
    const end = Math.min(
      currentPage + siblingCount,
      totalPages - boundaryCount
    );
    for (let i = start; i <= end; i++) pages.push(i);

    if (totalPages - boundaryCount - siblingCount - currentPage > 1) {
      pages.push("...");
    } else if (totalPages - boundaryCount - siblingCount - currentPage === 1) {
      pages.push(totalPages - boundaryCount);
    }

    for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    return pages;
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-1 mt-4">
      {/* Previous arrow */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        &lt;
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 h-8 flex items-center justify-center text-gray-300 text-xs"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => goToPage(page as number)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-8 h-8 text-sm rounded-lg border
              ${
                page === currentPage
                  ? "bg-yellow-200 text-yellow-700 font-bold shadow border-yellow-300"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-yellow-50 hover:text-yellow-700"
              }
              transition-all flex items-center justify-center
            `}
          >
            {page}
          </button>
        )
      )}

      {/* Next arrow */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
