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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 mx-2 text-base font-semibold rounded-md border transition-all duration-300 
            ${
              page === currentPage
                ? "bg-yellow-400 text-black border-black font-bold"
                : "bg-transparent text-gray-200 border-gray-200 hover:bg-yellow-100 hover:text-black"
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
