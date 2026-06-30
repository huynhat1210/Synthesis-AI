/**
 * @file actions/chat.ts
 * @description Server Actions for the AI Career Advisor chatbot.
 *              - sendChatMessageAction: Sends a message to Gemini and saves the Q&A to PostgreSQL.
 *              - loadChatHistoryAction: Loads the user's full chat history from PostgreSQL.
 *              - clearChatHistoryAction: Deletes all messages in the user's chat session.
 */
"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { readProfile } from "@/lib/storage";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── Load chat history from PostgreSQL ────────────────────────────────────────

export async function loadChatHistoryAction(): Promise<ApiResponse<ChatMessage[]>> {
  const { userId } = await auth();
  if (!userId) return { data: null, error: "Unauthorized." };

  try {
    const session = await prisma.chatSession.findUnique({
      where: { userId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!session) return { data: [], error: null };

    return {
      data: session.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      error: null,
    };
  } catch (err: any) {
    console.error("[Chat] loadChatHistoryAction error:", err);
    return { data: [], error: null }; // Fail gracefully
  }
}

// ── Clear chat history ────────────────────────────────────────────────────────

export async function clearChatHistoryAction(): Promise<ApiResponse<null>> {
  const { userId } = await auth();
  if (!userId) return { data: null, error: "Unauthorized." };

  try {
    const session = await prisma.chatSession.findUnique({ where: { userId } });
    if (session) {
      await prisma.chatMessage.deleteMany({ where: { sessionId: session.id } });
    }
    return { data: null, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

// ── Send message to Gemini + save to DB ──────────────────────────────────────

export async function sendChatMessageAction(
  messages: ChatMessage[],
  userMessage: string
): Promise<ApiResponse<string>> {
  const { userId } = await auth();
  if (!userId) return { data: null, error: "Unauthorized." };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { data: null, error: "Gemini API key is not configured." };

  // Load user profile for context-aware advice
  const profile = await readProfile(userId);

  // ── Plan-based chat limit ─────────────────────────────────────────────────
  const FREE_LIMIT = 5;
  if (profile?.plan !== "pro") {
    const session = await prisma.chatSession.findUnique({
      where: { userId },
      include: { _count: { select: { messages: { where: { role: "user" } } } } },
    });
    const userMsgCount = session?._count?.messages ?? 0;
    if (userMsgCount >= FREE_LIMIT) {
      return { data: null, error: "LIMIT_REACHED" };
    }
  }

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

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I am your personalized AI Career Advisor. Ready to provide tailored career guidance.",
          },
        ],
      },
      // Previous conversation context (last 12 turns)
      ...messages.slice(-12).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const responseText = result.text ?? "";

    // ── Persist both user message and AI response to PostgreSQL ──────────────
    try {
      const session = await prisma.chatSession.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      await prisma.chatMessage.createMany({
        data: [
          { sessionId: session.id, role: "user", content: userMessage },
          { sessionId: session.id, role: "assistant", content: responseText },
        ],
      });
    } catch (dbErr) {
      // Non-fatal: DB save failure should not break the chat response
      console.error("[Chat] Failed to persist messages:", dbErr);
    }

    return { data: responseText, error: null };
  } catch (err: any) {
    console.error("[AI Chat] Gemini error:", err);
    return { data: null, error: err.message || "Failed to get AI response." };
  }
}
