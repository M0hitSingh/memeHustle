import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const registerUser = async () => {
      if (isAuthenticated && user) {
        try {
          const res = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              picture: user.picture,
            }),
          });

          const data = await res.json();
          dispatch(setUser(data.user)); // Save user to Redux store

          console.log("🟢 User synced and stored in Redux:", data);
        } catch (error) {
          console.error("🔴 Failed to sync user:", error);
        }
      }
    };

    registerUser();
  }, [isAuthenticated, user, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    logout({ returnTo: window.location.origin });
  };

  return (
    <aside className="md:col-span-2 bg-cyber-bg p-4 rounded border border-neon-blue shadow-neon-blue h-full flex flex-col justify-between">
      <div>
        {isAuthenticated && user ? (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-neon-pink shadow-neon-pink">
              <img
                src={reduxUser?.picture || user.picture || "https://media.tenor.com/i3Qc4TdcXwMAAAAj/duck-meme.gif"}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-center text-shadow-neon-pink">{reduxUser?.name || user.name}</h2>
            <p className="text-sm text-gray-400 text-center">
              💰 {reduxUser ? `${reduxUser.credits} credits` : "..."}
            </p>

            <div className="mt-6">
              <button
                className="w-full mb-2 px-4 py-2 bg-neon-pink hover:bg-pink-700 rounded shadow-neon-pink text-white transition-all duration-300"
                onClick={() => navigate("/create")}
              >
                ➕ Create Meme
              </button>
              <button
                className="w-full mt-4 px-4 py-2 bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black rounded shadow-neon-pink transition-all duration-300"
                onClick={handleLogout}
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
              className="w-20 h-20 rounded-full border-2 border-neon-pink mb-4 shadow-neon-pink"
            />
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-neon-blue hover:bg-blue-700 text-white rounded shadow-neon-blue transition-all duration-300"
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
