"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/textarea";
import WordCounter from "@/components/ui/word-counter";
import Skeleton from "@/components/ui/skeleton";
import { usePromptStore } from "@/lib/stores/usePromptStore";
import { countWords } from "@/lib/utils/words";
import { useComparePrompt } from "@/hooks/useComparePrompt";

const WORD_LIMIT = 500;

export default function PromptForm() {
  const { promptText, setPromptText } = usePromptStore((state) => ({
    promptText: state.promptText,
    setPromptText: state.setPromptText,
  }));
  const [localError, setLocalError] = useState<string | null>(null);
  const { mutate, isPending, isError } = useComparePrompt();

  const wordCount = useMemo(() => countWords(promptText), [promptText]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (wordCount === 0) {
      setLocalError("Please describe what you want the LLMs to respond to.");
      return;
    }

    if (wordCount > WORD_LIMIT) {
      setLocalError("Your prompt is over the 500-word limit.");
      return;
    }

    mutate({ text: promptText });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <TextArea
          rows={10}
          value={promptText}
          onChange={(event) => setPromptText(event.target.value)}
          placeholder="Example: What’s the healthiest grab-and-go breakfast I can make in 10 minutes?"
        />
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>We’ll keep your prompt under wraps and only use it for this run.</span>
          <WordCounter current={wordCount} max={WORD_LIMIT} />
        </div>
      </div>

      {localError && <p className="text-sm text-red-400">{localError}</p>}
      {isError && !localError && (
        <p className="text-sm text-red-400">We’re spinning up the models. Hang tight.</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <Button type="submit" className="w-full sm:w-auto" isLoading={isPending}>
            Run across models
          </Button>
          <p className="text-xs text-ink-muted">Takes up to a minute.</p>
        </div>
        {isPending && (
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        )}
      </div>
    </form>
  );
}
