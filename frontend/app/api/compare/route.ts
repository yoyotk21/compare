import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("compare POST using API_BASE", API_BASE);
  const response = await fetch(`${API_BASE}/api/compare/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
