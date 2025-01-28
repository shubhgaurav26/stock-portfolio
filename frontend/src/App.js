import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Assuming Header is in the components folder
import Footer from "./components/Footer"; // Assuming Footer is in the components folder
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Holdings from "./pages/Holdings";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/holdings" element={<Holdings />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

