import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "./user";
import { MAX_AGE } from "@/app/constants";

const secret = process.env.JWT_SECRET || "";

export const generateToken = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || (await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: MAX_AGE,
    });

    await prisma.authToken.create({
      data: {
        token,
        userId: user.id,
      },
    });

    return token;
  } catch (error: any) {
    throw new Error(error.mesage);
  }
};

export const validateToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new Error(err.message);
      }

      return decoded;
    });

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.mesage);
  }
};
