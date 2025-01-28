// src/components/EditStockModal.js
import React, { useState } from "react";
import { updateStock } from "../api/stockApi";

const EditStockModal = ({ stock, closeModal, setStocks }) => {
  const [name, setName] = useState(stock.name);
  const [ticker, setTicker] = useState(stock.ticker);
  const [buyPrice, setBuyPrice] = useState(stock.buyPrice);
  const [quantity, setQuantity] = useState(stock.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStock = { name, ticker, buyPrice, quantity };
    const updated = await updateStock(stock.id, updatedStock);
    setStocks((prevStocks) =>
      prevStocks.map((s) => (s.id === updated.id ? updated : s))
    );
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Stock</h2>
        <label>Stock Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <label>Buy Price</label>
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Update Stock</button>
        <button type="button" onClick={closeModal}>Close</button>
      </form>
    </div>
  );
};

export default EditStockModal;
