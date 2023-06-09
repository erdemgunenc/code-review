import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv("PORT"), 10);
export const DBURL: string = checkEnv("DBURL");
export const CORS_ORIGINS = ["http://localhost:3000"];

export const RATE_LIMIT_WINDOW_MS = 1 * 60 * 1000; // 1 minutes
export const RATE_LIMIT_MAX_REQUESTS = 10;