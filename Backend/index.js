// app.js
import express from "express";
import cors from "cors";
import memesRoutes from "./routes/memes.js";
import userRoutes from "./routes/users.js"

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("MemeHustle Backend Running");
});
app.use("/api/memes", memesRoutes);
app.use("/api/users", userRoutes);

export default app;
