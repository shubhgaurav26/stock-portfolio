import React from "react";

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold text-orange-500 mb-4 text-center">
        Welcome to Stock Portfolio Tracker
      </h1>
      <p className="text-lg text-green-400 max-w-2xl text-center">
        Track, manage, and optimize your investments in real-time. Stay on top
        of your portfolio's performance with ease, and make smarter investment
        decisions.
      </p>
    </div>
  );
};

export default Home;
