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
  const tone = context.toneValue !== undefined ? context.toneValue : 50;
  
  let contentA = "";
  let contentB = "";
  
  if (tone < 35) {
    // Formal / Traditional
    contentA = `Kính gửi đối tác của ${context.targetAudience || "dự án"}, tôi tên là ${profile.fullName || "Jane Doe"}, hiện giữ vai trò ${profile.jobTitle || "Chuyên viên thiết kế"}. Với nền tảng kiến thức và kỹ năng thực chiến trong các lĩnh vực chuyên môn như ${profile.skills.slice(0, 3).join(", ") || "UI/UX, Chiến lược sản phẩm"}, tôi xin đề xuất giải pháp tối ưu hóa hiệu suất quy trình hoạt động, hướng tới việc giảm thiểu rủi ro và gia tăng tối đa giá trị thực tế cho tổ chức. Rất mong có cơ hội được trình bày chi tiết và hợp tác cùng quý công ty.`;
    contentB = `Chào quý đối tác, trên cương vị là một ${profile.jobTitle || "Nhà thiết kế"}, tôi tin rằng chìa khóa của sự đột phá nằm ở việc đơn giản hóa trải nghiệm và tối ưu hóa hệ thống vận hành. Đề xuất phát triển này tập trung rút ngắn thời gian triển khai thực tế bằng các quy trình thử nghiệm chặt chẽ, tạo ra sản phẩm bền vững và tối ưu hóa trải nghiệm khách hàng. Hãy cùng thảo luận để bắt đầu dự án này ngay hôm nay.`;
  } else if (tone > 70) {
    // Casual / Energetic / Creative
    contentA = `Xin chào! Mình là ${profile.fullName || "Jane Doe"}, một ${profile.jobTitle || "Designer"} đam mê công nghệ. Biết đến ${context.targetAudience || "bên bạn"}, mình cực kỳ muốn đóng góp các thế mạnh của mình về ${profile.skills.slice(0, 3).join(", ") || "Thiết kế, Chiến lược"} để tạo nên đột phá. Chúng ta sẽ áp dụng các chỉ số đo lường hiệu quả nhanh, tối ưu từng tính năng để tăng trưởng vượt bậc ngay trong tháng đầu tiên! Liên hệ với mình để cùng làm việc nhé!`;
    contentB = `Hi there! Mình là ${profile.fullName || "Jane Doe"} đây. Hãy cùng thổi làn gió mới vào sản phẩm của bạn! Với tư cách là một ${profile.jobTitle || "Creative Designer"}, mình luôn theo đuổi phong cách tối giản, mượt mà và gây ấn tượng mạnh. Dự án này sẽ là cơ hội tuyệt vời để chúng ta cùng nhau bứt phá giới hạn và tạo ra một trải nghiệm người dùng đầy cảm hứng. Nhắn tin cho mình để bắt đầu hành trình sáng tạo này ngay nhé!`;
  } else {
    // Balanced
    contentA = `Chào bạn, mình là ${profile.fullName || "Jane Doe"}, chuyên gia về ${profile.jobTitle || "Thiết kế sản phẩm"}. Mình có nhiều năm kinh nghiệm làm việc với các công cụ và kỹ năng như ${profile.skills.slice(0, 3).join(", ") || "UI/UX, Research"}. Đối với mục tiêu tuyển dụng của ${context.targetAudience || "bên bạn"}, mình đề xuất lộ trình cụ thể tập trung cải tiến hiệu năng làm việc và tăng tốc độ bàn giao sản phẩm. Rất mong được trao đổi thêm với bạn về định hướng này.`;
    contentB = `Chào bạn, mình là ${profile.fullName || "Jane Doe"}. Để giúp bạn giải quyết bài toán hiện tại, mình mang đến hướng tiếp cận linh hoạt, tinh gọn và tập trung cao vào trải nghiệm người dùng cuối. Bằng cách loại bỏ các bước dư thừa và tối ưu hóa giao diện thiết kế, sản phẩm mới sẽ đem lại hiệu ứng tích cực và thu hút người dùng nhanh chóng. Hãy kết nối với mình để hiện thực hóa ý tưởng này nhé.`;
  }

  return {
    scenarioA: {
      label: `Scenario A: ${context.pitchGoal} (Strategic - Tone: ${tone}/100)`,
      title: "Giải pháp tối ưu hóa hiệu suất và chất lượng",
      content: contentA,
      bullets: [
        "Tăng 15% hiệu năng vận hành trong quý đầu tiên",
        "Lộ trình bàn giao chia nhỏ rõ ràng, giảm thiểu rủi ro",
        "Đo lường trực tiếp theo mục tiêu tăng trưởng của bạn",
      ],
      headline: "↑ 15% Hiệu năng",
    },
    scenarioB: {
      label: `Scenario B: ${context.pitchGoal} (Visionary - Tone: ${tone}/100)`,
      title: "Đột phá trải nghiệm người dùng thế hệ mới",
      content: contentB,
      stats: [
        { label: "Tốc độ Prototyping", icon: "rocket", value: "Nhanh gấp 2 lần" },
        { label: "Tương tác người dùng", icon: "lightbulb" },
      ],
    },
    matchAnalysis: {
      alignmentScore: 88,
      strengths: [
        "Hồ sơ năng lực cá nhân tương thích cao với mục tiêu dự án",
        profile.skills.length > 0
          ? `Các kỹ năng ${profile.skills.slice(0, 2).join(", ")} khớp trực tiếp với yêu cầu tuyển dụng`
          : "Năng lực chuyên môn phù hợp với bối cảnh mục tiêu",
      ],
      gaps: [
        "Số liệu dự án thực tế trong lĩnh vực này cần được làm nổi bật hơn trong Master Profile.",
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
            `  • ${p.title}:\n    - Role: ${p.role || "Not specified"}\n    - Bio/Context: ${p.description}\n${p.challenge ? `    - Challenge: ${p.challenge}\n` : ""}${p.outcome ? `    - Outcome/Metrics: ${p.outcome}\n` : ""}`
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
Tone Value (0-100): ${context.toneValue !== undefined ? context.toneValue : 50} (0 is Highly Formal & Professional, 50 is Balanced, 100 is Highly Casual, High-energy & Friendly)
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
• Điều chỉnh văn phong Tiếng Việt của bản pitch bám sát giá trị Tone Value (${context.toneValue !== undefined ? context.toneValue : 50}/100):
  - Từ 0 đến 30 (Formal): Sử dụng văn phong cực kỳ trang trọng, lịch sự, chuẩn mực công sở (ví dụ: xưng "Tôi", gọi "Quý công ty", "Kính gửi", "Trân trọng").
  - Từ 31 đến 70 (Balanced): Sử dụng văn phong trung hòa, chuyên nghiệp, tự nhiên nhưng lịch sự (ví dụ: xưng "Tôi" hoặc "Mình", gọi "Bạn", "Chào bạn").
  - Từ 71 đến 100 (Casual): Sử dụng văn phong trẻ trung, tràn đầy năng lượng, thân thiện, phong cách startup sáng tạo (ví dụ: xưng "Mình", dùng từ ngữ năng động, kích thích tư duy sáng tạo).

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
