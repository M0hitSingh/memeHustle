import express from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase.js";

const router = express.Router();
let io = null;
export const setSocketInstance = (socketInstance) => {
  io = socketInstance;
};
/**
 * @description    Get all memes
 */
router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("memes").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

/**
 * @description    Get top memes sorted by upvotes
 * @query   top - number of top memes to return (default: 10)
 */
router.get("/leaderboard", async (req, res) => {
    const topLimit = parseInt(req.query.top) || 10;
    const { data, error } = await supabase
      .from("memes")
      .select("*")
      .order("votes", { ascending: false })
      .limit(topLimit);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

/**
 * @description    Create a new meme
 * @body    { title, image_url, caption, tags, vibe }
 */
router.post("/", async (req, res) => {
    const { title, image_url, caption, tags, vibe } = req.body;
    const newMeme = {
      votes: 0,
      title: title || "Untitled Meme",
      image_url: image_url || "https://en.meming.world/images/en/8/81/Stonks.jpg",
      caption: caption || "No caption",
      tags: Array.isArray(tags) ? tags : ["stonks"],
    };
    const { data, error } = await supabase.from("memes").insert([newMeme]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

/**
 * @description   upvotes a meme and emit if its on leaderboard
 * @param   id - meme ID to upvote
 */
router.put("/:id/upvote", async (req, res) => {
    const { id } = req.params;
    const { data: meme, error: fetchError } = await supabase
      .from("memes")
      .select("votes")
      .eq("id", id)
      .single();
  
    if (fetchError) return res.status(404).json({ message: "Meme not found" });
  
    const newUpvotes = meme.upvotes + 1;
    const { data, error } = await supabase
      .from("memes")
      .update({ upvotes: newUpvotes })
      .eq("id", id)
      .select()
      .single();
  
    if (error) return res.status(500).json({ error: error.message });
  
    const { data: leaderboard, error: lbError } = await supabase
      .from("memes")
      .select("*")
      .order("votes", { ascending: false })
      .limit(10);
  
    if (!lbError && leaderboard.some((m) => m.id === id) && io) {
      io.emit("leaderboard-update", leaderboard);
    }
  
    res.json(data);
});

export default router;
