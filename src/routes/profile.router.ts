import express from "express";
import { Profile } from "../models/Profile";
import logger from "../../services/logger";

export var router = express.Router();

router.get("/api/profile", async (req, res) => {
    const profiles = await Profile.find().lean();
    logger.info(profiles);
    res.status(200).json({ profiles });
});

router.post("/api/profile", async (req, res) => {
    const { email, name, nickname } = req.body;
    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }],
    }).exec();

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }
    res.status(200).json(profile);
});
