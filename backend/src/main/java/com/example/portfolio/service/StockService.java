//package com.example.portfolio.service;
//
//import com.example.portfolio.entity.Stock;
//import com.example.portfolio.repository.StockRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class StockService {
//    @Autowired
//    private StockRepository stockRepository;
//
//    public Stock addStock(Stock stock) {
//        return stockRepository.save(stock);
//    }
//
//    public Stock updateStock(Stock stock) {
//        return stockRepository.save(stock);
//    }
//
//    public void deleteStock(Long id) {
//        stockRepository.deleteById(id);
//    }
//
//    public List<Stock> getAllStocks() {
//        return stockRepository.findAll();
//    }
//}

package com.example.portfolio.service;

import com.example.portfolio.entity.Stock;
import com.example.portfolio.repository.StockRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockService.class);

    @Autowired
    private StockRepository stockRepository;

    @Value("${alphavantage.api.key}")
    private String apiKey;

    @Value("${stock.symbols}")
    private String[] stockSymbols;

    public List<Stock> getRandomStocks() {
        Random random = new Random();
        List<Stock> stocks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            String symbol = stockSymbols[random.nextInt(stockSymbols.length)];
            Stock stock = new Stock();
            stock.setSymbol(symbol);
            stock.setQuantity(1);
            stocks.add(stock);
        }
        return stocks;
    }

    public double getStockPrice(String symbol) {
        String url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("Global Quote")) {
                Map<String, String> globalQuote = (Map<String, String>) response.get("Global Quote");
                if (globalQuote != null && globalQuote.containsKey("05. price")) {
                    return Double.parseDouble(globalQuote.get("05. price"));
                }
            }
        } catch (Exception e) {
            logger.error("Error fetching stock price for symbol: {}", symbol, e);
        }

        return 0.0;
    }

    public double calculatePortfolioValue(List<Stock> stocks) {
        if (stocks == null || stocks.isEmpty()) {
            return 0.0;
        }

        double totalValue = 0;
        for (Stock stock : stocks) {
            double price = getStockPrice(stock.getSymbol());
            totalValue += price * stock.getQuantity();
        }
        return totalValue;
    }

    public Stock addStock(Stock stock) {
        if (stock.getSymbol() == null || stock.getSymbol().isEmpty()) {
            throw new IllegalArgumentException("Stock symbol cannot be null or empty");
        }
        if (stock.getQuantity() <= 0) {
            throw new IllegalArgumentException("Stock quantity must be greater than zero");
        }
        return stockRepository.save(stock);
    }

    public Stock updateStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public void deleteStock(Long stockId) {
        stockRepository.deleteById(stockId);
    }

    public List<Stock> getAllStocks(Long userId) {
        return stockRepository.findByUserId(userId);
    }
}
