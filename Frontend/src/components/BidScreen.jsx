import React, { useState, useEffect } from "react";
import socket from "../utils/socket";


const BidScreen = () => {
  const [bidNews, setBidNews] = useState([]);

  useEffect(() => {
    const handleBidNews = (data) => {
      setBidNews((prevNews) => [data.message, ...prevNews].slice(0, 10)); 
    };

    socket.on("bid-news", handleBidNews);

    return () => {
      socket.off("bid-news", handleBidNews);
    };
  }, []);

  return (
    <div className="w-full bg-cyber-bg bg-opacity-90 text-white p-4 rounded-xl font-terminal">
      <h3 className="text-neon-blue text-lg font-bold glitch mb-2 text-shadow-neon-blue">📢 Bid Activity</h3>
      <ul className="text-sm space-y-2 max-h-80 overflow-y-auto pr-2">
        {bidNews.map((news, idx) => (
          <li key={idx} className="p-1 rounded text-cyan-200 animate-pulse">
            {news}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidScreen; 