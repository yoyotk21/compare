"use client";

import clsx from "clsx";

interface WordCounterProps {
  current: number;
  max: number;
}

export default function WordCounter({ current, max }: WordCounterProps) {
  const remaining = max - current;
  const nearingLimit = current > max * 0.8;
  const exceeded = current > max;

  return (
    <div
      className={clsx(
        "text-sm font-medium",
        exceeded ? "text-red-400" : nearingLimit ? "text-accent" : "text-ink-muted"
      )}
    >
      {exceeded ? `${Math.abs(remaining)} words over limit` : `${remaining} words remaining`}
    </div>
  );
}
