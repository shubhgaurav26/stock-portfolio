import React, { useState, useEffect } from 'react';

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stock data from the backend
    // For now, we'll simulate it with static data
    setStocks([
      { symbol: 'AAPL', name: 'Apple', quantity: 10, buyPrice: 150, currentPrice: 170 },
      { symbol: 'GOOGL', name: 'Google', quantity: 5, buyPrice: 2000, currentPrice: 2200 },
      // Add more stocks here
    ]);
  }, []);

  const handleDelete = (symbol) => {
    // Call API to delete stock from the portfolio
    setStocks(stocks.filter(stock => stock.symbol !== symbol));
  };

  const handleEdit = (symbol) => {
    // Implement functionality to edit stock details (show form)
    alert(`Editing stock: ${symbol}`);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Stocks</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Stock Name</th>
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Current Price</th>
            <th className="border px-4 py-2">Total Value</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td className="border px-4 py-2">{stock.name}</td>
              <td className="border px-4 py-2">{stock.symbol}</td>
              <td className="border px-4 py-2">{stock.quantity}</td>
              <td className="border px-4 py-2">${stock.currentPrice}</td>
              <td className="border px-4 py-2">${(stock.currentPrice * stock.quantity).toFixed(2)}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(stock.symbol)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button onClick={() => handleDelete(stock.symbol)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
