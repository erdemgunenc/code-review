import express from "express";
import { PORT, DBURL, CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import rateLimiter from "../middleware/rateLimitter";
import  errorHandler  from '../middleware/errorHandler';
import { loggerMiddleware } from "../middleware/loggerMiddleware";


mongoose
    .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
    });

const app = express();
app.use(loggerMiddleware);
app.use(rateLimiter);
app.use(errorHandler);
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

app.listen(PORT, () =>
    console.log(`✅  Ready on port http://localhost:${PORT}`)
);
export default app;
