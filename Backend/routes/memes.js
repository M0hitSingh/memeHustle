import express from "express";
import supabase from "../utils/supabase.js";
import { getSocketInstance } from "../socket.js";
import generateFunnyCaption from "../utils/gemini.js";

const router = express.Router();
/**
 * @description    Get all memes
 */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Step 1: Fetch memes with pagination
    const { data: memes, error: memesError } = await supabase
      .from("memes")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (memesError) throw memesError;

    // Step 2: For each meme, find the highest bid with user info
    const memeIds = memes.map(m => m.id);

    const { data: bids, error: bidsError } = await supabase
      .from("bids")
      .select("meme_id, credits, user:users(username)")
      .in("meme_id", memeIds);

    if (bidsError) throw bidsError;

    // Step 3: Map highest bid per meme
    const highestBidsMap = {};
    for (const bid of bids) {
      if (
        !highestBidsMap[bid.meme_id] ||
        bid.credits > highestBidsMap[bid.meme_id].credits
      ) {
        highestBidsMap[bid.meme_id] = {
          credits: bid.credits,
          username: bid.user?.username || "Unknown",
        };
      }
    }

    // Step 4: Merge bids into memes
    const enrichedMemes = memes.map((meme) => ({
      ...meme,
      highest_bid: highestBidsMap[meme.id]?.credits || 0,
      highest_bid_user: highestBidsMap[meme.id]?.username || null,
    }));

    res.json(enrichedMemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @description    Get top memes sorted by votes
 * @query          top - number of top memes to return (default: 10)
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
 * @body           { title, image_url, caption, tags }
 */
router.post("/", async (req, res) => {
    const { title, image_url, tags, user_id } = req.body;
    const newMeme = {
      votes: 0,
      title: title || "Untitled Meme",
      image_url: image_url || "https://en.meming.world/images/en/8/81/Stonks.jpg",
      caption: await generateFunnyCaption(tags? tags: ["stonks"]),
      tags: Array.isArray(tags) ? tags : ["stonks"],
      created_by: user_id
    };
    console.log(newMeme)
    const { data, error } = await supabase.from("memes").insert([newMeme]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

/**
 * @description   Vote on a meme (up or down)
 * @body          { type: "up" | "down" }
 */
router.post("/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!["up", "down"].includes(type)) {
    return res.status(400).json({ message: "Invalid vote type" });
  }

  const { data: meme, error: fetchError } = await supabase
    .from("memes")
    .select("votes")
    .eq("id", id)
    .single();

  if (fetchError || !meme)
    return res.status(404).json({ message: "Meme not found" });

  const updatedVotes = meme.votes + (type === "up" ? 1 : -1);

  const { data, error } = await supabase
    .from("memes")
    .update({ votes: updatedVotes })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // Broadcast leaderboard if this meme is now in top 10
  
  const { data: leaderboard, error: lbError } = await supabase
    .from("memes")
    .select("*")
    .order("votes", { ascending: false })
    .limit(10);
  if (!lbError && leaderboard.some((m) => m.id == id)) {
    let io = getSocketInstance();
    io.emit("leaderboard-update", leaderboard);
  }

  res.json(data);
});

const bidMessages = [];
router.post("/:id/bid", async (req, res) => {
  const { id: meme_id } = req.params;
  const { credits, user_id, title } = req.body;
  const io = getSocketInstance();

  try {
    // Fetch highest current bid
    const { data: highestBids, error: fetchError } = await supabase
      .from("bids")
      .select("credits")
      .eq("meme_id", meme_id)
      .order("credits", { ascending: false })
      .limit(1);

    const currentHighest = highestBids?.[0]?.credits || 0;
    console.log(currentHighest)
    if (credits <= currentHighest) {
      return res.status(400).json({ message: "Bid must be higher than current bid." });
    }

    // Fetch user to check credits
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("credits, username")
      .eq("id", user_id)
      .single();

    if (userError) throw new Error("User not found");

    if (userData.credits < credits) {
      return res.status(400).json({ message: "Not enough credits." });
    }
    // Insert the new bid
    const { data: bidData, error: bidError } = await supabase
      .from("bids")
      .insert({ meme_id, user_id, credits })
      .select("*")
      .single();
    console.log(bidError)
    if (bidError) throw new Error("Could not place bid");
    
    // Deduct credits from user
    const { error: updateError } = await supabase
      .from("users")
      .update({ credits: userData.credits - credits })
      .eq("id", user_id);

    if (updateError) throw new Error("Failed to update user credits");


    // Emit socket event
    io.emit("bid-news", {
      message: `${userData.username || "A user"} bid ${credits} credits on ${title}`,
      meme_id,
      credits,
      username: userData.username
    });

    res.status(201).json(bidData);
  } catch (error) {
    console.error("Bid error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
