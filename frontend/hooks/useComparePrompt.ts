"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { submitComparison } from "@/lib/api";
import { usePromptStore } from "@/lib/stores/usePromptStore";

export function useComparePrompt() {
  const { setResult, setIsLoading, setError } = usePromptStore((state) => ({
    setResult: state.setResult,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
  }));
  const router = useRouter();

  return useMutation({
    mutationFn: submitComparison,
    onMutate: () => {
      setError(null);
      setIsLoading(true);
      setResult(null);
    },
    onSuccess: (data) => {
      setResult(data);
      setIsLoading(false);
      router.push(`/results/${data.public_id}`);
    },
    onError: (error) => {
      setIsLoading(false);
      setError(error instanceof Error ? error.message : "Something went wrong. Try again.");
    },
  });
}
