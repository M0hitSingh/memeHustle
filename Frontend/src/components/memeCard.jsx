import React from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const MemeCard = ({ meme, onVoteSuccess }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleVote = async (type) => {
    try {
      const res = await api.post(
        `/api/memes/${meme.id}/vote`,
        {
          type,
        }
      );
      if (onVoteSuccess) {
        onVoteSuccess(res.data);
      }
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  const handleBid = async () => {
    if (!isAuthenticated) {
      return alert("Please log in to place a bid.");
    }

    const credits = parseInt(prompt("Enter your bid (in credits):"), 10);

    if (!credits || isNaN(credits)) return alert("Please enter a valid number");

    try {
      await api.post(`/api/memes/${meme.id}/bid`, {
        meme_id: meme.id,
        title: meme.title,
        username: user.name,
        user_id: user.id,
        credits,
      });
    } catch (err) {
      console.error("Bid error:", err);
      alert(err?.response?.data?.message || "Failed to place bid");
    }
  };

  return (
    <div className="bg-cyber-bg border border-neon-blue p-4 rounded-xl shadow-neon-blue w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-bold text-neon-pink mb-2 text-shadow-neon-pink">
        {meme.title}
      </h2>

      <div className="w-full overflow-hidden rounded-md mb-2 bg-zinc-800 border border-neon-pink shadow-neon-pink">
        <img
          src={meme.image_url}
          alt={meme.title}
          className="w-full h-auto rounded-md"
        />
      </div>

      <p className="text-pink-300 italic text-sm">“{meme.caption}”</p>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>🔥 {meme.votes} upvotes</span>
        <div className="flex items-center bg-zinc-800 border border-neon-pink rounded-full px-3 py-1 text-sm text-white font-semibold shadow-neon-pink">
          <button
            onClick={() => handleVote("up")}
            className="hover:text-neon-pink"
          >
            ▲
          </button>
          <span className="mx-2 text-gray-500">|</span>
          <button
            onClick={() => handleVote("down")}
            className="hover:text-neon-pink"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Bid info and button */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-300">
        {meme.highest_bid_user ? (
          <p className="mb-1">
            🏷️ <strong>{meme.highest_bid_user}</strong> bid{" "}
            <strong>{meme.highest_bid} credits</strong>
          </p>
        ) : (
          <p className="mb-1 italic text-gray-500">No bids yet</p>
        )}
        <button
          onClick={handleBid}
          className="mt-1 px-3 py-1 text-sm bg-neon-blue text-white rounded shadow-neon-blue hover:bg-blue-700 transition-all"
        >
          💸 Place Bid
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {meme.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-800 text-neon-blue text-[10px] px-2 py-1 rounded-full border border-neon-blue"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MemeCard;
