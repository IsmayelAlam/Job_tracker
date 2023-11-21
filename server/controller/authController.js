import { StatusCodes } from "http-status-codes";

import userModels from "../model/userModels.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/token.js";

export const register = async (req, res) => {
  const isFirstAccount = (await userModels.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await userModels.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new NotFoundError(`invalid email or password`);

  const user = await userModels.findOne({ email: email });
  if (!user) throw new NotFoundError(`invalid credentials`);

  const isValidUser = await comparePassword(password, user.password);
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id });

  const oneDay = 1000 * 60 * 60 * 24; // 01 day

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ token, user });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
