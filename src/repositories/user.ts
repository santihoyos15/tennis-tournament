import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const createUser = async (userDto: User) => {
  try {
    if (userDto.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: userDto.email },
      });

      if (existingEmail) {
        throw new Error("Email is already used");
      }
    }

    if (userDto.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username: userDto.username },
      });

      if (existingUsername) {
        throw new Error("username is already used");
      }
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userDto.email,
        username: userDto.username,
        // TODO Probably shouldn't disclose this
        password: hashedPassword,
      },
    });

    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
