import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";

// CurrencyDropdown Component
const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title,
  handleFavorite,
  favorites,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setIsOpen(false);
  };

  // Filter and sort currencies based on favorites and search term
  const filteredCurrencies = currencies
    .filter((curr) =>
      curr.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (favorites.includes(a) && !favorites.includes(b)) return -1;
      if (!favorites.includes(a) && favorites.includes(b)) return 1;
      return a.localeCompare(b);
    });

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
      <div
        className="flex items-center justify-between p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{currency}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCurrencies.map((curr) => (
              <li
                key={curr}
                onClick={() => handleCurrencyChange(curr)}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>{curr}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(curr);
                  }}
                >
                  {favorites.includes(curr) ? (
                    <HiHeart className="text-red-500" />
                  ) : (
                    <HiHeart className="text-gray-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
