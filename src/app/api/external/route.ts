import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
