import { ComparisonPayload, ComparisonResponse } from "@/lib/types";

export async function submitComparison(payload: ComparisonPayload): Promise<ComparisonResponse> {
  const response = await fetch("/api/compare", {
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

export async function fetchResults(publicId: string): Promise<ComparisonResponse> {
  const response = await fetch(`/api/results/${publicId}`);

  if (!response.ok) {
    throw new Error("Comparison not found");
  }

  return response.json();
}
