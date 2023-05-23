import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_MESSAGE } from '../src/constants';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from '../src/config';

// Create a limiter with desired options
const limiter: RequestHandler = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS, // Maximum number of requests per windowMs
  message: RATE_LIMIT_MESSAGE,
});

export default limiter;
