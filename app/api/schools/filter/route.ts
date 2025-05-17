import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  try {
    const token = await getToken({ 
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Received filter request body:', body);

    const response = await fetch(
      "https://schoolnet-be.onrender.com/api/v1/schools/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log('Backend response:', data);

    if (!response.ok) {
      console.error('Backend error:', data);
      return NextResponse.json(
        { error: data.message || "Failed to fetch filtered schools" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in filter schools:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
} 