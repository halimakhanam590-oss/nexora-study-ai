import { NextRequest, NextResponse } from "next/server";
import { solveQuestion } from "@/lib/ai";
import type { SolveRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SolveRequest;

    if (!body.question || body.question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const result = await solveQuestion(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Solve API error:", error);

    return NextResponse.json(
      { error: "Failed to solve the question." },
      { status: 500 }
    );
  }
}
