// app.js
import express from "express";
import cors from "cors";
import memesRoutes from "./routes/memes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("MemeHustle Backend Running");
});
app.use("/api/memes", memesRoutes);

export default app;
