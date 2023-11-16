import { StatusCodes } from "http-status-codes";

import userModels from "../model/userModels.js";
import hashPassword from "../utils/password.js";
import { NotFoundError } from "../errors/customErrors.js";

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
  if (!email || !password) throw new NotFoundError(`invalid input`);

  // const newUser = await userModels.create(req.body);

  res.status(StatusCodes.OK).json({ email, password });
};

export const logout = async (req, res) => {
  const newUser = await userModels.create(req.body);

  res.status(StatusCodes.CREATED).json({ newUser });
};
