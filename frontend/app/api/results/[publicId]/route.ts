import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: { publicId: string } }
) {
  const response = await fetch(`${API_BASE}/api/results/${params.publicId}`, {
    method: "GET",
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
