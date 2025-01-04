// // src/services/stockService.js

// const API_URL = '/api/stocks'; // Replace with the actual backend URL

// // Get all stocks
// export const getStocks = async () => {
//   const response = await fetch(API_URL);
//   if (!response.ok) throw new Error('Error fetching stocks');
//   return await response.json();
// };

// // Add a new stock
// export const addStock = async (stockData) => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(stockData),
//   });
//   if (!response.ok) throw new Error('Error adding stock');
//   return await response.json();
// };

// // Update an existing stock
// export const updateStock = async (stockId, stockData) => {
//   const response = await fetch(`${API_URL}/${stockId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(stockData),
//   });
//   if (!response.ok) throw new Error('Error updating stock');
//   return await response.json();
// };

// // Delete a stock
// export const deleteStock = async (stockId) => {
//   const response = await fetch(`${API_URL}/${stockId}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) throw new Error('Error deleting stock');
//   return await response.json();
// };


// src/services/stockService.js



// src/services/stockService.js

const mockStocks = [
    { id: 1, name: 'Apple', symbol: 'AAPL', quantity: 10, buyPrice: 150, currentPrice: 175 },
    { id: 2, name: 'Tesla', symbol: 'TSLA', quantity: 5, buyPrice: 600, currentPrice: 650 },
    // Add more mock stocks here
  ];
  
  export const getStocks = async () => {
    return mockStocks;
  };
  
  export const addStock = async (stockData) => {
    const newStock = { ...stockData, id: mockStocks.length + 1, currentPrice: stockData.buyPrice + 50 };
    mockStocks.push(newStock);
    return newStock;
  };
  
  export const deleteStock = async (stockId) => {
    const index = mockStocks.findIndex((stock) => stock.id === stockId);
    if (index !== -1) {
      mockStocks.splice(index, 1);
    }
    return { id: stockId };
  };
  