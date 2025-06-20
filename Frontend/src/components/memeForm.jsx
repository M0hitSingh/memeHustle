import React, { useState } from "react";
import axios from "axios";

const MemeForm = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meme = {
      title,
      image_url: imageURL,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    try {
      await axios.post("http://localhost:5000/api/memes", meme);
      alert("Meme created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black text-white space-y-4">
      <h2 className="text-xl font-terminal">Create Meme</h2>
      <input
        className="w-full p-2 bg-gray-900 border border-pink-500"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 bg-gray-900 border border-blue-500"
        placeholder="Image URL (optional)"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <input
        className="w-full p-2 bg-gray-900 border border-green-500"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        type="submit"
        className="bg-pink-600 px-4 py-2 hover:scale-105 transition glitch"
      >
        Upload 🔥
      </button>
    </form>
  );
};

export default MemeForm;
