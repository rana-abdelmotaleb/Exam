import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";

export const generateToken = async (data) => {
  let accessToken = await jwt.sign({ id: data._id }, env.accessSign, {
    expiresIn: "30min",
  });
  let refreshToken = await jwt.sign({ id: data._id }, env.refreshSign, {
    expiresIn: "1y",
  });
  console.log({ accessToken, refreshToken });
  return { accessToken, refreshToken };
};
export const generateNewAccessToken = async (refreshToken) => {
  let deCodedRefresh = await jwt.verify(refreshToken, env.refreshSign);
  let accessToken = await jwt.sign({ id: deCodedRefresh._id }, env.accessSign, {
    expiresIn: "30min",
  });

  console.log(accessToken);
  return accessToken;
};
