import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import api from "../utils/api";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  // Fetch initial leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/api/memes/leaderboard?top=10");
      setTopMemes(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
  
    const handleUpdate = (data) => {
      setTopMemes(data);
    };
  
    socket.on("leaderboard-update", handleUpdate);
  
    return () => {
      socket.off("leaderboard-update", handleUpdate);
    };
  }, []);

  return (
    <div className="w-full bg-cyber-bg bg-opacity-90 text-white p-4 rounded-xl font-terminal">
      <h3 className="text-neon-pink text-lg font-bold glitch mb-2 text-shadow-neon-pink">🏆 Leaderboard</h3>
      <ul className="text-sm space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-600 pr-2">
        {topMemes.map((meme, idx) => (
          <li key={meme.id} className="flex justify-between p-1 rounded hover:bg-neon-pink hover:text-black transition-all duration-200">
            <span>{idx + 1}. {meme.title}</span>
            <span className="text-neon-pink font-bold">{meme.votes}🔥</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
