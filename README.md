# Stock Portfolio Tracker

Welcome to the **Stock Portfolio Tracker** repository! This project allows users to manage their stock portfolios effectively by adding, updating, and deleting stocks while dynamically calculating portfolio values using real-time stock price data.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Stock Portfolio Tracker** is a full-stack web application that allows users to manage their stock investments. Users can add stocks to their portfolio, view current stock prices fetched from external APIs, and calculate the total value of their holdings. This project is built using modern technologies like React, Tailwind CSS, Java Spring Boot, and MySQL.

---

## Features

### Frontend:
- **Responsive Design:** Built with React and styled using Tailwind CSS.
- **User Authentication:** Login and Sign-up functionality for secure access.
- **Home Page:** Displays a login/sign-up page.
- **Dashboard:** Shows 5 unique random stocks fetched using the Alpha Vantage API.
- **Portfolio Page:**
  - Add, update, and delete stocks.
  - View the total portfolio value dynamically.

### Backend:
- **Java Spring Boot:** Handles API requests and serves as the backend.
- **RESTful APIs:**
  - Add a new stock.
  - Update stock details.
  - Delete a stock.
  - Fetch all stocks and calculate the total portfolio value.
- **Real-time Integration:** Fetches live stock prices from Alpha Vantage API.
- **Exception Handling:** Proper error handling with meaningful HTTP status codes.

### Database:
- **MySQL:** Stores user and portfolio data with the following schema:
  - Users Table: Stores user details like name, email, and password.
  - Portfolios Table: Stores stock details (name, ticker, quantity, buy price).

### Deployment:
- **Frontend:** Deployed on Vercel/Netlify.
- **Backend:** Deployed on Heroku/AWS/Render.

---

## Technologies Used

### Frontend:
- React
- Tailwind CSS

### Backend:
- Java Spring Boot
- MySQL
- JPA and Hibernate

### APIs:
- Alpha Vantage API (for real-time stock prices)

### Deployment:
- Vercel/Netlify (Frontend)
- Heroku/AWS/Render (Backend)

---

## Project Structure

```
stock-portfolio-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── com.example.stockportfolio/
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   └── repository/
│   │   │   ├── resources/
│   │   │   └── StockPortfolioApplication.java
│   ├── pom.xml
│   └── application.properties
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Java 17 or higher installed
- MySQL installed

### Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/stock_portfolio
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```
3. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Database Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE stock_portfolio;
   ```
2. The application will automatically create the required tables.

---

## API Endpoints

### Base URL: `http://localhost:8080`

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/stocks`           | Add a new stock            |
| PUT    | `/api/stocks/{id}`      | Update stock details       |
| DELETE | `/api/stocks/{id}`      | Delete a stock             |
| GET    | `/api/stocks`           | Fetch all stocks           |
| GET    | `/api/stocks/value`     | Get total portfolio value  |

---

## Screenshots

### Dashboard:
![Dashboard Screenshot](link-to-dashboard-screenshot)

### Portfolio Page:
![Portfolio Page Screenshot](link-to-portfolio-page-screenshot)

---

## Future Enhancements

- Add visual charts for portfolio performance.
- Implement multi-currency support.
- Add stock buying/selling simulation features.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
