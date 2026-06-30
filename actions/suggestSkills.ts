"use server";
/**
 * @file actions/suggestSkills.ts
 * @description Server Action: uses Gemini AI to analyze a job description /
 *              target audience text and suggest relevant skills that are
 *              missing from the user's current profile.
 */

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import type { ApiResponse } from "@/types";

/**
 * Analyzes the target audience / JD text and returns up to 8 skill suggestions
 * that are NOT already in the user's profile.
 */
export async function suggestSkillsAction(
  jdText: string,
  existingSkills: string[],
  lang: "en" | "vi" = "vi"
): Promise<ApiResponse<string[]>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized." };
  }

  if (!jdText?.trim() || jdText.trim().length < 20) {
    return {
      data: null,
      error: lang === "vi"
        ? "Vui lòng nhập mô tả khách hàng/JD ít nhất 20 ký tự."
        : "Please enter at least 20 characters of job description.",
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // ── Sandbox fallback when no API key ────────────────────────────────────────
  if (!apiKey) {
    const mockSuggestions = [
      "Project Management", "Agile", "Communication", "Problem Solving",
      "Data Analysis", "Team Leadership", "Strategic Planning", "Client Relations",
    ].filter((s) => !existingSkills.map((e) => e.toLowerCase()).includes(s.toLowerCase()));
    return { data: mockSuggestions.slice(0, 6), error: null };
  }

  try {
    const client = new GoogleGenAI({ apiKey });

    const existingList = existingSkills.length > 0
      ? `Current skills (DO NOT suggest these again): ${existingSkills.join(", ")}`
      : "The user has no skills listed yet.";

    const prompt = lang === "vi"
      ? `Bạn là chuyên gia tuyển dụng. Phân tích mô tả công việc/khách hàng dưới đây và gợi ý tối đa 8 kỹ năng quan trọng nhất mà ứng viên cần có.

${existingList}

Mô tả công việc/khách hàng:
"""
${jdText.slice(0, 2000)}
"""

Trả về JSON object với key "skills" là mảng string các kỹ năng (ngắn gọn, 1-3 từ mỗi kỹ năng). Không giải thích thêm. Chỉ trả JSON thuần.`
      : `You are a hiring expert. Analyze the job description / client context below and suggest up to 8 key skills the candidate should have.

${existingList}

Job Description / Client Context:
"""
${jdText.slice(0, 2000)}
"""

Return a JSON object with key "skills" as a string array of skills (concise, 1-3 words each). No explanations. Return pure JSON only.`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            skills: {
              type: "ARRAY" as any,
              items: { type: "STRING" as any },
            },
          },
          required: ["skills"],
        },
      },
    });

    const raw = response.text?.trim() ?? "{}";
    const parsed = JSON.parse(raw);
    const suggestions: string[] = (parsed.skills ?? [])
      .filter((s: string) =>
        typeof s === "string" &&
        s.trim().length > 0 &&
        !existingSkills.map((e) => e.toLowerCase()).includes(s.toLowerCase())
      )
      .slice(0, 8);

    return { data: suggestions, error: null };
  } catch (err) {
    console.error("[suggestSkills] Error:", err);
    return {
      data: null,
      error: lang === "vi"
        ? "Không thể phân tích JD lúc này. Thử lại sau."
        : "Could not analyze the JD at this time. Please try again.",
    };
  }
}
