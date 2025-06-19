import React, { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "../components/memeCard";

const Home = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
    //   const res = await axios.get("http://localhost:5000/memes");
    const res={
        data:[]
    }
      setMemes(res.data);
    };
    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-terminal">
      <h1 className="text-3xl mb-4">🔥 Meme Hustle Marketplace</h1>
      <div className="flex flex-wrap gap-4">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Home;
