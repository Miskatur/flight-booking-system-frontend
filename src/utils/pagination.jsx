import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const limitValues = [10, 15, 20, 30];

const Pagination = ({
  totalItems,
  limit,
  setLimit,
  currentPage,
  onPageChange,
}) => {
  // ==== CALCULATE TOTAL PAGES ====
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  // ==== HANDLING PREV PAGE ====
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // ==== HANDLING NEXT PAGE ====
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {/* larger device */}
      <div className="hidden w-full items-center justify-between gap-4 lg:flex ">
        {/* Prev Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-1 rounded"
        >
          <ChevronLeft className="mr-2" size={16} />
          Previous
        </button>

        {/* Per Page Dropdown and Displaying Number */}
        <div className="flex items-center gap-2">
          <Select defaultValue="10" onValueChange={setLimit}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="w-16">
              {limitValues.map((value, index) => {
                return (
                  <SelectItem key={index} value={String(value)}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            Results per page | Displaying{" "}
            {totalItems > 0
              ? Math.min(1 + (currentPage - 1) * Number(limit), totalItems)
              : 0}{" "}
            -{" "}
            {totalItems > 0
              ? Math.min(currentPage * Number(limit), totalItems)
              : 0}{" "}
            of {totalItems}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-1 rounded"
        >
          Next <ChevronRight className="ml-2" size={16} />
        </button>
      </div>
      {/* smaller device */}
      <div className="flex w-full flex-col gap-8 lg:hidden">
        {/* Per Page Dropdown and Displaying Number */}
        <div className="flex items-center gap-4">
          <Select defaultValue="10" onValueChange={setLimit}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="w-16">
              {limitValues.map((value, index) => {
                return (
                  <SelectItem key={index} value={String(value)}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">
            Results per page | Displaying{" "}
            {totalItems > 0
              ? Math.min(1 + (currentPage - 1) * Number(limit), totalItems)
              : 0}{" "}
            -{" "}
            {totalItems > 0
              ? Math.min(currentPage * Number(limit), totalItems)
              : 0}{" "}
            of {totalItems}
          </div>
        </div>
        {/* prev and next button */}
        <div className="flex w-full items-center justify-between gap-4">
          {/* Prev Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-white px-3 py-1 rounded"
          >
            <ChevronLeft className="mr-2" size={16} />
            Previous
          </button>
          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-white px-3 py-1 rounded"
          >
            Next <ChevronRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
