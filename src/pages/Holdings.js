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
    <div>
      <h2>Your Holdings</h2>
      <StockForm onStockAdded={refreshStocks} isEditing={isEditing} stock={editStock} onStockUpdated={handleUpdate} />

      <table className="min-w-full table-auto mt-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="border-b-2 border-gray-600">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Ticker</th>
            <th className="px-4 py-2">Buy Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} className="border-b border-gray-600">
              <td className="px-4 py-2">{stock.name}</td>
              <td className="px-4 py-2">{stock.ticker}</td>
              <td className="px-4 py-2">{stock.buyPrice}</td>
              <td className="px-4 py-2">{stock.quantity}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(stock)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stock.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
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
};

export default Holdings;
