import { StatusCodes } from "http-status-codes";

import userModels from "../model/userModels.js";

export const register = async (req, res) => {
  const newUser = await userModels.create(req.body);

  res.status(StatusCodes.CREATED).json({ newUser });
};
export const login = async (req, res) => {
  const newUser = await userModels.create(req.body);

  res.status(StatusCodes.CREATED).json({ newUser });
};
export const logout = async (req, res) => {
  const newUser = await userModels.create(req.body);

  res.status(StatusCodes.CREATED).json({ newUser });
};
