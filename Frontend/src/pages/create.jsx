import MemeForm from "../components/MemeForm";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-terminal">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-pink-400 hover:text-pink-300 transition text-lg"
      >
        ↩ Back
      </button>

      <h1 className="text-2xl neon-text mb-4">🧠 Create a Meme</h1>
      <MemeForm />
    </div>
  );
};

export default Create;
