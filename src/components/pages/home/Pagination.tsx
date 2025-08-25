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

  // Always show all pages (for this style)
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="flex justify-center items-center gap-3 mt-4">
        {/* Previous */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
          className="px-2 py-2 text-xs rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition-all disabled:text-gray-300 disabled:bg-white disabled:border-gray-200 flex items-center"
        >
          <span className="mr-1">&lt;</span> Previous
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-5 h-5 px-2 text-xs rounded-full flex items-center justify-center font-medium transition-all
    ${
      page === currentPage
        ? "bg-gray-900 text-white"
        : "bg-transparent text-gray-900 hover:bg-gray-100"
    }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
          className="px-2 py-2 text-xs rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition-all disabled:text-gray-300 disabled:bg-white disabled:border-gray-200 flex items-center"
        >
          Next <span className="ml-1">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
