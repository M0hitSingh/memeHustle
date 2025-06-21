import MemeForm from "../components/MemeForm";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber-bg text-white p-8 font-terminal">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-neon-pink hover:text-pink-300 transition text-lg glitch"
      >
        ↩ Back
      </button>

      <h1 className="text-2xl text-shadow-neon-blue mb-4">🧠 Create a Meme</h1>
      <MemeForm />
    </div>
  );
};

export default Create;
