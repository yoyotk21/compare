import PromptForm from "@/components/prompt/prompt-form";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Compare</p>
        <h1 className="text-4xl font-display font-semibold leading-tight text-ink">
          Watch how different LLMs riff on the exact same idea.
        </h1>
        <p className="max-w-2xl text-base text-ink-muted">
          Drop in your prompt and we’ll run it through a curated stack of top-tier models, summarize their
          takes, and group them into clusters you can skim quickly. You’ll see the quirks and strengths of
          each model side-by-side.
        </p>
      </div>

      <PromptForm />

      <p className="text-xs text-ink-muted">
        Curious which models we’re using? Peek at the stack in the backend config or send us a note at
        <Link className="ml-1 text-accent hover:underline" href="mailto:hello@compare.app">
          hello@compare.app
        </Link>
        .
      </p>
    </section>
  );
}
