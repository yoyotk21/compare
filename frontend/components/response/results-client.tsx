"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import ClusterCard from "@/components/response/cluster-card";
import LoadingSkeleton from "@/components/response/loading-skeleton";
import Button from "@/components/ui/button";
import { fetchResults } from "@/lib/api";
import { usePromptStore } from "@/lib/stores/usePromptStore";
import { ComparisonResponse } from "@/lib/types";

interface ResultsClientProps {
  publicId: string;
}

export default function ResultsClient({ publicId }: ResultsClientProps) {
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState("");
  const { result, promptText, isLoading, error, reset, setResult, setError, setIsLoading } =
    usePromptStore((state) => ({
      result: state.result,
      promptText: state.promptText,
      isLoading: state.isLoading,
      error: state.error,
      reset: state.reset,
      setResult: state.setResult,
      setError: state.setError,
      setIsLoading: state.setIsLoading,
    }));

  const hasStoreResult = result && result.public_id === publicId;

  const { data, error: fetchError, isFetching } = useQuery<ComparisonResponse, Error>({
    queryKey: ["results", publicId],
    queryFn: () => fetchResults(publicId),
    enabled: !hasStoreResult,
    staleTime: 60_000,
    retry: 1,
  });

  useEffect(() => {
    if (hasStoreResult) return;
    if (data) {
      setResult(data);
      setIsLoading(false);
      setError(null);
    }
  }, [data, hasStoreResult, setResult, setIsLoading, setError]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
    }
  }, [fetchError, setError, setIsLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(window.location.href);
  }, [publicId]);

  const activeResult = hasStoreResult ? result : data;

  const handleBackHome = () => {
    reset();
    router.push("/");
  };

  if ((isLoading && !activeResult) || (isFetching && !activeResult)) {
    return (
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Gathering responses</p>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error && !activeResult) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-display text-ink">We hit a snag</h1>
        <p className="text-ink-muted">{error}</p>
        <Button onClick={handleBackHome} className="w-full sm:w-auto">
          Try another prompt
        </Button>
      </section>
    );
  }

  if (!activeResult) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-display text-ink">No clusters yet</h1>
        <p className="text-ink-muted">
          Head back, drop in your prompt, and we’ll fan it out across the model stack for you.
        </p>
        <Button onClick={handleBackHome} className="w-full sm:w-auto">
          Return to prompt
        </Button>
      </section>
    );
  }

  const { clusters } = activeResult;
  const displayedPrompt = activeResult?.input_question || promptText;

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Clusters</p>
        <h1 className="text-4xl font-display text-ink">How the models split on your idea</h1>
        {displayedPrompt && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-ink-muted">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Original prompt</p>
            <p className="mt-2 whitespace-pre-line text-base text-ink">{displayedPrompt}</p>
          </div>
        )}
        {shareUrl && (
          <p className="text-sm text-ink-muted">
            Shareable link: <span className="text-ink">{shareUrl}</span>
          </p>
        )}
      </div>

      <div className="space-y-8">
        {clusters.map((cluster, index) => (
          <ClusterCard key={`${cluster.summary}-${index}`} cluster={cluster} index={index} />
        ))}
      </div>
    </section>
  );
}
