export type SolveRequest = {
  question: string;
  image?: string | null;
};

export type SolveResponse = {
  answer: string;
};

export async function solveWithAI(
  request: SolveRequest
): Promise<SolveResponse> {
  const response = await fetch("/api/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  return response.json();
}
