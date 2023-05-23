import express from "express";
import { Simulator } from "../models/Simulator";
import cors from "cors";
import Joi from "joi";
import logger from "../../services/logger";

const app = express();
app.use(cors());

export const router = express.Router();

const simulatorSchema = Joi.object({
  dateRecorded: Joi.date().required(),
  cryptocurrency: Joi.string().required(),
  euros: Joi.number().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const validateSimulatorData = (req, res, next) => {
  const { error } = simulatorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
router.get("/api/simulator", async (req, res) => {
    const simulator = await Simulator.find().lean();
    res.status(200).json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
    const { profile_id } = req.params;
    const simulators = await Simulator.find({ profile_id });
    res.status(200).json(simulators);
});

router.post("/api/simulator/:profile_id", validateSimulatorData, async (req, res) => {
    const { profile_id } = req.params;
    const newData = {
      ...req.body,
      profile_id,
    };
    logger.info(newData);
    const simulator = await Simulator.create(newData);
    res.status(201).json(simulator);
});
