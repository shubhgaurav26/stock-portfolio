// src/components/AddEditStockForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStock } from '../services/stockService';

function AddEditStockForm() {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStock = { symbol, name, quantity, buyPrice };
    await addStock(newStock);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Stock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Stock Name"
          className="w-full p-3 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Stock Symbol"
          className="w-full p-3 mb-4 border rounded-md"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="w-full p-3 mb-4 border rounded-md"
          required
        />
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price"
          className="w-full p-3 mb-6 border rounded-md"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md">Save Stock</button>
      </form>
    </div>
  );
}

export default AddEditStockForm;
