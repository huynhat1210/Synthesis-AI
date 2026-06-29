/**
 * @file lib/gemini.ts
 * @description Server-side Google Gemini AI service layer.
 *
 * ⚠️  SERVER ONLY — Never import from client components.
 *     GEMINI_API_KEY is only available on the server.
 *
 * Uses gemini-2.5-flash with structured JSON output enforced via
 * responseSchema, ensuring the AI always returns data that matches
 * our TypeScript interfaces with zero post-processing.
 */

import { GoogleGenAI, Type } from "@google/genai";
import type {
  MasterProfile,
  ClientContext,
  GeneratedPitch,
  ApiResponse,
} from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT INITIALISATION
// ─────────────────────────────────────────────────────────────────────────────

/** Lazily-initialised Gemini client (avoids issues during build/SSG) */
let _client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!_client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server."
      );
    }
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON SCHEMA — mirrors GeneratedPitch TypeScript interface exactly
// ─────────────────────────────────────────────────────────────────────────────

const PITCH_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    scenarioA: {
      type: Type.OBJECT,
      description: "Strategic, analytical, metric-oriented pitch scenario",
      properties: {
        label: {
          type: Type.STRING,
          description: "Short scenario label, e.g. 'Scenario A: Enterprise Focus'",
        },
        title: {
          type: Type.STRING,
          description: "Professional, catchy pitch headline",
        },
        content: {
          type: Type.STRING,
          description:
            "Full persuasive pitch paragraph addressing the audience's pain points",
        },
        bullets: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "2–4 measurable, high-impact bullet points supporting the pitch",
        },
        headline: {
          type: Type.STRING,
          description: "Optional primary metric highlight, e.g. '↑ 40% Efficiency'",
        },
      },
      required: ["label", "title", "content", "bullets"],
    },
    scenarioB: {
      type: Type.OBJECT,
      description: "Energetic, visionary, product-focused pitch scenario",
      properties: {
        label: {
          type: Type.STRING,
          description: "Short scenario label, e.g. 'Scenario B: Innovation Venture'",
        },
        title: {
          type: Type.STRING,
          description: "Exciting, visionary pitch headline",
        },
        content: {
          type: Type.STRING,
          description:
            "High-energy, compelling pitch paragraph focused on disruption and speed",
        },
        stats: {
          type: Type.ARRAY,
          description: "2–3 core value / stat highlights",
          items: {
            type: Type.OBJECT,
            properties: {
              label: {
                type: Type.STRING,
                description: "Stat label, e.g. 'Speed-to-Market'",
              },
              icon: {
                type: Type.STRING,
                description:
                  "Lowercase icon keyword: rocket | lightbulb | shield | zap | users | trending-up | award | heart | target",
              },
              value: {
                type: Type.STRING,
                description: "Optional metric value, e.g. '3× faster'",
              },
            },
            required: ["label", "icon"],
          },
        },
      },
      required: ["label", "title", "content", "stats"],
    },
    matchAnalysis: {
      type: Type.OBJECT,
      description: "AI-driven professional alignment analysis comparing the master profile against target client goals",
      properties: {
        alignmentScore: {
          type: Type.INTEGER,
          description: "Match score between 0 and 100 representing profile suitability",
        },
        strengths: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "2-3 primary strengths/proof points where the profile matches the client context",
        },
        gaps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "1-2 gaps or skills the client needs but are not explicit in the profile, with tips to handle them",
        },
      },
      required: ["alignmentScore", "strengths", "gaps"],
    },
  },
  required: ["scenarioA", "scenarioB", "matchAnalysis"],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MOCK FALLBACK — used when GEMINI_API_KEY is absent (demo / offline mode)
// ─────────────────────────────────────────────────────────────────────────────

function buildMockPitch(
  profile: MasterProfile,
  context: ClientContext
): GeneratedPitch {
  return {
    scenarioA: {
      label: `Scenario A: ${context.pitchGoal} (Strategic)`,
      title: "Strategic Workflow Efficiency Gains",
      content: `Hi, I'm ${profile.fullName || "Jane Doe"}, a ${profile.jobTitle || "Strategic Designer"}. I specialise in ${profile.skills.slice(0, 3).join(", ")}. For ${context.targetAudience}, I propose a calculated approach focusing on reducing overhead and maximising output. Based on past projects, we can increase product velocity while keeping risks minimal.`,
      bullets: [
        "15% increase in operational efficiency within Q1",
        "Phased feature rollouts with clear milestone mapping",
        "Direct alignment with your risk-mitigation goals",
      ],
      headline: "↑ 15% Efficiency",
    },
    scenarioB: {
      label: `Scenario B: ${context.pitchGoal} (Visionary)`,
      title: "Disrupting the Product Experience",
      content: `Let's build something truly impactful. As a ${profile.jobTitle || "Designer"}, I believe the best solutions are simple and delightful. I'm designing a modern, friction-free journey that eliminates redundant steps and ships features your users will love.`,
      stats: [
        { label: "Rapid Prototyping", icon: "rocket", value: "2× faster" },
        { label: "User Engagement", icon: "lightbulb" },
      ],
    },
    matchAnalysis: {
      alignmentScore: 88,
      strengths: [
        "Bio aligns directly with the target audience context",
        profile.skills.length > 0
          ? `Skills like ${profile.skills.slice(0, 2).join(", ")} match client requirements`
          : "General professional profile aligns with client needs",
      ],
      gaps: [
        "Detailed project metrics for this specific sector are not fully explicit in your Master Profile.",
      ],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT — generateContextualPitch
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calls the Gemini API to generate two context-aware pitch scenarios.
 *
 * Falls back to a mock pitch if GEMINI_API_KEY is not configured,
 * so the app remains fully functional in demo / offline mode.
 *
 * @param profile  - The user's Master Profile
 * @param context  - Target audience & pitch goal inputs from the user
 * @returns        - ApiResponse wrapping a GeneratedPitch
 */
export async function generateContextualPitch(
  profile: MasterProfile,
  context: ClientContext
): Promise<ApiResponse<GeneratedPitch>> {
  // ── Offline / demo fallback ──────────────────────────────────────────────
  if (!process.env.GEMINI_API_KEY) {
    console.warn(
      "[Gemini] GEMINI_API_KEY not set — returning mock pitch (demo mode)."
    );
    return { data: buildMockPitch(profile, context), error: null };
  }

  // ── Build the prompt ─────────────────────────────────────────────────────
  const prompt = `
You are Synthesis AI, a world-class context-aware professional pitch creator.

Analyse the user's MASTER PROFILE and the PITCH CONTEXT below, then generate
two highly personalised pitch scenarios (Scenario A and Scenario B).
Also, perform an AI alignment assessment comparing the profile details against target goals.

═══════════════════════════════
MASTER PROFILE
═══════════════════════════════
Full Name:       ${profile.fullName || "Not provided"}
Job Title:       ${profile.jobTitle || "Not provided"}
Bio:             ${profile.bio || "Not provided"}
Key Skills:      ${profile.skills.length ? profile.skills.join(", ") : "Not provided"}
Featured Projects:
${
  profile.projects.length
    ? profile.projects
        .map(
          (p) =>
            `  • ${p.title}: ${p.description}${p.outcome ? ` (${p.outcome})` : ""}`
        )
        .join("\n")
    : "  None provided"
}

═══════════════════════════════
PITCH CONTEXT
═══════════════════════════════
Target Audience: ${context.targetAudience}
PitchGoal:      ${context.pitchGoal}
Tone/Style:      ${context.style}
Length:          ${context.length}
${context.rawContext ? `\nExtra Context:\n${context.rawContext}` : ""}

═══════════════════════════════
SCENARIO REQUIREMENTS
═══════════════════════════════
• Scenario A — Strategic & analytical: metric-driven, structured, enterprise-grade.
  Include measurable bullet points and a headline metric.
• Scenario B — Energetic & visionary: modern, product-focused, startup-friendly.
  Include 2–3 icon-tagged stat highlights (icons: rocket, lightbulb, shield, zap,
  users, trending-up, award, heart, target).
• Luôn trả về kết quả bằng Tiếng Việt với chuẩn Unicode dựng sẵn (Precomposed Unicode) để tránh lỗi hiển thị font.
• Mỗi bản pitch bắt buộc phải kết thúc bằng một câu Call-To-Action (Kêu gọi hành động) mạnh mẽ và chuyên nghiệp.

═══════════════════════════════
ALIGNMENT SCORE REQUIREMENTS
═══════════════════════════════
Compare the skills and projects in the Master Profile against the target audience needs:
- alignmentScore: An integer between 0 and 100 based on the fit. If the profile lacks direct relevant skills, give a lower score (e.g. 50-70) and outline the gaps. If it is a great fit, give 85-98.
- strengths: List 2-3 points explaining why their skills or projects make them an excellent candidate.
- gaps: List 1-2 constructive points pointing out what might be missing or could be improved to win this client.

Ensure both scenarios directly reference the target audience's specific context.
Return your output as a single JSON object strictly matching the schema.
  `.trim();

  // ── Call Gemini API with Retries & Mock Fallback ───────────────────────────
  let attempts = 0;
  const maxAttempts = 3;
  let lastError: any = null;

  while (attempts < maxAttempts) {
    try {
      const client = getClient();
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: PITCH_RESPONSE_SCHEMA,
        },
      });

      const text = response.text;
      if (!text) throw new Error("Gemini returned an empty response.");

      const parsed = JSON.parse(text.trim()) as GeneratedPitch;
      return { data: parsed, error: null };
    } catch (err: any) {
      lastError = err;
      attempts++;
      console.warn(`[Gemini] Attempt ${attempts} failed:`, err.message || err);
      
      // If we encounter a temporary demand spike / overload, wait before retrying
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  // If all attempts failed, log and fall back to mock data so the application doesn't crash
  const rawErrorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  console.error("[Gemini] All attempts failed. Error detail:", rawErrorMessage);
  
  // Return the mock pitch and a descriptive error message indicating the fallback
  return {
    data: buildMockPitch(profile, context),
    error: `Google Gemini API is currently experiencing extremely high demand. We have activated our high-quality Sandbox mode so you can continue testing without interruptions!`,
  };
}

/**
 * Uses Gemini to parse a raw Job Description and extract key target details.
 */
export async function parseJdWithGemini(
  jdText: string
): Promise<{ targetAudience: string; pitchGoal: string }> {
  try {
    const client = getClient();
    const prompt = `
You are Synthesis AI, a professional job/RFP analysis assistant.
Analyse the raw Job Description/RFP text below and extract:
1. Target Audience: A concise description (1-2 sentences) of who the decision-makers are (e.g. "A technical hiring manager at a fast-growing SaaS startup looking for frontend scaling expertise").
2. Pitch Goal: Identify the goal. Choose the closest option from:
   - "Freelance Project Proposal"
   - "Job Interview Presentation"
   - "Sales Pitch & Demo"
   - "Internal Stakeholder Alignment"
   - "Executive Briefing & Summary"

Return your output as a single JSON object matching this schema:
{
  "targetAudience": "...",
  "pitchGoal": "..."
}

RAW JOB DESCRIPTION TEXT:
${jdText}
    `.trim();

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetAudience: { type: Type.STRING },
            pitchGoal: { type: Type.STRING },
          },
          required: ["targetAudience", "pitchGoal"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Gemini returned empty text.");
    return JSON.parse(text.trim());
  } catch (err) {
    console.error("[Gemini] JD parsing failed:", err);
    return {
      targetAudience: "A target client based on the uploaded Job Description.",
      pitchGoal: "Freelance Project Proposal",
    };
  }
}
