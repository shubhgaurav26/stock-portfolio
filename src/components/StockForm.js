import React, { useState, useEffect } from "react";
import { createStock, updateStock } from "../api/stockApi"; // Ensure these are imported

const StockForm = ({ onStockAdded, isEditing, stock, onStockUpdated }) => {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (isEditing && stock) {
      setName(stock.name);
      setTicker(stock.ticker);
      setBuyPrice(stock.buyPrice);
      setQuantity(stock.quantity);
    }
  }, [isEditing, stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !ticker || !buyPrice || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const newStock = {
      name,
      ticker,
      buyPrice,
      quantity,
    };

    if (isEditing) {
      onStockUpdated({ ...newStock, id: stock.id });
    } else {
      try {
        await createStock(newStock);
        setName("");
        setTicker("");
        setBuyPrice("");
        setQuantity("");
        onStockAdded();
      } catch (error) {
        console.error("Error creating stock:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-white">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-black"
            placeholder="Stock Name"
          />
        </div>
        <div>
          <label className="block text-white">Ticker:</label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full px-4 py-2 text-black"
            placeholder="Ticker Symbol"
          />
        </div>
        <div>
          <label className="block text-white">Buy Price:</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full px-4 py-2 text-black"
            placeholder="Buy Price"
          />
        </div>
        <div>
          <label className="block text-white">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 text-black"
            placeholder="Quantity"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
      >
        {isEditing ? "Update Stock" : "Add Stock"}
      </button>
    </form>
  );
};

export default StockForm;
