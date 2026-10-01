export type Subject =
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "general";

export type QuestionMode =
  | "photo"
  | "text"
  | "math"
  | "science";

export interface SolveRequest {
  question: string;
  subject?: Subject;
  mode?: QuestionMode;
  language?: "en" | "bn";
}

export interface SolveResponse {
  answer: string;
  steps?: string[];
  subject?: Subject;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  createdAt: string;
}
