import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title,
  handleFavorite,
  favorites,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setIsOpen(false); // Close the dropdown when a currency is selected
  };

  // Sort currencies: favorites first
  const sortedCurrencies = currencies.sort((a, b) => {
    if (favorites.includes(a) && !favorites.includes(b)) return -1;
    if (!favorites.includes(a) && favorites.includes(b)) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
      <div
        className="flex items-center justify-between p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{currency}</span>
        {/* Arrow Icon */}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {sortedCurrencies.map((curr) => (
            <li
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
            >
              <span>{curr}</span>
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent the dropdown from closing
                handleFavorite(curr);
              }}>
                {favorites.includes(curr) ? (
                  <HiHeart className="text-red-500" />
                ) : (
                  <HiHeart className="text-gray-400" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyDropdown;
