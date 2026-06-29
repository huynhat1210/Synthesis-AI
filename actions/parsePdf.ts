"use server";
/**
 * @file actions/parsePdf.ts
 * @description Server Action to receive uploaded PDF files, extract plain text,
 *              and use Gemini to parse target details.
 */

// Polyfill DOMMatrix for Node.js environments to prevent pdf-parse module evaluation crash
if (typeof global !== "undefined" && !("DOMMatrix" in global)) {
  (global as any).DOMMatrix = class DummyDOMMatrix {
    static fromMatrix() { return new DummyDOMMatrix(); }
  };
}

import { auth } from "@clerk/nextjs/server";
import { parseJdWithGemini } from "@/lib/gemini";
import type { ApiResponse } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");

interface ParsedJdResult {
  targetAudience: string;
  pitchGoal: string;
}

export async function parsePdfAction(
  formData: FormData
): Promise<ApiResponse<ParsedJdResult>> {
  // 1. Enforce authentication
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in again." };
  }

  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { data: null, error: "No file was uploaded." };
    }

    // 2. Read file to ArrayBuffer, convert to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Parse PDF to text
    const parsedData = await pdf(buffer);
    const textContent = parsedData.text;

    if (!textContent || !textContent.trim()) {
      return { data: null, error: "Failed to extract text from the PDF. It may be empty or scanned." };
    }

    // 4. Use Gemini to structure target audience and goals
    const extractedData = await parseJdWithGemini(textContent.trim().slice(0, 8000)); // Limit to first 8000 chars

    return {
      data: extractedData,
      error: null,
    };
  } catch (err: unknown) {
    console.error("[parsePdfAction] Error processing PDF:", err);
    const message = err instanceof Error ? err.message : "Failed to process PDF file.";
    return {
      data: null,
      error: message,
    };
  }
}
