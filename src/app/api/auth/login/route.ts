import { COOKIE_NAME, MAX_AGE } from "@/app/constants";
import { HttpStatusCode } from "axios";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const { username, password } = body;

  if (username != "admin" || password != "admin") {
    return NextResponse.json(
      { mesage: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  const secret = process.env.JWT_SECRET || "";

  const token = sign({ username }, secret, { expiresIn: MAX_AGE });

  const serializedCookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = { message: "Authenticated!" };

  return new Response(JSON.stringify(response), {
    status: HttpStatusCode.Ok,
    headers: { "Set-cookie": serializedCookie },
  });
};
