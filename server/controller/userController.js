import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import userModels from "../model/userModels.js";

export const getUser = async (req, res) => {
  const user = await userModels.findById(req.params.id);
  if (!user) throw new NotFoundError(`no user found`);

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const User = await userModels.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ User });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userModels.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "User deleted" });
};
