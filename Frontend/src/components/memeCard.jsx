const MemeCard = ({ meme }) => (
    <div className="bg-gray-900 text-white p-4 m-2 w-64 neon-shadow">
      <img src={meme.image_url} alt="meme" className="w-full h-40 object-cover" />
      <h3 className="text-lg font-bold mt-2">{meme.title}</h3>
      <p className="text-sm">Tags: {meme.tags?.join(", ")}</p>
      <p className="text-sm mt-1">Upvotes: {meme.upvotes || 0}</p>
    </div>
  );
  export default MemeCard;
  