import MemeForm from "../components/memeForm";

const Create = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-terminal">
      <h1 className="text-2xl neon-text mb-4">🧠 Create a Meme</h1>
      <MemeForm />
    </div>
  );
};

export default Create;
