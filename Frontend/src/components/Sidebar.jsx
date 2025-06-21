import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  return (
    <aside className="md:col-span-2 bg-zinc-900 p-4 rounded border border-zinc-700 h-full flex flex-col justify-between">
      <div>
        {isAuthenticated ? (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-pink-500 shadow-lg">
              <img
                src={user.picture || "https://media.tenor.com/i3Qc4TdcXwMAAAAj/duck-meme.gif"}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-center">{user.name}</h2>
            <p className="text-sm text-gray-400 text-center">💰 1000 credits</p>

            <div className="mt-6">
              <button
                className="w-full mb-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded shadow-md text-white"
                onClick={() => navigate("/create")}
              >
                ➕ Create Meme
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow-md text-white"
                onClick={() => navigate("/my-memes")}
              >
                🧠 View Your Memes
              </button>
              <button
                className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded shadow-md text-white"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                🚪 Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kay-UdTxlAHnH7X77sS7zGXrpC8I1PA5eA&s"
              alt="Default Avatar"
              className="w-20 h-20 rounded-full border-2 border-pink-500 mb-4"
            />
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-md"
            >
              Login 
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
