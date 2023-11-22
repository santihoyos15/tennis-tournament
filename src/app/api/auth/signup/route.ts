import { createUser } from "@/repositories/user";
import { User } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import z, { IssueData } from "zod";

const userSchemaValidator = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
  })
  .strict();

const validateUserSchema = (user: User) => {
  try {
    const validatedUser = userSchemaValidator.parse(user) as User;
    return validatedUser;
  } catch (error: any) {
    if (!error?.issues?.length) {
      throw new Error("Invalid schema");
    }

    const validationError = error.issues.map((issue: IssueData) => ({
      path: issue.path?.join("."),
      message: issue.message,
    }));

    throw new Error(JSON.stringify(validationError, null, 2));
  }
};

export const POST = async (request: Request) => {
  try {
    const json = await request.json();

    const userDto = validateUserSchema(json);

    const newUser = await createUser(userDto);

    return new NextResponse(JSON.stringify(newUser), {
      status: HttpStatusCode.Ok,
    });
  } catch (error: any) {
    let errorMessage;
    try {
      errorMessage = JSON.parse(error.mesage);
    } catch (parseError: any) {
      errorMessage = error.mesage;
    }

    return new NextResponse(error.mesage, {
      status: HttpStatusCode.InternalServerError,
    });
  }
};
