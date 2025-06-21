import React, { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";
import Leaderboard from "../components/Leaderboard";
import Sidebar from "../components/Sidebar";
import "../styles/scrollbar.css"; // Add a custom CSS file to style scrollbar

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/memes");
        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    };

    fetchMemes();
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
        <Sidebar />

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
              filteredMemes.map((meme) => <MemeCard
                key={meme.id}
                meme={meme}
                onVoteSuccess={(updatedMeme) => {
                  setMemes((prev) =>
                    prev.map((m) => (m.id === updatedMeme.id ? updatedMeme : m))
                  );
                }}
              />)
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
