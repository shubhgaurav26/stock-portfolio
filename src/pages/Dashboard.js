import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioValue();
    fetchRandomStockTickers();
  }, []);

  const fetchPortfolioValue = async () => {
    try {
      const response = await fetch("/api/portfolio"); // Replace with your API endpoint
      const data = await response.json();

      if (data && data.total) {
        setPortfolioValue(data.total);
      } else {
        console.error("Invalid portfolio value data:", data);
      }
    } catch (error) {
      console.error("Error fetching portfolio value:", error);
    }
  };

  const fetchRandomStockTickers = async () => {
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=YOUR_API_KEY"
      );
      const data = await response.json();

      if (data && Array.isArray(data)) {
        // Select 5 random tickers from the fetched data
        const randomTickers = data.slice(0, 5).map((stock) => stock.symbol);

        fetchStockPrices(randomTickers);
      } else {
        console.error("Invalid data format from stock API:", data);
      }
    } catch (error) {
      console.error("Error fetching stock tickers:", error);
    }
  };

  const fetchStockPrices = async (tickers) => {
    try {
      const stockData = await Promise.all(
        tickers.map(async (ticker) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=YOUR_API_KEY`
          );
          const data = await response.json();

          if (data && data.c !== undefined) {
            // Get stock quantity from localStorage or default to 0
            const quantity = JSON.parse(localStorage.getItem(ticker)) || 0;

            return {
              ticker,
              price: data.c, // Current price of the stock
              quantity,
            };
          } else {
            console.error("Invalid stock data:", data);
            return { ticker, price: 0, quantity: 0 };
          }
        })
      );
      setStocks(stockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const calculateTotalPortfolioValue = () => {
    return stocks.reduce((total, stock) => {
      return total + stock.price * stock.quantity;
    }, 0);
  };

  // This function is called to update the stock quantity in localStorage
  const updateStockQuantity = (ticker, quantity) => {
    localStorage.setItem(ticker, JSON.stringify(quantity));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Portfolio Value: ₹{portfolioValue}</p>
      <h3>Random Stocks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto mt-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="border-b-2 border-gray-600">
              <th className="px-4 py-2">Ticker</th>
              <th className="px-4 py-2">Current Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total Value</th>
              <th className="px-4 py-2">Update Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker} className="border-b border-gray-600">
                <td className="px-4 py-2">{stock.ticker}</td>
                <td className="px-4 py-2">{stock.price}</td>
                <td className="px-4 py-2">{stock.quantity}</td>
                <td className="px-4 py-2">{stock.price * stock.quantity}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      const newQuantity = prompt(
                        "Enter new quantity for " + stock.ticker,
                        stock.quantity
                      );
                      if (newQuantity !== null) {
                        updateStockQuantity(stock.ticker, parseInt(newQuantity));
                        fetchStockPrices([stock.ticker]); // Re-fetch data after update
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
                  >
                    Update Quantity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Total Portfolio Value from Random Stocks: ₹{calculateTotalPortfolioValue()}</p>
    </div>
  );
};

export default Dashboard;
