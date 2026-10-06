import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/exciptions/error.exciptions.js";
import {
  generateNewAccessToken,
  generateToken,
} from "../../common/service/token.service.js";
import { env } from "../../config/env.service.js";
import { userModel } from "../../database/model/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (body) => {
  let { userName, email, password } = body;

  let exits = await userModel.findOne({ email });
  if (!exits) {
    let hashPassword = await bcrypt.hash(password, Number(env.salt));
    let data = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });
    if (hashPassword) {
      return { message: "User created successfully", data };
    }
  } else {
    return ConflictException({ message: "User already exists" });
  }
};

export const Login = async (body) => {
  let { email, password } = body;
  let data = await userModel.findOne({ email });
  if (!data) {
    return NotFoundException({ message: "User not found" });
  }
  let isMatch = await bcrypt.compare(password, data.password);
  if (isMatch) {
    let { accessToken, refreshToken } = await generateToken(data);
    return {
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    };
  } else {
    return UnauthorizedException({ message: "Invalid password" });
  }
};

export const getById = async (id) => {
  let data = await userModel.findById(id);
  if (data) {
    return { message: "User found", data };
  }
  return NotFoundException({ message: "User not found" });
};

export const generateAccessToken = async (body) => {
  let { refreshToken } = body;

  let accessToken = await generateNewAccessToken(refreshToken);
  if (accessToken) {
    return { message: "Access token generated successfully", accessToken };
  }
  return UnauthorizedException({ message: "Invalid refresh token" });
};
