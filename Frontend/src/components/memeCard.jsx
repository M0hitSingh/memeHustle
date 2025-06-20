import React from "react";

const MemeCard = ({ meme }) => {
  return (
    <div className="bg-black border border-pink-600 p-4 rounded-xl shadow-md w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-bold text-cyan-400 mb-2">{meme.title}</h2>

      <div className="w-full h-48 overflow-hidden rounded-md mb-2">
        <img
          src={meme.image_url}
          alt={meme.title}
          className="object-cover w-full h-full"
        />
      </div>

      <p className="text-pink-300 italic text-sm">“{meme.caption}”</p>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>🔥 {meme.votes} upvotes</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {meme.tags.map((tag, idx) => (
          <span key={idx} className="bg-pink-900 text-pink-200 text-[10px] px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MemeCard;
