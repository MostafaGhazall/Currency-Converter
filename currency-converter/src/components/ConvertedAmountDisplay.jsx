// ConvertedAmountDisplay.jsx

// Displays the converted amount, if available
const ConvertedAmountDisplay = ({ convertedAmount }) => {
    return (
      convertedAmount && (
        <div className="ml-4 text-lg font-medium text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )
    );
  };
  
  export default ConvertedAmountDisplay;
  