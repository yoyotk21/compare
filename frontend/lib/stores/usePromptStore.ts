import { create } from "zustand";
import { ComparisonResponse } from "@/lib/types";

interface PromptState {
  promptText: string;
  setPromptText: (text: string) => void;
  result: ComparisonResponse | null;
  setResult: (result: ComparisonResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (message: string | null) => void;
  reset: () => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  promptText: "",
  setPromptText: (text) => set({ promptText: text }),
  result: null,
  setResult: (result) => set({ result }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
  reset: () => set({ promptText: "", result: null, isLoading: false, error: null }),
}));
