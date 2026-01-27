import ResultsClient from "@/components/response/results-client";

export default function ResultsPage({ params }: { params: { publicId: string } }) {
  return <ResultsClient publicId={params.publicId} />;
}
