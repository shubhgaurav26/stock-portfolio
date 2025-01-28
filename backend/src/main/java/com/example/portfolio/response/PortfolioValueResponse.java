package com.example.portfolio.response;

public class PortfolioValueResponse {
    private Long userId;
    private double totalValue;

    // Constructor
    public PortfolioValueResponse(Long userId, double totalValue) {
        this.userId = userId;
        this.totalValue = totalValue;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }
}
