import { COOKIE_NAME } from "@/app/constants";
import { HttpStatusCode } from "axios";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  const { value } = token;

  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);

    const responseBody = {
      user: "Authenticated",
    };

    return new Response(JSON.stringify(responseBody), {
      status: HttpStatusCode.Ok,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
