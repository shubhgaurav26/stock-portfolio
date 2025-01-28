package com.example.portfolio.controller;

import com.example.portfolio.entity.Stock;
import com.example.portfolio.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private StockService stockService;

    @PostMapping("/add")
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    @PutMapping("/update")
    public Stock updateStock(@RequestBody Stock stock) {
        return stockService.updateStock(stock);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }

    @GetMapping("/all/{userId}")
    public List<Stock> getAllStocks(@PathVariable Long userId) {
        return stockService.getAllStocks(userId);
    }
}