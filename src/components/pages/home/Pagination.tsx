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
  const blockSize = 5; // show 5 pages per block

  // Determine current block start and end
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const blockStart = currentBlock * blockSize + 1;
  const blockEnd = Math.min(blockStart + blockSize - 1, totalPages);

  // Generate page numbers for the block
  const pages: number[] = [];
  for (let i = blockStart; i <= blockEnd; i++) {
    pages.push(i);
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-4">
      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        &lt;
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
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
      ))}

      {/* Next */}
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
