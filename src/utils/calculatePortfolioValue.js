// src/utils/calculatePortfolioValue.js

export const calculatePortfolioValue = (stocks) => {
    return stocks.reduce((total, stock) => {
      return total + (stock.currentPrice * stock.quantity);
    }, 0);
  };
  