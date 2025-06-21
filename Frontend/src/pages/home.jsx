import React, { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";
import Leaderboard from "../components/Leaderboard";
import BidScreen from "../components/BidScreen"
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
    <div className="h-screen bg-cyber-bg text-white font-terminal overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-neon-pink text-center text-neon-pink text-3xl font-bold glitch text-shadow-neon-pink">
       ( -_-) Meme Hustle (=_= )
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
              {["all", ...Array.from(new Set(memes.flatMap((m) => m.tags)))].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
                      selectedTag === tag
                        ? "bg-neon-pink text-white border-neon-pink shadow-neon-pink"
                        : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-neon-pink hover:text-white hover:border-neon-pink hover:shadow-neon-pink"
                    }`}
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

        {/* Leaderboard &  Bid- 2/12 */}
        <aside className="md:col-span-2 bg-cyber-bg p-4 rounded border border-neon-blue shadow-neon-blue h-full flex flex-col gap-4">
          <div className="h-1/2 overflow-hidden">
            <Leaderboard />
          </div>
          <div className="h-1/2 overflow-hidden">
            <BidScreen />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
