import Bcrypt from "bcryptjs";

export default async function hashPassword(password) {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(password, salt);
  return hashedPassword;
}
