import { create } from "zustand";
import { ComparisonResponse } from "@/lib/types";

interface PromptState {
  promptText: string;
  setPromptText: (text: string) => void;
  result: ComparisonResponse | null;
  setResult: (result: ComparisonResponse) => void;
  reset: () => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  promptText: "",
  setPromptText: (text) => set({ promptText: text }),
  result: null,
  setResult: (result) => set({ result }),
  reset: () => set({ promptText: "", result: null }),
}));
