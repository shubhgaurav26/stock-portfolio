import React, { useEffect, useState } from "react";
import { getAllStocks, createStock, deleteStock, updateStock } from "../api/stockApi";
import StockForm from "../components/StockForm";

const Holdings = () => {
  const [stocks, setStocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStock, setEditStock] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleEdit = (stock) => {
    setEditStock(stock);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedStock) => {
    try {
      await updateStock(updatedStock.id, updatedStock);
      fetchStocks(); // Refresh the stock list
      setIsEditing(false); // Close the edit form
      setEditStock(null); // Clear the edit stock
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const refreshStocks = () => {
    fetchStocks();
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Cool Heading */}
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
        You Can Modify Your Holdings
      </h2>

      <StockForm onStockAdded={refreshStocks} isEditing={isEditing} stock={editStock} onStockUpdated={handleUpdate} />

      {/* Styled Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg">
          <thead className="bg-gray-700">
            <tr className="border-b-2 border-gray-600">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Ticker</th>
              <th className="px-4 py-3 text-left">Buy Price</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="border-b border-gray-600 hover:bg-gray-700 transition duration-200">
                <td className="px-4 py-3">{stock.name}</td>
                <td className="px-4 py-3">{stock.ticker}</td>
                <td className="px-4 py-3">₹{stock.buyPrice.toFixed(2)}</td>
                <td className="px-4 py-3">{stock.quantity}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(stock)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;
