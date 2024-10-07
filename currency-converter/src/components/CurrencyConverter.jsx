import { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import ConvertedAmountDisplay from "./ConvertedAmountDisplay"; // New reusable component

// Main CurrencyConverter Component
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EGP");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["EGP", "USD"]
  );

  const API_KEY = "b9fa739c955c4f247b9fe12a";

  // Fetches list of currencies from API
  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await res.json();
      setCurrencies(Object.keys(data.conversion_rates));
    } catch (error) {
      console.error("Error Fetching", error);
      setError("Error fetching currencies. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Handles the currency conversion process
  const convertCurrency = async () => {
    // Validate amount
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setConverting(true);
    setError(null);

    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await res.json();

      if (data.result === "error") {
        throw new Error(data["error-type"]);
      }

      setConvertedAmount(data.conversion_result + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
      setError("Error converting currencies. Please try again later.");
    } finally {
      setConverting(false);
    }
  };

  // Swaps the values of fromCurrency and toCurrency
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Adds or removes a currency from favorites
  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md"> 
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>

      {/* Currencies Dropdown and Swap Button */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          handleFavorite={handleFavorite}
        />
      </div>

      {/* Amount Input Field */}
      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      {/* Convert Button & Converted Amount Display */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={convertCurrency}
          disabled={converting}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${converting ? "animate-pulse cursor-not-allowed" : ""}`}
        >
          {converting ? "Converting..." : "Convert"}
        </button>

        {/* Converted Amount Display */}
        <ConvertedAmountDisplay convertedAmount={convertedAmount} />
      </div>

      {/* Error Message Display */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default CurrencyConverter;
