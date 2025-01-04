// src/components/StockForm.js
import React, { useState } from 'react';

const StockForm = ({ onSubmit, initialData = {} }) => {
  const [stockName, setStockName] = useState(initialData.stockName || '');
  const [ticker, setTicker] = useState(initialData.ticker || '');
  const [quantity, setQuantity] = useState(initialData.quantity || '');
  const [buyPrice, setBuyPrice] = useState(initialData.buyPrice || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const stockData = { stockName, ticker, quantity, buyPrice };
    onSubmit(stockData); // Pass stock data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded shadow-lg">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Stock Name</label>
        <input
          type="text"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Buy Price</label>
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
    </form>
  );
};

export default StockForm;
