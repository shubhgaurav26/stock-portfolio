package com.example.portfolio.controller;

import com.example.portfolio.entity.Stock;
import com.example.portfolio.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private StockService stockService;

    @GetMapping("/random-stocks")
    public List<Stock> getRandomStocks() {
        return stockService.getRandomStocks();
    }
}