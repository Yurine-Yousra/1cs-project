"use client"

import type React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pageNumbers.push("...")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push("...")
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-yousra hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`flex items-center justify-center w-10 h-10 border rounded-md ${
              currentPage === page ? "bg-yousra text-white border-blue-500" : "border-gray-300 hover:bg-indigo-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-yousra hover:text-white  disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
