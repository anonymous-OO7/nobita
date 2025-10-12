"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();

  // Function to handle page change with scroll: false
  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`, { scroll: false });
  };

  return (
    <nav className="flex justify-center items-center gap-3 py-6">
      <button
        className="px-3 py-1 rounded-full text-sm border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        disabled={!hasPrev}
        aria-label="Previous page"
        onClick={() => handlePageChange(page - 1)} // Use the new handler
      >
        Previous
      </button>
      <span className="mx-1 text-gray-700 text-sm select-none min-w-[36px] text-center">
        {page}
      </span>
      <button
        className="px-3 py-1 rounded-full text-sm border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        disabled={!hasNext}
        aria-label="Next page"
        onClick={() => handlePageChange(page + 1)} // Use the new handler
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
