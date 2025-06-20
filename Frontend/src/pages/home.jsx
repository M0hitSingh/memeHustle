import React, { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "../components/MemeCard";
import Leaderboard from "../components/Leaderboard";
import "../styles/scrollbar.css"; // Add a custom CSS file to style scrollbar

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/api/memes");
    setMemes(res.data);
  }, []);

  const filteredMemes =
    selectedTag === "all"
      ? memes
      : memes.filter((meme) => meme.tags.includes(selectedTag));

  return (
    <div className="h-screen bg-black text-white font-terminal overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-pink-500 text-center text-pink-400 text-3xl font-bold glitch">
        Meme Hustle Marketplace 🧠🌐
      </header>

      {/* Grid layout */}
      <div className="grid grid-cols-10 gap-4 p-6 h-[calc(100vh-80px)] overflow-hidden">
        {/* User Sidebar - 2/12 */}
        <aside className="md:col-span-2 bg-zinc-900 p-4 rounded border border-zinc-700 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">👤 User</h2>
            <p className="text-sm text-gray-400">cyberpunk420</p>
            <p className="text-sm text-gray-400 mt-1 mb-4">💰 1000 credits</p>

            <button
              className="w-full mb-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded shadow-md text-white transition-all duration-200"
              onClick={() => (window.location.href = "/create")}
            >
              ➕ Create Meme
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow-md text-white transition-all duration-200"
              onClick={() => (window.location.href = "/my-memes")}
            >
              🧠 View Your Memes
            </button>
          </div>
        </aside>

        {/* Spacer - 1/12 */}
        <div className="col-span-1" />

        {/* Meme Feed - 4/12 */}
        <main className="col-span-4 h-full pr-2 overflow-hidden">
          <div className="space-y-4 h-full overflow-y-scroll invisible-scrollbar pr-1">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-2 sticky top-0 bg-black z-10 py-2">
              {["all", "crypto", "funny", "stonks", "matrix", "cat", "finance"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedTag === tag
                        ? "bg-pink-600 text-white border-pink-400"
                        : "bg-zinc-800 text-gray-300 border-zinc-600"
                    } hover:bg-pink-500 transition`}
                  >
                    #{tag}
                  </button>
                )
              )}
            </div>

            {filteredMemes.length === 0 ? (
              <p className="text-center text-gray-500">No memes found.</p>
            ) : (
              filteredMemes.map((meme) => <MemeCard key={meme.id} meme={meme} />)
            )}
          </div>
        </main>

        {/* Spacer - 1/12 */}
        <div className="col-span-1" />

        {/* Leaderboard - 2/12 */}
        <aside className="md:col-span-2 bg-zinc-900 p-4 rounded border border-zinc-700 h-full">
          <Leaderboard />
        </aside>
      </div>
    </div>
  );
};

export default Home;
