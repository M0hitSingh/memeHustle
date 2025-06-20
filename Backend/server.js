// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./index.js";
import { setSocketInstance } from "./socket.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

setSocketInstance(io);

io.on("connection", (socket) => {
  console.log("🟢 WebSocket client connected");
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
