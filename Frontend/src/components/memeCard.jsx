import React from "react";
import axios from "axios";

const MemeCard = ({ meme, onVoteSuccess }) => {
  // Handle vote button clicks
  const handleVote = async (type) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/memes/${meme.id}/vote`, {
        type,
      });

      if (onVoteSuccess) {
        onVoteSuccess(res.data); // Update parent state (optional)
      }
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  return (
    <div className="bg-black border border-pink-600 p-4 rounded-xl shadow-md w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-bold text-cyan-400 mb-2">{meme.title}</h2>

      <div className="w-full overflow-hidden rounded-md mb-2 bg-zinc-800">
        <img
          src={meme.image_url}
          alt={meme.title}
          className="w-full h-auto rounded-md"
        />
      </div>

      <p className="text-pink-300 italic text-sm">“{meme.caption}”</p>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>🔥 {meme.votes} upvotes</span>
        <div className="flex items-center bg-zinc-800 border border-pink-600 rounded-full px-3 py-1 text-sm text-white font-semibold">
          <button
            onClick={() => handleVote("up")}
            className="hover:text-pink-400"
          >
            ▲
          </button>
          <span className="mx-2 text-gray-500">|</span>
          <button
            onClick={() => handleVote("down")}
            className="hover:text-pink-400"
          >
            ▼
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {meme.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-pink-900 text-pink-200 text-[10px] px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MemeCard;
