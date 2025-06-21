import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // replace with your backend URL if deployed

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  // Fetch initial leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/memes/leaderboard?top=10");
      const data = await res.json();
      setTopMemes(data);
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
    <div className="w-full bg-zinc-900 bg-opacity-90 border border-pink-500 text-white p-4 rounded-xl shadow-lg font-terminal">
      <h3 className="text-pink-500 text-lg font-bold glitch mb-2">🏆 Leaderboard</h3>
      <ul className="text-sm space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-600 pr-2">
        {topMemes.map((meme, idx) => (
          <li key={meme.id} className="flex justify-between">
            <span>{idx + 1}. {meme.title}</span>
            <span className="text-pink-400">{meme.votes}🔥</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
