export interface ComparisonPayload {
  text: string;
}

export interface LLMResponse {
  identifier: string;
  response_summary: string;
  response_text: string;
}

export interface Cluster {
  summary: string;
  responses: LLMResponse[];
}

export interface ComparisonResponse {
  clusters: Cluster[];
}
