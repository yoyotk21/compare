"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ClusterCard from "@/components/response/cluster-card";
import { usePromptStore } from "@/lib/stores/usePromptStore";
import Button from "@/components/ui/button";
import LoadingSkeleton from "@/components/response/loading-skeleton";

export default function ResultsClient() {
  const router = useRouter();
  const { result, promptText, isLoading, error, reset } = usePromptStore((state) => ({
    result: state.result,
    promptText: state.promptText,
    isLoading: state.isLoading,
    error: state.error,
    reset: state.reset,
  }));

  useEffect(() => {
    if (!result && !isLoading && !error) {
      const timeout = setTimeout(() => router.replace("/"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [result, isLoading, error, router]);

  const handleBackHome = () => {
    reset();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Running compare</p>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
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

  if (!result) {
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

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Clusters</p>
        <h1 className="text-4xl font-display text-ink">How the models split on your idea</h1>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-ink-muted">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Original prompt</p>
          <p className="mt-2 whitespace-pre-line text-base text-ink">{promptText}</p>
        </div>
      </div>

      <div className="space-y-8">
        {result.clusters.map((cluster, index) => (
          <ClusterCard key={`${cluster.summary}-${index}`} cluster={cluster} index={index} />
        ))}
      </div>
    </section>
  );
}
