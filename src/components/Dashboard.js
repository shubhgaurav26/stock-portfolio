// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getStocks } from '../services/stockService';
import HoldingPage from './HoldingPage';

function Dashboard() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const data = await getStocks();
      setStocks(data);
    };
    fetchStocks();
  }, []);

  const totalValue = stocks.reduce((acc, stock) => acc + (stock.quantity * stock.currentPrice), 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="text-lg font-medium mb-4">Total Portfolio Value: ${totalValue.toFixed(2)}</p>
      <ul>
        
       
         <HoldingPage/>
       
      </ul>
    </div>
  );
}

export default Dashboard;
