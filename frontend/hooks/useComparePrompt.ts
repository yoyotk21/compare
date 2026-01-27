"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { submitComparison } from "@/lib/api";
import { usePromptStore } from "@/lib/stores/usePromptStore";

export function useComparePrompt() {
  const setResult = usePromptStore((state) => state.setResult);
  const router = useRouter();

  return useMutation({
    mutationFn: submitComparison,
    onSuccess: (data) => {
      setResult(data);
      router.push("/results");
    },
  });
}
