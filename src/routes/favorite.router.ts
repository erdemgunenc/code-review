import express from "express";
import { Favorite } from "../models/Favorite";
import logger from "../../services/logger";

export const router = express.Router();

router.get("/api/favorite", async (req, res) => {
    const favorite = await Favorite.find().lean();
    logger.info(favorite);
    res.status(200).json({ favorite });
});

router.get("/api/favorite/:profile_id", async (req, res) => {
    const { profile_id } = req.params;
    const data = await Favorite.find({ profile_id });
    res.status(200).json(data);
});
