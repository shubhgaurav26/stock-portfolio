// src/components/HoldingPage.js
import React, { useState, useEffect } from 'react';
import { getStocks, deleteStock } from '../services/stockService';
import { useNavigate } from 'react-router-dom';

function HoldingPage() {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  // Fetch stocks from service
  useEffect(() => {
    const fetchStocks = async () => {
      const data = await getStocks();
      setStocks(data);
    };
    fetchStocks();
  }, []);

  // Delete stock by id
  const handleDelete = async (id) => {
    await deleteStock(id);
    setStocks(stocks.filter((stock) => stock.id !== id)); // Remove deleted stock from state
  };

  // Navigate to Edit page (AddEditStockForm)
  const handleEdit = (stock) => {
    navigate(`/edit/${stock.id}`, { state: { stock } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Holdings</h2>
      
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border-b">Stock Name</th>
            <th className="p-2 border-b">Symbol</th>
            <th className="p-2 border-b">Quantity</th>
            <th className="p-2 border-b">Buy Price</th>
            <th className="p-2 border-b">Current Price</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} className="border-b">
              <td className="p-2">{stock.name}</td>
              <td className="p-2">{stock.symbol}</td>
              <td className="p-2">{stock.quantity}</td>
              <td className="p-2">${stock.buyPrice}</td>
              <td className="p-2">${stock.currentPrice}</td>
              <td className="p-2 space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(stock)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(stock.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HoldingPage;
