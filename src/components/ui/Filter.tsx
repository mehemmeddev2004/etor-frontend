"use client"
import type React from "react"
import Image from "next/image"

interface FilterProps {
  isOpen: boolean
  onClose: () => void
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg z-60 transition-all duration-300 ease-out">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
            </div>

            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Image
                    src="/img/search.svg"
                    width={20}
                    height={20}
                    alt="search"
                    className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                           focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
                           outline-none transition-all duration-200 text-gray-900 
                           placeholder:text-gray-500 shadow-sm hover:shadow-md"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 
                       rounded-full transition-all duration-200 hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-4 focus:ring-gray-500/10"
              aria-label="Close filter"
            >
              <Image
                src="/img/fa-x.svg"
                width={16}
                height={16}
                alt="Close"
                className="opacity-60 hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Quick filters:</span>
            </div>
            {["New Arrivals", "Sale", "Popular", "Premium"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 
                         hover:bg-gray-200 rounded-full transition-colors duration-200
                         hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
