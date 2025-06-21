import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const MemeForm = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const reduxUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(reduxUser.id,"asdasdasf")
    const meme = {
      title,
      image_url: imageURL,
      tags: tags.split(",").map((tag) => tag.trim()),
      user_id: reduxUser.id,
    };
    console.log(meme)

    try {
      await api.post("/api/memes", meme);
      alert("Meme created!");
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-cyber-bg text-white space-y-4 border border-neon-blue rounded-lg shadow-neon-blue"
    >
      <h2 className="text-xl font-terminal text-shadow-neon-pink">Create Meme</h2>

      <input
        className="w-full p-2 bg-gray-900 border border-neon-pink rounded focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <input
        className="w-full p-2 bg-gray-900 border border-neon-blue rounded focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
        placeholder="Image URL (optional)"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        disabled={loading}
      />
      <input
        className="w-full p-2 bg-gray-900 border border-neon-pink rounded focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        className="bg-neon-pink px-4 py-2 hover:scale-105 transition glitch text-white shadow-neon-pink rounded flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <span className="loader border-white border-2 border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
        ) : (
          "Upload 🔥"
        )}
      </button>
    </form>
  );
};

export default MemeForm;
