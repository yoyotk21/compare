import { ComparisonPayload, ComparisonResponse } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function submitComparison(payload: ComparisonPayload): Promise<ComparisonResponse> {
  const response = await fetch(`${API_BASE}/api/compare/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to compare responses");
  }

  return response.json();
}
