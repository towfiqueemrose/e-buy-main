"use client";

import { useState } from "react";

const FilterProduct = () => {
  const [sortOrder, setSortOrder] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortOrder(value);
  };

  return (
    <div className="relative">
      <select
        name="sort"
        id=""
        className="py-2 px-2 pl-4 rounded-2xl text-sm font-medium bg-white ring-1 ring-[#8bc249] text-[#79ac3b] appearance-none hover:ring-[#76a947] focus:ring-[#76a947]"
        onChange={handleFilterChange}
        value={sortOrder}
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%238bc249%22%3E%3Cpath d=%22M7 10l5 5 5-5H7z%22/%3E%3C/svg%3E')",
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1rem",
        }}
      >
        <option value="">Sort By</option>
        <option value="asc price">Price (Low to High)</option>
        <option value="desc price">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default FilterProduct;
              