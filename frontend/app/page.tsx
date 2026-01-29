import PromptForm from "@/components/prompt/prompt-form";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-semibold leading-tight text-ink">
          See what the models really think.
        </h1>
        <p className="max-w-2xl text-base text-ink-muted">
          Drop in your prompt and we’ll run it through a curated stack of top-tier models, summarize their
          takes, and group them into clusters you can skim quickly. You’ll see the quirks and strengths of
          each model side-by-side.
        </p>
      </div>

      <PromptForm />
    </section>
  );
}
