import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const port = process.env.PORT;
const salt = process.env.SALT_ROUNDS;
const databaseUri = process.env.DATABASE_URI;
const accessSign = process.env.ACCESS_SIGN;
const refreshSign = process.env.REFRESH_SIGN;

export const env = {
  port,
  salt,
  databaseUri,
  accessSign,
  refreshSign,
};
