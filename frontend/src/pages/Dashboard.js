import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockTickers();
  }, []);

  const fetchStockTickers = async () => {
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=ctsp2f1r01qin3c0hcj0ctsp2f1r01qin3c0hcjg"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock tickers.");
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        const randomTickers = data.slice(0, 5).map((stock) => stock.symbol);
        fetchStockPrices(randomTickers);
      } else {
        throw new Error("Invalid data format from stock API.");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching stock tickers:", error);
    }
  };

  const fetchStockPrices = async (tickers) => {
    try {
      const stockData = await Promise.all(
        tickers.map(async (ticker) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=ctsp2f1r01qin3c0hcj0ctsp2f1r01qin3c0hcjg`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch data for ticker: ${ticker}`);
          }

          const data = await response.json();

          if (data && data.c !== undefined) {
            const quantity = 1; // Default quantity

            const stockInfoResponse = await fetch(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=ctsp2f1r01qin3c0hcj0ctsp2f1r01qin3c0hcjg`
            );
            const stockInfo = await stockInfoResponse.json();

            return {
              ticker,
              price: data.c,
              quantity,
              name: stockInfo.name || "Unknown",
            };
          } else {
            throw new Error(`Invalid stock data for ticker: ${ticker}`);
          }
        })
      );
      setStocks(stockData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching stock data:", error);
    }
  };

  const calculateTotalPortfolioValue = () => {
    return stocks.reduce((total, stock) => {
      return total + stock.price * stock.quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-900">Stock Portfolio Dashboard</h2>

      {/* Total Portfolio Value with blurred background */}
      <div
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-8 mb-6"
        style={{
          backdropFilter: "blur(8px)",
        }}
      >
        <h3 className="text-xl font-semibold">
          Total Portfolio Value: ₹{calculateTotalPortfolioValue().toFixed(2)}
        </h3>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mt-4">
          <p className="font-semibold">Error: {error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && !error ? (
        <div className="text-center mt-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stocks...</p>
        </div>
      ) : (
        <table className="min-w-full table-auto mt-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="border-b-2 border-gray-600">
              <th className="px-4 py-2 text-left">Stock Name</th>
              <th className="px-4 py-2 text-left">Ticker</th>
              <th className="px-4 py-2 text-left">Current Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="px-4 py-2">{stock.name}</td>
                <td className="px-4 py-2">{stock.ticker}</td>
                <td className="px-4 py-2">{stock.price}</td>
                <td className="px-4 py-2">{stock.quantity}</td>
                <td className="px-4 py-2">{(stock.price * stock.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

