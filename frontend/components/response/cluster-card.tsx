import { Cluster } from "@/lib/types";
import ResponseCard from "@/components/response/response-card";

interface ClusterCardProps {
  cluster: Cluster;
  index: number;
}

export default function ClusterCard({ cluster, index }: ClusterCardProps) {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-card">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-xs uppercase tracking-[0.4em] text-ink-muted">Cluster {index + 1}</span>
        <h3 className="text-2xl font-display text-ink">{cluster.summary}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cluster.responses.map((response) => (
          <ResponseCard key={response.identifier} response={response} />
        ))}
      </div>
    </section>
  );
}
