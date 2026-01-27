"use client";

import { useState } from "react";
import clsx from "clsx";
import { LLMResponse } from "@/lib/types";
import Button from "@/components/ui/button";
import CopyButton from "@/components/ui/copy-button";

interface ResponseCardProps {
  response: LLMResponse;
}

export default function ResponseCard({ response }: ResponseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs uppercase tracking-widest text-accent">{response.identifier}</span>
        <div className="flex items-center gap-2">
          <CopyButton text={response.response_text} />
          <Button
            type="button"
            variant="ghost"
            className="text-xs text-ink"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Hide full" : "Read full"}
          </Button>
        </div>
      </div>
      <p className="text-base text-ink font-semibold">{response.response_summary}</p>
      <div
        className={clsx(
          "mt-3 text-sm leading-relaxed text-ink-muted transition-[max-height] duration-500 ease-out",
          expanded ? "max-h-80 overflow-y-auto pr-1" : "max-h-0 overflow-hidden"
        )}
      >
        <pre className="whitespace-pre-wrap font-body text-sm text-ink/90">{response.response_text}</pre>
      </div>
    </article>
  );
}
