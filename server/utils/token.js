import jwt from "jsonwebtoken";

const { env } = process;

export const createJWT = (payload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
