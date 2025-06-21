import express from "express";
import supabase from "../utils/supabase.js";

const router = express.Router();
/**
 * @description    Create a user
 * @body           { name, credits, profile_photo }
 */
router.post("/", async (req, res) => {
    const { name, picture } = req.body;
    const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("username", name)
    .single();
    if (existingUser) {
        return res.status(200).json({ message: "User already exists", user: existingUser });
    }
    const user = {
      username: name,
      credits: 10000,
      profile_photo: picture || "https://en.meming.world/images/en/8/81/Stonks.jpg",
    };
    const { data, error } = await supabase.from("users").insert([user]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});


export default router;

