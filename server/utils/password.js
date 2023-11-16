import Bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(password, salt);
  return hashedPassword;
}
export async function comparePassword(password, hashedPassword) {
  return await Bcrypt.compare(password, hashedPassword);
}
