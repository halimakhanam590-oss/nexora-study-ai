"use client";

import { useState } from "react";

export default function SolverBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSolve() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to solve");
      }

      setAnswer(data.answer || "No answer received.");
    } catch (error) {
      setAnswer(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="w-full min-h-40 rounded-2xl border p-4 outline-none"
      />

      <button
        onClick={handleSolve}
        disabled={loading || !question.trim()}
        className="w-full rounded-2xl px-5 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Solving..." : "Solve Question"}
      </button>

      {answer && (
        <div className="rounded-2xl border p-5 whitespace-pre-wrap">
          <h2 className="font-bold mb-2">Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
