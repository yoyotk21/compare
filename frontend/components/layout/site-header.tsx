"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button";
import { usePromptStore } from "@/lib/stores/usePromptStore";

export default function SiteHeader() {
  const pathname = usePathname();
  const onResultsPage = pathname?.startsWith("/results");
  const resetStore = usePromptStore((state) => state.reset);

  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
      <Link href="/" className="text-lg font-display font-semibold uppercase tracking-widest text-accent">
        compare_llm
      </Link>
      {onResultsPage && (
        <Button asChild variant="ghost">
          <Link href="/" onClick={() => resetStore()}>
            New prompt
          </Link>
        </Button>
      )}
    </header>
  );
}
