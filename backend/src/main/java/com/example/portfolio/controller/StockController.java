package com.example.portfolio.controller;

import com.example.portfolio.entity.Stock;
import com.example.portfolio.response.PortfolioValueResponse;
import com.example.portfolio.service.StockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    @Autowired
    private StockService stockService;

    @PostMapping("/add")
    public Stock addStock(@Validated @RequestBody Stock stock) {
        logger.info("Adding stock: {}", stock);
        return stockService.addStock(stock);
    }

    @PutMapping("/update")
    public Stock updateStock(@Validated @RequestBody Stock stock) {
        logger.info("Updating stock: {}", stock);
        return stockService.updateStock(stock);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStock(@PathVariable Long id) {
        logger.info("Deleting stock with ID: {}", id);
        stockService.deleteStock(id);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Stock>> getAllStocks(@PathVariable Long userId) {
        logger.info("Fetching all stocks for user ID: {}", userId);
        List<Stock> stocks = stockService.getAllStocks(userId);
        if (stocks.isEmpty()) {
            logger.info("No stocks found for user ID: {}", userId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/portfolio-value/{userId}")
    public ResponseEntity<PortfolioValueResponse> getPortfolioValue(@PathVariable Long userId) {
        logger.info("Calculating portfolio value for user ID: {}", userId);
        List<Stock> stocks = stockService.getAllStocks(userId);
        double totalValue = stockService.calculatePortfolioValue(stocks);
        return ResponseEntity.ok(new PortfolioValueResponse(userId, totalValue));
    }
}
