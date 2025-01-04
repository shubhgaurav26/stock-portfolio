// src/components/StockData.js
import React from 'react';
import { Link } from 'react-router-dom';

const StockData = ({ stocks, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4">Stock Name</th>
            <th className="py-2 px-4">Ticker</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Buy Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{stock.stockName}</td>
              <td className="py-2 px-4">{stock.ticker}</td>
              <td className="py-2 px-4">{stock.quantity}</td>
              <td className="py-2 px-4">${stock.buyPrice}</td>
              <td className="py-2 px-4">
                <Link to={`/edit/${index}`} className="mr-2 text-blue-600">Edit</Link>
                <button onClick={() => onDelete(index)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockData;
