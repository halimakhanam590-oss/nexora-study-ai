"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Calculator,
  BookOpen,
  Atom,
  PenLine,
  Brain,
  Target,
} from "lucide-react";

const tools = [
  { name: "Math", icon: Calculator },
  { name: "Science", icon: Atom },
  { name: "AI Tutor", icon: Brain },
  { name: "Writing", icon: PenLine },
  { name: "Reading", icon: BookOpen },
  { name: "Focus", icon: Target },
];

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleImage = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const solveQuestion = async () => {
    if (!question.trim() && !image) {
      alert("Please enter a question or upload a photo.");
      return;
    }

    setLoading(true);
    setAnswer("");

    // AI API will be connected in the next step.
    setTimeout(() => {
      setAnswer(
        "Your AI solution will appear here. The AI backend will be connected next."
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Nexora <span className="text-blue-600">Study AI</span>
          </h1>
          <p className="text-sm text-gray-500">
            Your AI-powered study companion
          </p>
        </div>

        <button className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Sign in
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
          <Sparkles size={28} />
        </div>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn smarter with AI
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          Ask questions, solve math and science problems, and learn
          step-by-step with your personal AI tutor.
        </p>
      </section>

      {/* Solver */}
      <section className="mx-auto max-w-3xl px-5">
        <div className="rounded-3xl border bg-white p-4 shadow-xl sm:p-6">
          {image && (
            <div className="relative mb-4 overflow-hidden rounded-2xl border">
              <img
                src={image}
                alt="Question preview"
                className="max-h-64 w-full object-contain"
              />

              <button
                onClick={() => setImage(null)}
                className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
              >
                Remove
              </button>
            </div>
          )}

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="min-h-32 w-full resize-none border-0 bg-transparent text-lg outline-none placeholder:text-gray-400"
          />

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Camera */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 text-sm font-medium hover:bg-gray-100"
            >
              <Camera size={18} />
              Camera
            </button>

            {/* Gallery */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 text-sm font-medium hover:bg-gray-100"
            >
              <ImageIcon size={18} />
              Gallery
            </button>

            {/* Voice */}
            <button
              className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 text-sm font-medium hover:bg-gray-100"
              onClick={() =>
                alert("Voice question will be connected next.")
              }
            >
              <Mic size={18} />
              Voice
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleImage(e.target.files?.[0])}
            />

            <button
              onClick={solveQuestion}
              disabled={loading}
              className="ml-auto flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Sparkles size={18} />
              {loading ? "Solving..." : "Solve"}
            </button>
          </div>
        </div>

        {/* Support badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-white px-3 py-2 shadow-sm">
            ✓ Handwritten questions
          </span>
          <span className="rounded-full bg-white px-3 py-2 shadow-sm">
            ✓ Math & Science
          </span>
          <span className="rounded-full bg-white px-3 py-2 shadow-sm">
            ✓ Bangla supported
          </span>
          <span className="rounded-full bg-white px-3 py-2 shadow-sm">
            ✓ Step-by-step
          </span>
        </div>

        {/* Answer */}
        {answer && (
          <div className="mt-6 rounded-3xl border bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-blue-600" size={20} />
              <h3 className="font-bold">AI Solution</h3>
            </div>

            <p className="whitespace-pre-wrap leading-7 text-gray-700">
              {answer}
            </p>
          </div>
        )}
      </section>

      {/* Quick Tools */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <h3 className="mb-5 text-xl font-bold">Quick Tools</h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.name}
                className="rounded-2xl border bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

                <span className="text-sm font-semibold">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-6 text-center text-sm text-gray-400">
        © 2026 Nexora Study AI
      </footer>
    </main>
  );
    }
