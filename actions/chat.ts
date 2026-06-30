/**
 * @file actions/chat.ts
 * @description Server Action: AI Career Advisor chatbot powered by Gemini,
 *              deeply context-aware of the user's Master Profile.
 */
"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { readProfile } from "@/lib/storage";
import type { ApiResponse } from "@/types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendChatMessageAction(
  messages: ChatMessage[],
  userMessage: string
): Promise<ApiResponse<string>> {
  const { userId } = await auth();
  if (!userId) return { data: null, error: "Unauthorized." };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { data: null, error: "Gemini API key is not configured." };
  }

  // Load user profile for context-aware advice
  const profile = await readProfile(userId);

  const profileContext = profile
    ? `
=== USER MASTER PROFILE ===
Name: ${profile.fullName}
Job Title: ${profile.jobTitle}
Bio: ${profile.bio}
Skills: ${profile.skills?.join(", ") || "None listed"}
Featured Projects: ${
        profile.projects?.length
          ? profile.projects.map((p) => `${p.title}: ${p.description}`).join(" | ")
          : "None"
      }
=== END PROFILE ===
`
    : "No profile available for this user yet.";

  const systemPrompt = `You are an elite AI Career Advisor integrated into Synthesis AI — a premium pitch generation SaaS platform. You have access to the user's complete professional profile below.

${profileContext}

Your role is to:
1. Provide personalized career advice based on their actual profile, skills, and projects
2. Identify skill gaps for specific job descriptions they share
3. Suggest concrete ways to improve their pitch alignment score
4. Recommend keywords and phrasing to strengthen their proposals
5. Help them understand what hiring managers or clients look for
6. Give specific, actionable feedback — not generic advice

Guidelines:
- ALWAYS reference their actual skills, projects, and bio in your answers when relevant
- Be direct, professional, and encouraging
- Keep responses concise but comprehensive (2-4 paragraphs max unless more detail is needed)
- When comparing with a JD, identify specific matches and gaps
- Suggest exact phrases or keywords they can add to their pitch
- Respond in the same language the user writes in (Vietnamese or English)

You are NOT a general chatbot — you are a specialized career intelligence advisor who knows this specific user's professional background deeply.`;

  try {
    const client = new GoogleGenAI({ apiKey });

    // Build conversation contents for multi-turn chat
    const contents = [
      // Inject system context as first user turn (SDK v1 pattern)
      { role: "user", parts: [{ text: systemPrompt }] },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I am your personalized AI Career Advisor with full access to your professional profile. I am ready to provide tailored career guidance, pitch optimization advice, and skill gap analysis. How can I help you today?",
          },
        ],
      },
      // Previous conversation history (last 10 turns)
      ...messages.slice(-10).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      // Current user message
      { role: "user", parts: [{ text: userMessage }] },
    ];

    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const response = result.text ?? "";
    return { data: response, error: null };
  } catch (err: any) {
    console.error("[AI Chat] Error:", err);
    return { data: null, error: err.message || "Failed to get AI response." };
  }
}
