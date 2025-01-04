// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HoldingPage from './components/HoldingPage';
import AddEditStockForm from './components/AddEditStockForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<AddEditStockForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/holding" element={<HoldingPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
