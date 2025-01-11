import React, { useState, useEffect } from "react";
import { getAllStocks, deleteStock } from "../api/stockApi";
import StockForm from "./StockForm";

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
      fetchStocks(); // Refresh list after delete
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  return (
    <div>
      <h2>Stock Holdings</h2>

      {/* ✅ "Add Stock" Button (Ensures it is visible) */}
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: "10px" }}>
        {showForm ? "Cancel" : "Add Stock"}
      </button>

      {/* Show StockForm when button is clicked */}
      {showForm && <StockForm onStockAdded={fetchStocks} />}

      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} ({stock.ticker}) - {stock.quantity} @ {stock.buyPrice}
            <button onClick={() => handleDelete(stock.id)} style={{ marginLeft: "10px", color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
