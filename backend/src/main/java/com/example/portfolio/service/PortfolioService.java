package com.example.portfolio.service;

import com.example.portfolio.entity.Portfolio;
import com.example.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio addPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }

    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }
}